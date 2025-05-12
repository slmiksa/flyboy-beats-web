
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

// Partners list (same as in SuccessPartnersBanner)
const partners = [{
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

const AllPartners = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-flyboy-dark py-16">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="mb-8 flex items-center">
          <Button asChild variant="outline" className="text-flyboy-gold hover:text-flyboy-gold/80 flex items-center gap-2">
            <Link to="/">
              <ChevronRight className="rotate-180 h-5 w-5" />
              <span>العودة للرئيسية</span>
            </Link>
          </Button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-flyboy-gold mb-12 text-center">
          كل شركاء النجاح
        </h1>
        
        <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'} mx-auto justify-items-center`}>
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="border-2 border-flyboy-gold rounded-xl overflow-hidden bg-flyboy-purple p-6 flex flex-col items-center w-full max-w-[280px]"
            >
              <div className="w-full aspect-[4/3] bg-white p-4 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-white text-xl font-medium text-center">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPartners;
