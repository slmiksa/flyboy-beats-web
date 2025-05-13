
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types/database.types';
import { Loader2 } from 'lucide-react';

const SuccessPartnersBanner = () => {
  const isMobile = useIsMobile();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('is_distinguished', false)
          .limit(3);

        if (error) {
          console.error('Error fetching partners:', error);
          return;
        }

        setPartners(data || []);
      } catch (error) {
        console.error('Error in partners fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Don't render if loading or no partners
  if (loading) {
    return (
      <section className="bg-flyboy-dark py-10 text-center">
        <div className="container max-w-5xl px-4 mx-auto">
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-6 w-6 animate-spin text-flyboy-gold" />
          </div>
        </div>
      </section>
    );
  }

  // Don't render the section if there are no partners
  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="bg-flyboy-dark py-10 text-center">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-xl font-bold text-flyboy-gold">الكل</h3>
        </div>
        
        <div className="border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-purple p-6 mb-4 mx-auto max-w-sm md:max-w-full md:mx-[31px] md:px-[88px] my-[10px] py-[28px]">
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-3 gap-8'} justify-items-center`}>
            {partners.map(partner => (
              <div key={partner.id} className="partner-item flex flex-col items-center w-full max-w-[200px]">
                <div className="w-full aspect-[4/3] bg-white p-3 rounded-lg flex items-center justify-center mb-3 transform transition-transform hover:scale-105">
                  <img 
                    src={partner.logo_url} 
                    alt={partner.name} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/200x150?text=صورة+غير+متوفرة";
                    }}
                  />
                </div>
                <h3 className="text-white text-base font-medium text-center">{partner.name}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <Button asChild variant="secondary" className="mt-2 text-sm font-medium">
          <Link to="/all-partners">
            مشاهدة الكل
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SuccessPartnersBanner;
