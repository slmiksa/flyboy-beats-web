import React from 'react';
import { Link } from 'react-router-dom';

// Partners list (limited to 3)
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
}];
const SuccessPartnersBanner = () => {
  return <section className="bg-flyboy-dark py-10 text-center">
      <div className="container max-w-5xl px-4 mx-auto">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-xl font-bold text-flyboy-gold">الكل</h3>
        </div>
        
        <div className="mx-auto border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-purple p-6 mb-4 px-[133px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map(partner => <div key={partner.id} className="partner-item flex flex-col items-center">
                <div className="w-full aspect-[4/3] bg-white p-3 rounded-lg flex items-center justify-center mb-3 transform transition-transform hover:scale-105">
                  <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                </div>
                <h3 className="text-white text-base font-medium text-center">{partner.name}</h3>
              </div>)}
          </div>
        </div>
        
        <Link to="/all-partners" className="inline-block text-flyboy-gold hover:text-flyboy-gold/80 text-sm font-medium">
          مشاهدة الكل
        </Link>
      </div>
    </section>;
};
export default SuccessPartnersBanner;