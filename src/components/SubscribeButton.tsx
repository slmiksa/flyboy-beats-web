import React, { useState, useEffect } from 'react';
import { Mail, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const emailSchema = z.string().email({ message: 'يرجى إدخال بريد إلكتروني صالح' });

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
      
      // Save email to database
      const { data, error: dbError } = await supabase
        .from('email_subscribers')
        .insert([{ email }])
        .select();
      
      if (dbError) {
        console.error("Error inserting subscriber:", dbError);
        
        if (dbError.code === '23505') { // Unique violation
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

  return (
    <>
      <div className="fixed left-4 bottom-28 z-50 flex flex-col items-center">
        <Button
          onClick={() => setIsOpen(true)}
          className={`group relative flex flex-col items-center bg-flyboy-purple hover:bg-flyboy-purple/90 text-white rounded-full p-3 shadow-lg ${isPulsing ? 'animate-pulse' : ''}`}
          aria-label="اشترك في الإشعارات"
          size="icon"
        >
          {/* Mail Icon with Animation */}
          <div className="relative">
            <Mail 
              size={24} 
              className={`text-flyboy-gold ${isPulsing ? 'animate-bounce' : ''}`}
            />
            <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flyboy-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-flyboy-gold"></span>
            </span>
          </div>
          
          {/* Label that appears on hover */}
          <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity bg-flyboy-gold text-black text-xs font-bold py-1 px-3 rounded-full shadow-lg whitespace-nowrap">
            اشترك في الإشعارات
          </span>
        </Button>
        
        {/* Animated equalizer bars */}
        <div className="mt-2 flex space-x-1 rtl:space-x-reverse">
          <div className="equalizer-bar h-2 w-1 bg-flyboy-gold"></div>
          <div className="equalizer-bar h-3 w-1 bg-flyboy-gold"></div>
          <div className="equalizer-bar h-1 w-1 bg-flyboy-gold"></div>
        </div>
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
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="flex-1 text-right"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  dir="rtl"
                />
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="mr-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
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
    </>
  );
};

export default SubscribeButton;
