
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Partner } from '@/types/database.types';
import { Loader2 } from 'lucide-react';

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('partners')
          .select('*')
          .eq('is_distinguished', true)
          .limit(4);

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

  if (loading) {
    return (
      <section className="py-16 bg-flyboy-purple">
        <div className="container text-center">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-flyboy-gold" />
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
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <div className="mb-10 flex justify-center">
          <img 
            src="/lovable-uploads/391e10d1-c56a-4816-ad0c-15fd941a3b2f.png" 
            alt="FLY BOY Logo" 
            className="w-32 h-32 object-contain pulse-glow"
          />
        </div>
        
        <h2 className="section-title text-flyboy-gold mb-12">شركاء النجاح</h2>
        
        {partners.length > 0 && (
          <div className="relative mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-dark p-8">
            <div className="partners-container overflow-hidden">
              <div className="partners-scroll flex flex-wrap justify-center gap-8">
                {partners.map((partner) => (
                  <div 
                    key={partner.id} 
                    className="partner-item flex-shrink-0 flex flex-col items-center justify-center px-8"
                  >
                    <div className="w-48 h-36 bg-white p-4 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=صورة+غير+متوفرة";
                        }}
                      />
                    </div>
                    <h3 className="text-white text-lg font-bold text-center mt-2">{partner.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;
