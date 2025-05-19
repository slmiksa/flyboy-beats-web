import React, { useState, useEffect } from 'react';
import { Mail, X, Send, Loader2, Music, Disc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
const emailSchema = z.string().email({
  message: 'يرجى إدخال بريد إلكتروني صالح'
});
const SubscribeButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  // Add pulsing animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => {
        setIsPulsing(false);
      }, 2000);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      setIsSubmitting(true);

      // Validate email
      emailSchema.parse(email);
      console.log("Attempting to subscribe email:", email);

      // Save email to database with anonymous access
      const {
        data,
        error: dbError
      } = await supabase.from('email_subscribers').insert([{
        email
      }]).select();
      if (dbError) {
        console.error("Error inserting subscriber:", dbError);
        if (dbError.code === '23505') {
          // Unique violation
          throw new Error('أنت مشترك بالفعل في القائمة البريدية');
        }
        throw new Error(dbError.message);
      }
      console.log("Subscriber added successfully:", data);
      toast.success('تم الاشتراك بنجاح!', {
        description: 'سيتم إشعارك بأحدث الفعاليات والحفلات'
      });
      setIsOpen(false);
      setEmail('');
    } catch (err: any) {
      console.error("Error in subscription:", err);
      if (err instanceof z.ZodError) {
        setError('يرجى إدخال بريد إلكتروني صالح');
      } else {
        setError(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
      <div className="fixed right-4 bottom-48 z-50 flex flex-col items-center">
        <button onClick={() => setIsOpen(true)} className="group relative flex flex-col items-center" aria-label="اشترك في الإشعارات">
          {/* DJ Turntable/Disc Design for Subscribe Button */}
          <div className="relative mb-2">
            <div className="bg-black rounded-full h-16 w-16 flex items-center justify-center shadow-lg">
              <div className={`bg-flyboy-gold rounded-full h-14 w-14 flex items-center justify-center ${isPulsing ? 'animate-spin' : ''} transition-all duration-300`}>
                <Mail size={28} className="text-black" />
                
                {/* Notification Dot */}
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flyboy-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-flyboy-purple"></span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Button Text */}
          <div className="bg-flyboy-gold text-black text-xs font-bold py-1 px-3 rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">تابع حفلاتي</div>
          
          {/* Equalizer Effect */}
          <div className="equalizer-container mt-1">
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
            <div className="equalizer-bar"></div>
          </div>
        </button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">اشترك في إشعارات الحفلات</DialogTitle>
            <DialogDescription className="text-center">
              احصل على إشعارات بأحدث الحفلات والفعاليات
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex">
                <Input type="email" placeholder="أدخل بريدك الإلكتروني" className="flex-1 text-right" value={email} onChange={e => setEmail(e.target.value)} disabled={isSubmitting} dir="rtl" />
                <Button type="submit" disabled={isSubmitting} className="mr-2">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </div>

            <div className="bg-muted p-3 rounded-md text-sm text-right">
              <p>بالاشتراك، ستصلك إشعارات حول:</p>
              <ul className="list-disc list-inside mr-2 mt-1 space-y-1">
                <li>الحفلات الجديدة</li>
                <li>العروض الحصرية</li>
                <li>أحدث الفعاليات</li>
              </ul>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>;
};
export default SubscribeButton;