
import React, { useRef, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
  const marqueeRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const animationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // Set up touch handling
    const marquee = marqueeRef.current;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      
      // Pause animation when touch starts
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartXRef.current) return;
      touchEndXRef.current = e.touches[0].clientX;
      
      if (touchStartXRef.current && touchEndXRef.current && marquee) {
        // Calculate movement and apply as transform
        const diff = touchEndXRef.current - touchStartXRef.current;
        marquee.style.transform = `translateX(${diff}px)`;
      }
    };
    
    const handleTouchEnd = () => {
      // Reset and resume animation
      if (marquee && animationRef.current) {
        marquee.style.transform = '';
        animationRef.current.play();
      }
      
      touchStartXRef.current = null;
      touchEndXRef.current = null;
    };
    
    marquee.addEventListener('touchstart', handleTouchStart);
    marquee.addEventListener('touchmove', handleTouchMove);
    marquee.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      marquee.removeEventListener('touchstart', handleTouchStart);
      marquee.removeEventListener('touchmove', handleTouchMove);
      marquee.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <h2 className="section-title text-flyboy-gold">شركاء النجاح</h2>
        
        <div className="mt-10">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-1">
              {partners.map((partner) => (
                <CarouselItem key={partner.id} className="pl-1 md:basis-1/2 lg:basis-1/4">
                  <div className="p-1 h-full">
                    <div className="bg-flyboy-dark border border-flyboy-gold p-4 rounded-xl flex flex-col items-center justify-center h-full transition-all hover:transform hover:scale-105">
                      <div className="w-32 h-24 bg-white p-2 rounded-lg flex items-center justify-center mb-2">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-white font-medium mt-2">{partner.name}</span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold hover:text-flyboy-dark hover:opacity-80" />
            <CarouselNext className="right-0 bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold hover:text-flyboy-dark hover:opacity-80" />
          </Carousel>
        </div>
        
        <div className="mt-12 relative overflow-hidden">
          <h3 className="text-center text-flyboy-gold text-xl mb-6">جميع الشركاء</h3>
          <div className="relative overflow-hidden">
            <div 
              ref={marqueeRef}
              className="flex whitespace-nowrap animate-marquee touch-pan-x"
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="inline-flex flex-col items-center justify-center mx-8"
                >
                  <div className="w-24 h-20 bg-white p-2 rounded-lg flex items-center justify-center mb-2 hover:transform hover:scale-110 transition-all duration-300">
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
      </div>
    </section>
  );
};

export default PartnersSection;
