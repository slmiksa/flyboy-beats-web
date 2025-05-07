import React from 'react';
import { MessageCircle, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
const SocialMediaBar = () => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 24 : 36;
  const iconContainerSize = isMobile ? "p-2" : "p-3";
  // Make spacing consistent across all screen sizes
  const spacingClass = "space-x-3 md:space-x-3";
  return <div className="bg-flyboy-dark py-3">
      
    </div>;
};
export default SocialMediaBar;