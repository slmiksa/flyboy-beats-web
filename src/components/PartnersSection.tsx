
import React from 'react';

const partners = [
  {
    id: 1,
    name: 'Sancy Club',
    logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c542?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'Sound Masters',
    logo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'Night Vision',
    logo: 'https://images.unsplash.com/photo-1485359466996-ba9c9b4afb63?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Beach Waves',
    logo: 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'Music Vibes',
    logo: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'Sound Garden',
    logo: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=100&fit=crop&auto=format',
  },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <h2 className="section-title text-flyboy-gold">شركاء النجاح</h2>
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="inline-flex flex-col items-center justify-center mx-8"
              >
                <div className="w-32 h-24 bg-white p-2 rounded-lg flex items-center justify-center mb-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="text-white font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
