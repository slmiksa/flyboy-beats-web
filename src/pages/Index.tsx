
import React, { useEffect, useState } from 'react';
import HeroSlider from '@/components/HeroSlider';
import EventsSection from '@/components/EventsSection';
import PartnersSection from '@/components/PartnersSection';
import AboutSection from '@/components/AboutSection';
import SuccessPartnersBanner from '@/components/SuccessPartnersBanner';
import DistinguishedPartnersBanner from '@/components/DistinguishedPartnersBanner';
import SocialMediaBar from '@/components/SocialMediaBar';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Music, Disc, Volume2, Headphones, Mic, Radio, Music4, FileMusic } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [keywords, setKeywords] = useState<string>('');

  // Fetch keywords from all events for SEO purposes
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from('events').select('keywords').not('keywords', 'is', null);
        if (error) {
          console.error('Error fetching keywords:', error);
          return;
        }
        if (data && data.length > 0) {
          // Combine all keywords and remove duplicates
          const allKeywords = data.map(item => item.keywords).join(', ').split(', ').filter((value, index, self) => self.indexOf(value) === index).join(', ');
          setKeywords(allKeywords);
        }
      } catch (error) {
        console.error('Error processing keywords:', error);
      }
    };
    fetchKeywords();
  }, []);

  // Set meta tags for SEO
  useEffect(() => {
    if (keywords) {
      // Update meta keywords tag
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);

      // Update meta description tag
      const description = 'DJ Flyboy - أفضل دي جي للحفلات والمناسبات في السعودية';
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }
  }, [keywords]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated music elements */}
      {Array(20).fill(0).map((_, i) => (
        <div key={i} className="absolute animate-float z-10" style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 7}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: 0.2,
          filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))'
        }}>
          {i % 8 === 0 ? <Music size={20} className="text-flyboy-gold" /> : i % 8 === 1 ? <Disc size={20} className="text-flyboy-gold" /> : i % 8 === 2 ? <Volume2 size={20} className="text-flyboy-gold" /> : i % 8 === 3 ? <Headphones size={20} className="text-flyboy-gold" /> : i % 8 === 4 ? <Mic size={20} className="text-flyboy-gold" /> : i % 8 === 5 ? <Radio size={20} className="text-flyboy-gold" /> : i % 8 === 6 ? <Music4 size={20} className="text-flyboy-gold" /> : <FileMusic size={20} className="text-flyboy-gold" />}
        </div>
      ))}

      <WhatsAppButton />
      <SocialMediaBar />
      <HeroSlider />
      <EventsSection />
      <DistinguishedPartnersBanner />
      <SuccessPartnersBanner />
      <AboutSection />
    </div>
  );
};

export default Index;
