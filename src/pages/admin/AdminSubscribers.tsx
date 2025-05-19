
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Trash2, Download, Upload, Send, FileSpreadsheet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import * as XLSX from "xlsx";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [isMailDialogOpen, setIsMailDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);

  const fetchSubscribers = useCallback(async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("email_subscribers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setSubscribers(data || []);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("فشل في تحميل قائمة المشتركين");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredSubscribers(
        subscribers.filter(sub => 
          sub.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredSubscribers(subscribers);
    }
  }, [searchQuery, subscribers]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشترك؟")) return;
    
    try {
      const { error } = await supabase
        .from("email_subscribers")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      toast.success("تم حذف المشترك بنجاح");
      fetchSubscribers();
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error("فشل في حذف المشترك");
    }
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredSubscribers.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredSubscribers.map(sub => sub.email));
    }
  };

  const handleExportToExcel = () => {
    try {
      const dataToExport = subscribers.map(({ email, created_at, is_active }) => ({
        البريد_الإلكتروني: email,
        تاريخ_الاشتراك: created_at ? format(new Date(created_at), 'yyyy-MM-dd HH:mm:ss') : '',
        الحالة: is_active ? 'نشط' : 'غير نشط'
      }));
      
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "المشتركون");
      
      // Generate and download Excel file
      XLSX.writeFile(workbook, "قائمة_المشتركين.xlsx");
      
      toast.success("تم تصدير البيانات بنجاح");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("فشل في تصدير البيانات");
    }
  };

  const handleImportFromExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setIsUploading(true);
      const file = e.target.files[0];
      
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Get first sheet
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // Extract emails (check different possible column names)
          const newEmails: string[] = [];
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          
          jsonData.forEach((row: any) => {
            // Check different possible column names for email
            const emailValue = row.email || row.البريد_الإلكتروني || row.Email || row['البريد الإلكتروني'] || Object.values(row)[0];
            
            if (typeof emailValue === 'string' && emailValue.match(emailRegex)) {
              newEmails.push(emailValue);
            }
          });
          
          if (newEmails.length === 0) {
            throw new Error("لم يتم العثور على عناوين بريد إلكتروني صالحة");
          }
          
          // Insert new subscribers
          const { data: insertedData, error } = await supabase
            .from("email_subscribers")
            .insert(
              newEmails.map(email => ({ email }))
            )
            .select();
          
          if (error && error.code !== '23505') { // Ignore unique violation errors
            throw error;
          }
          
          toast.success(`تم استيراد ${insertedData?.length || 0} مشترك بنجاح`);
          fetchSubscribers();
        } catch (error: any) {
          console.error("Error processing Excel file:", error);
          toast.error(`فشل في معالجة الملف: ${error.message}`);
        } finally {
          setIsUploading(false);
          // Reset input
          e.target.value = '';
        }
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Error importing from Excel:", error);
      toast.error("فشل في استيراد البيانات");
      setIsUploading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error("يرجى إدخال عنوان للرسالة");
      return;
    }
    
    if (!emailContent.trim()) {
      toast.error("يرجى إدخال محتوى الرسالة");
      return;
    }
    
    if (selectedEmails.length === 0) {
      toast.error("يرجى اختيار مشترك واحد على الأقل");
      return;
    }
    
    try {
      setIsSending(true);
      
      console.log("Sending email to:", selectedEmails);
      console.log("Email subject:", emailSubject);
      console.log("Email content:", emailContent);
      
      const { data, error } = await supabase.functions.invoke("send-notification", {
        body: {
          emails: selectedEmails,
          subject: emailSubject,
          html: emailContent
        }
      });
      
      if (error) {
        console.error("Error from function:", error);
        throw error;
      }
      
      console.log("Response from email function:", data);
      
      toast.success(`تم إرسال البريد الإلكتروني إلى ${selectedEmails.length} مشترك`);
      setIsMailDialogOpen(false);
      setEmailSubject("");
      setEmailContent("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("فشل في إرسال البريد الإلكتروني");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة المشتركين</h1>
          <p className="text-muted-foreground">قم بإدارة قائمة المشتركين في النشرة البريدية</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="relative">
            <Input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleImportFromExcel}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
            <Button variant="outline" disabled={isUploading}>
              {isUploading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="ml-2 h-4 w-4" />
              )}
              استيراد من Excel
            </Button>
          </div>
          
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="ml-2 h-4 w-4" />
            تصدير إلى Excel
          </Button>
          
          <Button 
            onClick={() => {
              if (selectedEmails.length === 0) {
                toast.error("يرجى اختيار مشترك واحد على الأقل");
                return;
              }
              setIsMailDialogOpen(true);
            }}
            disabled={selectedEmails.length === 0}
          >
            <Send className="ml-2 h-4 w-4" />
            إرسال بريد إلكتروني
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>المشتركون</CardTitle>
              <CardDescription>
                {subscribers.length} مشترك في القائمة البريدية
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute right-3 top-[10px] h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="بحث..."
                className="pl-10 text-right"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin text-flyboy-gold" size={32} />
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center py-8">
              <p>لا يوجد مشتركين {searchQuery ? "مطابقين لبحثك" : ""}</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedEmails.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4"
                      />
                    </TableHead>
                    <TableHead>البريد الإلكتروني</TableHead>
                    <TableHead>تاريخ الاشتراك</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell>
                        <input 
                          type="checkbox"
                          checked={selectedEmails.includes(subscriber.email)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEmails(prev => [...prev, subscriber.email]);
                            } else {
                              setSelectedEmails(prev => prev.filter(email => email !== subscriber.email));
                            }
                          }}
                          className="h-4 w-4"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>
                        {subscriber.created_at ? format(new Date(subscriber.created_at), 'yyyy-MM-dd HH:mm') : '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={subscriber.is_active ? "default" : "secondary"}>
                          {subscriber.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteSubscriber(subscriber.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isMailDialogOpen} onOpenChange={setIsMailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center mb-4">إرسال بريد إلكتروني للمشتركين</DialogTitle>
            <DialogDescription>أدخل تفاصيل الرسالة أدناه لإرسالها إلى المشتركين المحددين</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">الموضوع</label>
              <Input
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="أدخل عنوان الرسالة"
                className="text-right"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium">الرسالة</label>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="أدخل محتوى الرسالة"
                className="min-h-[200px] text-right"
                dir="rtl"
              />
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm">
                سيتم إرسال هذه الرسالة إلى {selectedEmails.length} مشترك
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsMailDialogOpen(false)}
              disabled={isSending}
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleSendEmail}
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="ml-2 h-4 w-4" />
                  إرسال
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubscribers;
