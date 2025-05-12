
import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}];

const DistinguishedPartnersBanner = () => {
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
              <Star className="text-flyboy-gold h-5 w-5" fill="#d4af37" />
            </span>
            المتميزين
            <span className="absolute -top-4 -left-6">
              <Star className="text-flyboy-gold h-5 w-5" fill="#d4af37" />
            </span>
          </h3>
        </div>
        
        <div className="mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-purple p-4 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {distinguishedPartners.map((partner) => (
              <div 
                key={partner.id} 
                className="partner-item"
              >
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
        
        <Link 
          to="/distinguished-partners" 
          className="inline-block text-flyboy-gold hover:text-flyboy-gold/80 text-sm font-medium"
        >
          مشاهدة الكل
        </Link>
      </div>
    </section>
  );
};

export default DistinguishedPartnersBanner;
