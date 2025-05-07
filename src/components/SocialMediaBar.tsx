
import React from 'react';
import { MessageCircle, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SocialMediaBar = () => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 24 : 36;
  const iconContainerSize = isMobile ? "p-2" : "p-3";
  // Make spacing consistent across all screen sizes
  const spacingClass = "space-x-3 md:space-x-3";

  return (
    <div className="bg-flyboy-dark py-3">
      <div className={`flex justify-center items-center ${spacingClass}`}>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className={`rounded-full bg-flyboy-gold bg-opacity-20 ${iconContainerSize} hover:bg-opacity-30 transition-all duration-300`}>
            <Facebook size={iconSize} className="text-flyboy-gold" />
          </div>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className={`rounded-full bg-flyboy-gold bg-opacity-20 ${iconContainerSize} hover:bg-opacity-30 transition-all duration-300`}>
            <Instagram size={iconSize} className="text-flyboy-gold" />
          </div>
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className={`rounded-full bg-flyboy-gold bg-opacity-20 ${iconContainerSize} hover:bg-opacity-30 transition-all duration-300`}>
            <Twitter size={iconSize} className="text-flyboy-gold" />
          </div>
        </a>
        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className={`rounded-full bg-flyboy-gold bg-opacity-20 ${iconContainerSize} hover:bg-opacity-30 transition-all duration-300`}>
            <Youtube size={iconSize} className="text-flyboy-gold" />
          </div>
        </a>
        <a href="https://www.snapchat.com/" target="_blank" rel="noopener noreferrer" className="inline-block">
          <div className={`rounded-full bg-flyboy-gold bg-opacity-20 ${iconContainerSize} hover:bg-opacity-30 transition-all duration-300`}>
            <MessageCircle size={iconSize} className="text-flyboy-gold" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialMediaBar;
