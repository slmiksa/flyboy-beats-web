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
      <div className="container flex justify-center mx-0 my-0 py-0 rounded-full px-0">
        <div className={`flex items-center ${spacingClass} space-x-reverse flex-nowrap overflow-x-auto`}>
          <a href="https://snapchat.com/add/flyboy" target="_blank" rel="noopener noreferrer" aria-label="Snapchat" className="group mx-0 px-0 py-0 my-0">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-flyboy-gold mx-[5px]">
                <path d="M12 2C9.3802 2 8.31424 2.44275 7.23316 3.52513C6.15207 4.60752 5.83333 5.76354 5.83333 9.33333C5.83333 10.169 5.68889 10.7611 5.52222 11.1278C5.37778 11.4389 5.22222 11.5389 5.07778 11.5944C4.91111 11.6611 4.67778 11.6944 4.33889 11.6944C3.97778 11.6944 3.6 11.6167 3.27778 11.5056C3.11667 11.45 2.93889 11.3944 2.77222 11.3944C2.63889 11.3944 2.5 11.4167 2.36667 11.5056C2.21111 11.6167 2.1 11.8056 2.1 12.05C2.1 12.3944 2.52222 12.7278 2.94444 12.9944C3.22222 13.1722 3.61111 13.3389 4.10556 13.5056C4.31111 13.5833 4.53889 13.6611 4.77778 13.7611C4.9 13.8167 5.02778 13.9111 5.11667 14.0389C5.25 14.2167 5.2 14.5056 5.05556 14.7611C5.02778 14.8056 5 14.8611 4.96111 14.9056C4.91111 14.9944 4.85 15.0833 4.78889 15.1722C4.68889 15.3278 4.58889 15.4722 4.47778 15.6278C4.3 15.8722 4.11111 16.1167 3.9 16.3389C3.56111 16.7 3.22222 17.0389 2.92222 17.3167C2.31111 17.8833 1.86667 18.3278 1.86667 18.7722C1.86667 18.9389 1.94444 19.1722 2.18333 19.3389C2.55 19.5944 3.07778 19.5278 3.70556 19.3944C4.32222 19.2611 5.02222 19.0722 5.57778 19.3389C5.82778 19.4611 6.04444 19.7389 6.31111 20.1167C6.68333 20.6611 7.15556 21.3278 8.05556 21.8056C8.86667 22.2389 9.7 22.2278 10.45 22.2167H11.5167C12.2667 22.2278 13.1 22.2389 13.9111 21.8056C14.8111 21.3278 15.2833 20.6611 15.6556 20.1167C15.9222 19.7389 16.1389 19.4611 16.3889 19.3389C16.9444 19.0722 17.6444 19.2611 18.2611 19.3944C18.8889 19.5278 19.4167 19.5944 19.7833 19.3389C20.0222 19.1722 20.1 18.9389 20.1 18.7722C20.1 18.3278 19.6556 17.8833 19.0444 17.3167C18.7444 17.0389 18.4056 16.7 18.0667 16.3389C17.8556 16.1167 17.6667 15.8722 17.4889 15.6278C17.3778 15.4722 17.2778 15.3278 17.1778 15.1722C17.1167 15.0833 17.0556 14.9944 17.0056 14.9056C16.9667 14.8611 16.9389 14.8056 16.9111 14.7611C16.7667 14.5056 16.7167 14.2167 16.85 14.0389C16.9389 13.9111 17.0667 13.8167 17.1889 13.7611C17.4278 13.6611 17.6556 13.5833 17.8611 13.5056C18.3556 13.3389 18.7444 13.1722 19.0222 12.9944C19.4444 12.7278 19.8667 12.3944 19.8667 12.05C19.8667 11.8056 19.7556 11.6167 19.6 11.5056C19.4667 11.4167 19.3278 11.3944 19.1944 11.3944C19.0278 11.3944 18.85 11.45 18.6889 11.5056C18.3667 11.6167 17.9889 11.6944 17.6278 11.6944C17.2889 11.6944 17.0556 11.6611 16.8889 11.5944C16.7444 11.5389 16.5889 11.4389 16.4444 11.1278C16.2778 10.7611 16.1333 10.169 16.1333 9.33333C16.1333 5.76354 15.8146 4.60752 14.7335 3.52513C13.6524 2.44275 12.5865 2 10 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
          <a href="https://instagram.com/flyboy" target="_blank" rel="noopener noreferrer" className="group" aria-label="Instagram">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <Instagram size={iconSize} className="text-flyboy-gold" />
            </div>
          </a>
          <a href="https://twitter.com/flyboy" target="_blank" rel="noopener noreferrer" className="group" aria-label="Twitter">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <Twitter size={iconSize} className="text-flyboy-gold" />
            </div>
          </a>
          {/* WhatsApp Icon */}
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="group" aria-label="WhatsApp">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <MessageCircle size={iconSize} className="text-flyboy-gold" />
            </div>
          </a>
          {/* TikTok Icon */}
          <a href="https://tiktok.com/@flyboy" target="_blank" rel="noopener noreferrer" className="group" aria-label="TikTok">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-flyboy-gold">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298.001.595.038.88.11V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.95 4.37A6.33 6.33 0 0 0 15.34 16V8.73a8.16 8.16 0 0 0 4.25 1.25V6.69z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </a>
          {/* YouTube Icon */}
          <a href="https://youtube.com/c/flyboy" target="_blank" rel="noopener noreferrer" className="group" aria-label="YouTube">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40`}>
              <Youtube size={iconSize} className="text-flyboy-gold" />
            </div>
          </a>
          {/* JACO Text Icon */}
          <a href="#jako" target="_blank" rel="noopener noreferrer" className="group" aria-label="JACO">
            <div className={`bg-flyboy-gold bg-opacity-20 rounded-full ${iconContainerSize} transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40 flex items-center justify-center ${isMobile ? "min-w-[48px]" : "min-w-[60px]"}`}>
              <span className="text-flyboy-gold font-bold text-lg md:text-xl">JACO</span>
            </div>
          </a>
        </div>
      </div>
    </div>;
};
export default SocialMediaBar;