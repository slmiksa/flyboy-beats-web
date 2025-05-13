
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader2, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types/database.types';

const DistinguishedPartners = () => {
  const isMobile = useIsMobile();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch the distinguished partners
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('is_distinguished', true);

        if (error) {
          console.error('Error fetching distinguished partners:', error);
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
  
  return (
    <div className="bg-flyboy-dark py-16">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="mb-8 flex items-center">
          <Button 
            asChild 
            variant="outline" 
            className="text-flyboy-gold hover:text-flyboy-gold/80 flex items-center gap-2 bg-flyboy-purple hover:bg-flyboy-purple/80 border-flyboy-gold"
          >
            <Link to="/">
              <ChevronRight className="rotate-180 h-5 w-5" />
              <span>العودة للرئيسية</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-flyboy-gold mb-2">شركاء النجاح</h1>
          <div className="w-24 h-[3px] bg-flyboy-gold mb-6"></div>
        </div>
        
        <div className="flex items-center justify-center mb-8">
          <Star size={16} className="text-flyboy-gold mr-2 animate-pulse-glow" />
          <h2 className="text-2xl font-bold text-flyboy-gold">المتميزين</h2>
          <Star size={16} className="text-flyboy-gold ml-2 animate-pulse-glow" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center my-16">
            <Loader2 className="h-10 w-10 animate-spin text-flyboy-gold" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center text-white p-8 border border-flyboy-gold/30 rounded-xl">
            <p>لا يوجد شركاء متميزين حالياً</p>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'} mx-auto justify-items-center`}>
            {partners.map((partner) => (
              <div 
                key={partner.id} 
                className="border-2 border-flyboy-gold rounded-xl overflow-hidden bg-flyboy-purple p-6 flex flex-col items-center w-full max-w-[280px]"
              >
                <div className="w-full aspect-[4/3] bg-white p-4 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/280x210?text=صورة+غير+متوفرة";
                    }}
                  />
                </div>
                <h3 className="text-white text-xl font-medium text-center">{partner.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DistinguishedPartners;
