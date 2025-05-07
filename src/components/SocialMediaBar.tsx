
import React from 'react';
import { MessageCircle, Instagram, Twitter } from 'lucide-react';

const SocialMediaBar = () => {
  return (
    <div className="bg-flyboy-dark py-3">
      <div className="container flex justify-center">
        <div className="flex items-center space-x-8 space-x-reverse">
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
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBar;
