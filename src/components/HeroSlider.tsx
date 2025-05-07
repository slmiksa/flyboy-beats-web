
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Disc, Volume2 } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop',
    title: 'FLY BOY',
    subtitle: 'أفضل الحفلات والأجواء الموسيقية'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1493676010878-4c37716e448e?w=800&h=500&fit=crop',
    title: 'أجواء مميزة',
    subtitle: 'تجربة موسيقية فريدة من نوعها'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop',
    title: 'حفلات حصرية',
    subtitle: 'أحدث التقنيات الصوتية والإضاءة'
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startSlideshow = () => {
    if (intervalRef.current !== null) return;
    
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
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

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
                style={{ backgroundImage: `url(${slide.image})` }}
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
                <p className="text-xl md:text-2xl max-w-2xl px-4 animate-fade-in mb-8">
                  {slide.subtitle}
                </p>
                
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
