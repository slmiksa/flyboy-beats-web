
import React from 'react';
import { MessageCircle, Instagram, Twitter, Youtube } from 'lucide-react';

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
          {/* TikTok Icon (improved version) */}
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
          {/* Jako Icon (using the provided image) */}
          <a
            href="#jako"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Jako"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40 flex items-center justify-center" style={{ minWidth: '60px', minHeight: '60px' }}>
              <img 
                src="/lovable-uploads/8bb79f14-bc71-4f2d-9894-5f4e7915da4b.png" 
                alt="Jako" 
                width="36" 
                height="36" 
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
