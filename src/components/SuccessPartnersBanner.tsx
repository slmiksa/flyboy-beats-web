
import React, { useRef, useEffect } from 'react';

// Partners list (reused from PartnersSection)
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

const SuccessPartnersBanner = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!scrollerRef.current) return;
    
    // Clone items for seamless scrolling
    const scrollerInner = scrollerRef.current.querySelector('.scroller-inner') as HTMLElement;
    const scrollerContent = Array.from(scrollerInner.children);
    
    // Clone enough items to ensure we have a good number for smooth looping
    scrollerContent.forEach(item => {
      const clone = item.cloneNode(true);
      scrollerInner.appendChild(clone);
    });
    
    // If we need even more clones for wider screens
    scrollerContent.forEach(item => {
      const clone = item.cloneNode(true);
      scrollerInner.appendChild(clone);
    });
  }, []);
  
  return (
    <section className="bg-flyboy-dark py-6 text-center">
      <div className="container">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-xl font-bold text-flyboy-gold">الكل</h3>
        </div>
        
        <div className="mx-auto max-w-4xl border-2 border-flyboy-gold rounded-2xl overflow-hidden bg-flyboy-purple p-4">
          <div className="scroller" ref={scrollerRef}>
            <div className="scroller-inner">
              {partners.map((partner) => (
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
        </div>
      </div>

      <style>
        {`
        .scroller {
          max-width: 100%;
          overflow: hidden;
        }
        
        .scroller-inner {
          display: flex;
          flex-wrap: nowrap;
          animation: scroll var(--scroll-duration, 30s) linear infinite;
          width: max-content;
        }
        
        .partner-item {
          flex: 0 0 auto;
          width: 130px;
          padding: 0 3px;
        }
        
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }
        
        /* Adjust direction for RTL */
        .scroller {
          direction: rtl;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .scroller-inner {
            animation-play-state: paused;
          }
        }
        `}
      </style>
    </section>
  );
};

export default SuccessPartnersBanner;
