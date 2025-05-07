
import React from 'react';
import { Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const SocialMediaBar = () => {
  const isMobile = useIsMobile();
  const iconSize = isMobile ? 20 : 28;
  const iconContainerSize = isMobile ? "w-10 h-10" : "w-14 h-14";
  // Make spacing consistent across all screen sizes
  const spacingClass = "space-x-2 md:space-x-3";

  return (
    <div className="bg-flyboy-dark py-4">
      <div className={`flex justify-center items-center ${spacingClass}`}>
        {/* JACO */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <span className="text-flyboy-gold text-xs md:text-sm font-bold">JACO</span>
        </div>
        {/* Youtube */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <Youtube size={iconSize} className="text-flyboy-gold" />
        </div>
        {/* TikTok */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-flyboy-gold">
            <path d="M20 8V16C20 19.3137 17.3137 22 14 22H10C6.68629 22 4 19.3137 4 16V8C4 4.68629 6.68629 2 10 2H14C17.3137 2 20 4.68629 20 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 2V10C17 13.3137 14.3137 16 11 16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 13.5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* Message/Chat Icon */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <MessageCircle size={iconSize} className="text-flyboy-gold" />
        </div>
        {/* Twitter */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <Twitter size={iconSize} className="text-flyboy-gold" />
        </div>
        {/* Instagram */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <Instagram size={iconSize} className="text-flyboy-gold" />
        </div>
        {/* Snapchat */}
        <div className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}>
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-flyboy-gold">
            <path d="M12 2C9.028 2 7.5 4.25 7.5 7.25C7.5 8.25 7.4 10 7.3 11C7.265 11 7.233 11 7.2 11C6.7 11 6 10.5 5 10.5C4.5 10.5 4 10.75 4 11.25C4 12 5.5 12.5 6 13C6.5 13.5 6.5 14 6 14.5C5.829 14.671 5.535 14.758 5.2 14.8C4.8 14.9 4 15 4 15.5C4 16 5 16 5.5 16C6 16 6.5 16.1 7 16.5C7.5 17 7 18 7 18.5C7 20 9 21 12 21C15 21 17 20 17 18.5C17 18 16.5 17 17 16.5C17.5 16.1 18 16 18.5 16C19 16 20 16 20 15.5C20 15 19.2 14.9 18.8 14.8C18.465 14.758 18.171 14.671 18 14.5C17.5 14 17.5 13.5 18 13C18.5 12.5 20 12 20 11.25C20 10.75 19.5 10.5 19 10.5C18 10.5 17.3 11 16.8 11C16.767 11 16.735 11 16.7 11C16.6 10 16.5 8.25 16.5 7.25C16.5 4.25 14.972 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
