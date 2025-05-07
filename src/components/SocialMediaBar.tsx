
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
          {/* TikTok Icon (using custom SVG since it's not in lucide-react) */}
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
                  d="M16.6 5.82C16.6 5.82 16.895 5.82 17.25 5.82C17.7 5.82 18.0332 5.82 18.0332 5.82V9.8C18.0332 9.8 17.0574 9.8 16.6 9.8C13.2 9.8 13.2 13 13.2 13V21.5C13.2 21.5 10 21.5 10 21.5V13C10 13 10 9.8 6.6 9.8C6.6 9.8 6.6 6.8 6.6 6.8C8.98324 6.8 10 4.9 10 4.9V4C10 3.5 10 2.5 11.1 2.5H14.1C14.1 2.5 14.1 4.28647 16.6 5.82Z" 
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
          {/* Jako Icon (custom text) */}
          <a
            href="#jako"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            aria-label="Jako"
          >
            <div className="bg-flyboy-gold bg-opacity-20 rounded-full p-3 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-opacity-40 flex items-center justify-center" style={{ minWidth: '60px', minHeight: '60px' }}>
              <span className="text-flyboy-gold font-bold text-xl">جاكو</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
