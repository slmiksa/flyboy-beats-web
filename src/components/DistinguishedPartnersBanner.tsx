
import React from 'react';
import { Star } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Distinguished partners - these will be shown in the top banner
const distinguishedPartners = [{
  id: 1,
  name: 'Night Vision',
  logo: 'https://images.unsplash.com/photo-1485359466996-ba9c9b4afb63?w=200&h=100&fit=crop&auto=format'
}, {
  id: 2,
  name: 'Sound Masters',
  logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=100&fit=crop&auto=format'
}, {
  id: 3,
  name: 'Sancy Club',
  logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c542?w=200&h=100&fit=crop&auto=format'
}, {
  id: 4,
  name: 'Beach Waves',
  logo: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=200&h=100&fit=crop&auto=format'
}];

const DistinguishedPartnersBanner = () => {
  // Create multiple copies to ensure no gaps in scroll - duplicate more times for a smoother experience
  const duplicateCount = 30;
  const scrollPartners = Array(duplicateCount).fill(distinguishedPartners).flat();
  
  return (
    <section className="bg-flyboy-dark py-6 text-center border-b border-flyboy-gold/30">
      <div className="container">
        <div className="mb-6 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-flyboy-gold text-center">
            شركاء النجاح
          </h2>
        </div>
        
        <div className="flex items-center justify-center mb-2">
          <h3 className="text-xl font-bold text-flyboy-gold relative inline-flex items-center">
            <span className="absolute -top-4 -right-6">
              <Star className="text-flyboy-gold animate-pulse h-5 w-5" fill="#d4af37" />
            </span>
            المتميزين
            <span className="absolute -top-4 -left-6">
              <Star className="text-flyboy-gold animate-pulse h-5 w-5" fill="#d4af37" />
            </span>
          </h3>
        </div>
        
        <div className="mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-purple p-4">
          <div className="overflow-hidden relative w-full">
            <div 
              className="flex"
              style={{
                width: 'max-content',
                gap: '1rem',
                animation: 'scrollLogos 120s linear infinite'
              }}
            >
              {scrollPartners.map((partner, index) => (
                <div key={`${partner.id}-${index}`} className="flex-shrink-0 w-[180px]">
                  <div className="w-full aspect-[4/3] bg-white p-2 rounded-lg flex items-center justify-center mb-2 transform transition-transform hover:scale-105">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <h3 className="text-white text-sm md:text-base font-medium text-center">{partner.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollLogos {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-180px * ${distinguishedPartners.length} - ${distinguishedPartners.length * 1}rem));
            }
          }
        `}
      </style>
    </section>
  );
};

export default DistinguishedPartnersBanner;
