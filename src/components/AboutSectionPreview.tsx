
import React from "react";
import { Music } from "lucide-react";

interface AboutSectionPreviewProps {
  content: string;
  imageUrl: string | null;
}

const AboutSectionPreview: React.FC<AboutSectionPreviewProps> = ({
  content,
  imageUrl
}) => {
  return (
    <div className="bg-gradient-hero px-6 py-8 rounded-lg">
      <h2 className="text-2xl font-bold text-flyboy-gold text-center mb-8">
        نبذة عن FLY BOY
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div 
          className="text-white text-right"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {imageUrl && (
          <div className="relative group">
            <div className="absolute inset-0 bg-flyboy-gold blur-md opacity-20 rounded-lg"></div>
            <img 
              src={imageUrl} 
              alt="FLY BOY DJ"
              className="w-full h-auto rounded-lg shadow-xl relative z-10"
            />
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <button className="inline-flex items-center gap-2 bg-flyboy-gold text-flyboy-dark px-6 py-3 rounded-md font-bold transition-all hover:bg-opacity-90">
          المزيد عني
        </button>
      </div>
    </div>
  );
};

export default AboutSectionPreview;
