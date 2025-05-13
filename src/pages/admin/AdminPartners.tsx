
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { Partner } from "@/types/database.types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trash, Pencil, Plus, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdminPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState("");
  const [newPartnerLogo, setNewPartnerLogo] = useState("");
  const [isDistinguished, setIsDistinguished] = useState(false);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
      toast.error("حدث خطأ أثناء جلب بيانات الشركاء");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPartner = async () => {
    try {
      if (!newPartnerName.trim() || !newPartnerLogo.trim()) {
        toast.error("يرجى إدخال اسم الشريك ورابط الشعار");
        return;
      }

      const { data, error } = await supabase
        .from("partners")
        .insert({
          name: newPartnerName.trim(),
          logo_url: newPartnerLogo.trim(),
          is_distinguished: isDistinguished,
        })
        .select();

      if (error) {
        throw error;
      }

      // Add newly created partner to state
      if (data && data.length > 0) {
        setPartners([data[0], ...partners]);
      }

      // Reset form
      setNewPartnerName("");
      setNewPartnerLogo("");
      setIsDistinguished(false);
      
      toast.success("تمت إضافة الشريك بنجاح");
    } catch (error) {
      console.error("Error adding partner:", error);
      toast.error("حدث خطأ أثناء إضافة الشريك");
    }
  };

  const handleEditPartner = async () => {
    if (!editingPartner) return;

    try {
      if (!newPartnerName.trim() || !newPartnerLogo.trim()) {
        toast.error("يرجى إدخال اسم الشريك ورابط الشعار");
        return;
      }

      const { error } = await supabase
        .from("partners")
        .update({
          name: newPartnerName.trim(),
          logo_url: newPartnerLogo.trim(),
          is_distinguished: isDistinguished,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingPartner.id);

      if (error) {
        throw error;
      }

      // Update partner in state
      setPartners(
        partners.map((p) =>
          p.id === editingPartner.id
            ? {
                ...p,
                name: newPartnerName.trim(),
                logo_url: newPartnerLogo.trim(),
                is_distinguished: isDistinguished,
                updated_at: new Date().toISOString(),
              }
            : p
        )
      );

      setIsEditDialogOpen(false);
      toast.success("تم تحديث بيانات الشريك بنجاح");
    } catch (error) {
      console.error("Error updating partner:", error);
      toast.error("حدث خطأ أثناء تحديث بيانات الشريك");
    }
  };

  const handleDeletePartner = async () => {
    if (!partnerToDelete) return;

    try {
      const { error } = await supabase
        .from("partners")
        .delete()
        .eq("id", partnerToDelete.id);

      if (error) {
        throw error;
      }

      // Remove partner from state
      setPartners(partners.filter((p) => p.id !== partnerToDelete.id));
      setPartnerToDelete(null);
      setIsDeleteDialogOpen(false);
      toast.success("تم حذف الشريك بنجاح");
    } catch (error) {
      console.error("Error deleting partner:", error);
      toast.error("حدث خطأ أثناء حذف الشريك");
    }
  };

  const openEditDialog = (partner: Partner) => {
    setEditingPartner(partner);
    setNewPartnerName(partner.name);
    setNewPartnerLogo(partner.logo_url);
    setIsDistinguished(partner.is_distinguished);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (partner: Partner) => {
    setPartnerToDelete(partner);
    setIsDeleteDialogOpen(true);
  };

  const distinguishedPartners = partners.filter((p) => p.is_distinguished);
  const allPartners = partners;

  const renderPartnerTable = (partnersList: Partner[], title: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          {title === "الشركاء المتميزين" && (
            <Star className="h-5 w-5 text-flyboy-gold" fill="#d4af37" />
          )}
        </CardTitle>
        <CardDescription>
          {partnersList.length
            ? `عدد ${title}: ${partnersList.length}`
            : `لا يوجد ${title} حالياً`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">الشعار</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead className="w-[120px]">
                  {title === "جميع الشركاء" && "متميز"}
                </TableHead>
                <TableHead className="text-left">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnersList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    لا توجد بيانات
                  </TableCell>
                </TableRow>
              ) : (
                partnersList.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <div className="w-16 h-16 rounded bg-white p-1 flex items-center justify-center">
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/80x60?text=خطأ";
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>
                      {title === "جميع الشركاء" && (
                        <div className="flex justify-center items-center">
                          {partner.is_distinguished && (
                            <Star className="h-5 w-5 text-flyboy-gold" fill="#d4af37" />
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(partner)}
                        >
                          <Pencil className="h-4 w-4 ml-1" />
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => openDeleteDialog(partner)}
                        >
                          <Trash className="h-4 w-4 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">إدارة شركاء النجاح</h1>
      <p className="text-muted-foreground">قم بإضافة وتعديل وحذف شركاء النجاح المميزين وجميع الشركاء</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>إضافة شريك جديد</CardTitle>
          <CardDescription>أضف شريك جديد للموقع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">اسم الشريك</Label>
                <Input
                  id="partnerName"
                  placeholder="أدخل اسم الشريك"
                  value={newPartnerName}
                  onChange={(e) => setNewPartnerName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerLogo">رابط الشعار</Label>
                <Input
                  id="partnerLogo"
                  placeholder="أدخل رابط صورة الشعار"
                  value={newPartnerLogo}
                  onChange={(e) => setNewPartnerLogo(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch
                id="isDistinguished"
                checked={isDistinguished}
                onCheckedChange={setIsDistinguished}
              />
              <Label htmlFor="isDistinguished" className="flex items-center">
                شريك متميز
                <Star className="h-4 w-4 text-flyboy-gold mr-2 rtl:ml-2" fill={isDistinguished ? "#d4af37" : "none"} />
              </Label>
            </div>
            {newPartnerLogo && (
              <div className="space-y-2">
                <Label>معاينة الشعار</Label>
                <div className="w-40 h-28 rounded border bg-white p-2 flex items-center justify-center">
                  <img
                    src={newPartnerLogo}
                    alt="معاينة الشعار"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/160x120?text=صورة+غير+صالحة";
                    }}
                  />
                </div>
              </div>
            )}
            <Button onClick={handleAddPartner} className="w-full mt-2">
              <Plus className="h-4 w-4 ml-2" />
              إضافة الشريك
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="distinguished" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="distinguished" className="flex items-center gap-2">
            <Star className="h-4 w-4 text-current" />
            الشركاء المتميزين
          </TabsTrigger>
          <TabsTrigger value="all">جميع الشركاء</TabsTrigger>
        </TabsList>
        <TabsContent value="distinguished">
          {loading ? (
            <Card>
              <CardContent className="py-10 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyboy-gold mx-auto"></div>
                <p className="mt-3">جاري تحميل الشركاء المتميزين...</p>
              </CardContent>
            </Card>
          ) : (
            renderPartnerTable(distinguishedPartners, "الشركاء المتميزين")
          )}
        </TabsContent>
        <TabsContent value="all">
          {loading ? (
            <Card>
              <CardContent className="py-10 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-flyboy-gold mx-auto"></div>
                <p className="mt-3">جاري تحميل جميع الشركاء...</p>
              </CardContent>
            </Card>
          ) : (
            renderPartnerTable(allPartners, "جميع الشركاء")
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Partner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الشريك</DialogTitle>
            <DialogDescription>
              قم بتعديل بيانات الشريك ثم انقر على حفظ
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">اسم الشريك</Label>
              <Input
                id="edit-name"
                value={newPartnerName}
                onChange={(e) => setNewPartnerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-logo">رابط الشعار</Label>
              <Input
                id="edit-logo"
                value={newPartnerLogo}
                onChange={(e) => setNewPartnerLogo(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Switch
                id="edit-distinguished"
                checked={isDistinguished}
                onCheckedChange={setIsDistinguished}
              />
              <Label htmlFor="edit-distinguished" className="flex items-center">
                شريك متميز
                <Star className="h-4 w-4 text-flyboy-gold mr-2 rtl:ml-2" fill={isDistinguished ? "#d4af37" : "none"} />
              </Label>
            </div>
            {newPartnerLogo && (
              <div className="space-y-2">
                <Label>معاينة الشعار</Label>
                <div className="w-full h-36 rounded border bg-white p-2 flex items-center justify-center">
                  <img
                    src={newPartnerLogo}
                    alt="معاينة الشعار"
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/300x200?text=صورة+غير+صالحة";
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditPartner}>
              <Check className="h-4 w-4 ml-2" />
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
            <AlertDialogDescription>
              هذا الإجراء سيؤدي إلى حذف شريك النجاح {partnerToDelete?.name} نهائياً.
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePartner}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash className="h-4 w-4 ml-2" />
              حذف نهائياً
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPartners;
