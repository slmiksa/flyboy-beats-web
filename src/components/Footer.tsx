
import React from 'react';
import { MessageCircle, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-flyboy-purple py-8 mt-16">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-flyboy-gold text-xl font-bold mb-4">تابعني على وسائل التواصل الاجتماعي</h3>
          <div className="flex space-x-6 space-x-reverse">
            <a
              href="https://snapchat.com/add/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-colors"
              aria-label="Snapchat"
            >
              <MessageCircle size={30} />
            </a>
            <a
              href="https://instagram.com/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={30} />
            </a>
            <a
              href="https://twitter.com/flyboy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-flyboy-gold transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={30} />
            </a>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white opacity-75">
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - FLY BOY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
