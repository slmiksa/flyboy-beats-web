
import React from 'react';
import HeroSlider from '@/components/HeroSlider';
import EventsSection from '@/components/EventsSection';
import PartnersSection from '@/components/PartnersSection';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <EventsSection />
      <PartnersSection />
      <AboutSection />
    </div>
  );
};

export default Index;
