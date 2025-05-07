
import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(0);

  const goToSlide = (index: number) => {
    if (!sliderRef.current) return;
    
    if (index < 0) {
      currentIndexRef.current = partners.length - 1;
    } else if (index >= partners.length) {
      currentIndexRef.current = 0;
    } else {
      currentIndexRef.current = index;
    }
    
    const translateX = currentIndexRef.current * -100;
    sliderRef.current.style.transform = `translateX(${translateX}%)`;
  };

  const nextSlide = () => {
    goToSlide(currentIndexRef.current + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndexRef.current - 1);
  };

  // Touch handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    
    // Pause auto scroll when touching
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diff = touchStartX.current - touchEndX.current;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left, go next
        nextSlide();
      } else {
        // Swipe right, go prev
        prevSlide();
      }
    }
    
    // Reset touch positions
    touchStartX.current = null;
    touchEndX.current = null;
    
    // Restart auto scroll
    startAutoScroll();
  };

  // Auto scroll
  const startAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    
    autoScrollRef.current = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds
  };

  useEffect(() => {
    startAutoScroll();
    
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-flyboy-purple">
      <div className="container">
        <h2 className="section-title text-flyboy-gold mb-12">شركاء النجاح</h2>
        
        <div className="relative mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-dark p-6">
          <div className="overflow-hidden">
            <div 
              ref={sliderRef} 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ width: `${partners.length * 100}%` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="w-full flex flex-col items-center justify-center px-4"
                  style={{ width: `${100 / partners.length}%` }}
                >
                  <div className="relative w-full">
                    <div className="w-40 h-32 mx-auto bg-white p-3 rounded-lg flex items-center justify-center mb-4 transform transition-transform hover:scale-110">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <h3 className="text-white text-xl font-bold text-center">{partner.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-flyboy-gold text-flyboy-dark flex items-center justify-center z-10 hover:bg-opacity-80 transition-all"
            onClick={prevSlide}
            aria-label="Previous partner"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-flyboy-gold text-flyboy-dark flex items-center justify-center z-10 hover:bg-opacity-80 transition-all"
            onClick={nextSlide}
            aria-label="Next partner"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {partners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndexRef.current === index 
                    ? 'bg-flyboy-gold w-6' 
                    : 'bg-white bg-opacity-30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
