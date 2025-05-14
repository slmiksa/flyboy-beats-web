
import React, { useEffect, useState } from 'react';
import { Instagram, Twitter, Youtube, MessageCircle, Facebook, Linkedin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from "@/integrations/supabase/client";
import { SocialMedia } from '@/types/database.types';

const SocialMediaBar = () => {
  const isMobile = useIsMobile();
  const [socialLinks, setSocialLinks] = useState<SocialMedia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Make icons smaller for better mobile display
  const iconSize = isMobile ? 16 : 22;
  const iconContainerSize = isMobile ? "w-8 h-8" : "w-12 h-12";
  // Use consistent spacing for all screen sizes
  const spacingClass = "gap-3 md:gap-4";

  // Map of platforms to their icons
  const iconMap: Record<string, React.ReactNode> = {
    youtube: <Youtube size={iconSize} className="text-flyboy-gold" />,
    tiktok: (
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="text-flyboy-gold"
      >
        <path
          d="M16.6 5.82C16.6 5.82 16.6 5.82 16.6 5.82C15.817 4.954 15.383 3.833 15.383 2.667H12.6V15.333C12.6 16.622 11.555 17.667 10.267 17.667C8.978 17.667 7.933 16.622 7.933 15.333C7.933 14.045 8.978 13 10.267 13C10.535 13 10.795 13.046 11.035 13.133V10.267C10.778 10.223 10.525 10.2 10.267 10.2C7.431 10.2 5.133 12.498 5.133 15.333C5.133 18.169 7.431 20.467 10.267 20.467C13.102 20.467 15.4 18.169 15.4 15.333V8.867C16.389 9.616 17.594 10.058 18.883 10.143V7.343C17.531 7.227 16.933 6.682 16.6 5.82Z"
          fill="currentColor"
        />
      </svg>
    ),
    chat: <MessageCircle size={iconSize} className="text-flyboy-gold" />,
    twitter: <Twitter size={iconSize} className="text-flyboy-gold" />,
    instagram: <Instagram size={iconSize} className="text-flyboy-gold" />,
    snapchat: (
      <svg 
        width={iconSize} 
        height={iconSize} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="text-snapchat"
      >
        <path 
          d="M12 2c2.901 0 5.182 2.323 5 5.5-.065 1.136-.112 2.885-.112 3.55a.75.75 0 00.921.728c1.409-.17 2.28.244 2.897.861.483.483.579 1.022.368 1.54-.232.568-.862 1.069-1.458 1.38a.681.681 0 00-.311.287c-.224.414.159 1.035 1.017 1.647.271.193.394.53.291.837-.198.593-.902.908-2.008 1.147-.188.04-.312.17-.345.354-.059.327-.103.67-.138.95a.739.739 0 01-.675.609c-.344.028-.669-.043-1.097-.139a8.603 8.603 0 00-1.607-.162c-.274 0-.545.02-.809.055-1.396.188-1.948 1.686-4.294 1.686-2.345 0-2.945-1.511-4.307-1.686-.264-.035-.535-.055-.81-.055-.476 0-.97.049-1.443.135-.513.093-.843.16-1.259.166a.739.739 0 01-.675-.609c-.036-.278-.079-.622-.139-.95a.378.378 0 00-.345-.354c-1.106-.239-1.81-.554-2.008-1.147-.104-.307.021-.644.292-.838.857-.611 1.24-1.233 1.016-1.646a.681.681 0 00-.311-.287c-.596-.311-1.226-.812-1.458-1.38-.211-.518-.115-1.057.368-1.54.617-.617 1.489-1.031 2.897-.86a.75.75 0 00.92-.729c0-.665-.046-2.414-.111-3.55C6.818 4.323 9.1 2 12 2z"
          fill="currentColor"
        />
      </svg>
    ),
    facebook: <Facebook size={iconSize} className="text-flyboy-gold" />,
    linkedin: <Linkedin size={iconSize} className="text-flyboy-gold" />,
    jaco: <span className="text-flyboy-gold text-xs md:text-sm font-bold">JACO</span>
  };

  // Fetch social media links from database
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('social_media')
          .select('*')
          .order('order_position', { ascending: true });
        
        if (error) {
          console.error('Error fetching social media links:', error);
        } else {
          setSocialLinks(data as SocialMedia[] || []);
        }
      } catch (error) {
        console.error('Error fetching social media links:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialLinks();
  }, []);

  // If no links in the database, don't display anything
  if (socialLinks.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="bg-flyboy-dark py-4">
      <div className={`flex justify-center items-center ${spacingClass}`}>
        {socialLinks.map((link) => (
          <a 
            key={link.id} 
            href={link.url} 
            target="_blank" 
            rel="noreferrer noopener" 
            className={`${iconContainerSize} rounded-full bg-flyboy-dark border-2 border-flyboy-gold border-opacity-40 flex items-center justify-center hover:border-opacity-60 transition-all duration-300`}
            title={link.platform}
            aria-label={`Visit our ${link.platform} page`}
          >
            {iconMap[link.icon] || iconMap[link.platform] || iconMap['instagram']}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaBar;
