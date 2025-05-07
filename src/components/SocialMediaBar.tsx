
import React from 'react';
import { MessageCircle, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

const SocialMediaBar = () => {
  return (
    <div className="bg-flyboy-dark py-3">
      <div className="container flex justify-center">
        <div className="flex items-center space-x-8 space-x-reverse flex-wrap justify-center gap-y-4">
          <a
            href="https://snapchat.com/add/flyboy"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Snapchat"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <MessageCircle size={36} className="text-flyboy-gold" />
            </div>
          </a>
          <a
            href="https://instagram.com/flyboy"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Instagram"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <Instagram size={36} className="text-flyboy-gold" />
            </div>
          </a>
          <a
            href="https://twitter.com/flyboy"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Twitter"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <Twitter size={36} className="text-flyboy-gold" />
            </div>
          </a>
          {/* WhatsApp Icon */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="WhatsApp"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <MessageCircle size={36} className="text-flyboy-gold" />
            </div>
          </a>
          {/* TikTok Icon */}
          <a
            href="https://tiktok.com/@flyboy"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="TikTok"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <svg 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-flyboy-gold"
              >
                <path 
                  d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298.001.595.038.88.11V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.95 4.37A6.33 6.33 0 0 0 15.34 16V8.73a8.16 8.16 0 0 0 4.25 1.25V6.69z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
          {/* YouTube Icon */}
          <a
            href="https://youtube.com/c/flyboy"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="YouTube"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <Youtube size={36} className="text-flyboy-gold" />
            </div>
          </a>
          {/* Jako Icon (redesigned to match other icons) */}
          <a
            href="#jako"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Jako"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40">
              <svg 
                width="36" 
                height="36" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="text-flyboy-gold"
              >
                <path 
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                <path 
                  d="M9 8.5C9 7.67 9.67 7 10.5 7H13.5C14.33 7 15 7.67 15 8.5V15.5C15 16.33 14.33 17 13.5 17H10.5C9.67 17 9 16.33 9 15.5V8.5Z" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                <path 
                  d="M9 10.5H15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 13.5H15" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
