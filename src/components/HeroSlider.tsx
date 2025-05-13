
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Disc, Volume2 } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Slide } from "@/types/database.types";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<number | null>(null);

  // Fetch slides from database
  useEffect(() => {
    const fetchSlides = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('slides')
          .select('*')
          .order('order_position', { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setSlides(data as Slide[]);
        } else {
          // If no slides are found, set default empty state
          setSlides([]);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const startSlideshow = () => {
    if (intervalRef.current !== null || slides.length === 0) return;
    
    intervalRef.current = window.setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 5000);
  };

  const stopSlideshow = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startSlideshow();
    return () => stopSlideshow();
  }, [isPaused, slides.length]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (loading) {
    return (
      <div className="py-6 overflow-hidden bg-flyboy-dark">
        <div className="container">
          <div className="relative w-full h-[60vh] md:h-[70vh] mx-auto rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-flyboy-gold text-xl">جاري تحميل السلايدات...</div>
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="py-6 overflow-hidden bg-flyboy-dark">
        <div className="container">
          <div className="relative w-full h-[60vh] md:h-[70vh] mx-auto rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-flyboy-gold text-xl">لا توجد سلايدات متاحة</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 overflow-hidden bg-flyboy-dark">
      <div className="container">
        <div className="relative w-full h-[60vh] md:h-[70vh] mx-auto rounded-2xl overflow-hidden shadow-2xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image_url})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
              
              {/* Animated elements */}
              <div className="absolute top-10 left-10 animate-pulse">
                <Disc size={30} className="text-flyboy-gold" />
              </div>
              <div className="absolute bottom-10 right-10 animate-bounce">
                <Music size={30} className="text-flyboy-gold" />
              </div>
              <div className="absolute top-10 right-10 animate-pulse">
                <Volume2 size={30} className="text-flyboy-gold" />
              </div>
              
              {/* Audio wave effect */}
              <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center space-x-1 px-4">
                {Array(20).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 bg-flyboy-gold opacity-70" 
                    style={{ 
                      height: `${Math.random() * 100}%`,
                      animation: `equalizer ${0.5 + Math.random() * 1}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-flyboy-gold animate-fade-in glow-text">
                  {slide.title}
                </h1>
                {slide.subtitle && (
                  <p className="text-xl md:text-2xl max-w-2xl px-4 animate-fade-in mb-8">
                    {slide.subtitle}
                  </p>
                )}
                
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={togglePause} 
                    className="bg-flyboy-gold bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  >
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-flyboy-gold w-6' : 'bg-white bg-opacity-50'
                }`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
