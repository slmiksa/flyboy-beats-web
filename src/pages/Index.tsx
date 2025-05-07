
import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import EventsSection from '@/components/EventsSection';
import PartnersSection from '@/components/PartnersSection';
import AboutSection from '@/components/AboutSection';
import SuccessPartnersBanner from '@/components/SuccessPartnersBanner';
import DistinguishedPartnersBanner from '@/components/DistinguishedPartnersBanner';
import SocialMediaBar from '@/components/SocialMediaBar';
import { Music, Disc, Volume2, Headphones, Mic, Radio, Music4, FileMusic } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated music elements */}
      {Array(20).fill(0).map((_, i) => (
        <div 
          key={i} 
          className="absolute animate-float z-10" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 7}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.2,
            filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))'
          }}
        >
          {i % 8 === 0 ? <Music size={20} className="text-flyboy-gold" /> : 
           i % 8 === 1 ? <Disc size={20} className="text-flyboy-gold" /> : 
           i % 8 === 2 ? <Volume2 size={20} className="text-flyboy-gold" /> : 
           i % 8 === 3 ? <Headphones size={20} className="text-flyboy-gold" /> :
           i % 8 === 4 ? <Mic size={20} className="text-flyboy-gold" /> :
           i % 8 === 5 ? <Radio size={20} className="text-flyboy-gold" /> :
           i % 8 === 6 ? <Music4 size={20} className="text-flyboy-gold" /> :
           <FileMusic size={20} className="text-flyboy-gold" />}
        </div>
      ))}

      <SocialMediaBar />
      <DistinguishedPartnersBanner />
      <SuccessPartnersBanner />
      <HeroSlider />
      <EventsSection />
      <PartnersSection />
      <AboutSection />
    </div>
  );
};

export default Index;
