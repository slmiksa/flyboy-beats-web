
import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: '/lovable-uploads/beedc4c4-95b4-4570-b85b-61e8853a966b.png',
    title: 'FLY BOY',
    subtitle: 'أفضل الحفلات والأجواء الموسيقية'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb',
    title: 'أجواء مميزة',
    subtitle: 'تجربة موسيقية فريدة من نوعها'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    title: 'حفلات حصرية',
    subtitle: 'أحدث التقنيات الصوتية والإضاءة'
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-flyboy-gold animate-fade-in">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl px-4 animate-fade-in">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-flyboy-gold' : 'bg-white bg-opacity-50'
            } transition-all duration-300`}
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
