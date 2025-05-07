
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

// قائمة شركاء النجاح الموسعة مع إضافة شعارات وهمية تخص الموسيقى
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
  {
    id: 7,
    name: 'Rhythm Records',
    logo: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 8,
    name: 'Beats Studio',
    logo: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 9,
    name: 'Melody Mix',
    logo: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=100&fit=crop&auto=format',
  },
  {
    id: 10,
    name: 'DJ Collective',
    logo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=100&fit=crop&auto=format',
  },
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <h2 className="section-title text-flyboy-gold mb-12">شركاء النجاح</h2>
        
        <div className="relative mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-dark p-8">
          <Carousel className="w-full">
            <CarouselContent>
              {partners.map((partner) => (
                <CarouselItem key={partner.id} className="flex flex-col items-center justify-center">
                  <div className="w-full h-48 flex flex-col items-center justify-center">
                    <div className="w-48 h-36 bg-white p-4 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-105">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-white text-lg font-bold text-center mt-2">{partner.name}</h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold/90 hover:text-flyboy-dark border-none h-12 w-12 rounded-full" />
            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold/90 hover:text-flyboy-dark border-none h-12 w-12 rounded-full" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
