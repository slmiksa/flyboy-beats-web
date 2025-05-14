
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
        className="text-flyboy-gold"
      >
        <path 
          d="M12 2C14.5 2 17 4.5 17 7.5C17 8.5 17 10 17 11.5C18 11.5 19 11.5 20 11.5C20.5 11.5 20.5 12 20.5 12.5C20.5 13 19.5 13.5 18.5 14C18 14.5 18 14.5 18.5 15C19 15.5 20 15.5 20.5 16C21 16.5 20.5 17 20 17C19.5 17 18 17 17 17C16.5 17 16 17.5 16 18C16 18.5 16.5 19.5 16.5 20C16.5 20.5 16 21 15.5 21C13 21 11 21 8.5 21C7 21 5 18.5 5 17.5C4.5 17 4 17 3.5 17C3 17 2.5 16.5 3 16C3.5 15.5 4.5 15.5 5 15C5.5 14.5 5.5 14.5 5 14C4 13.5 3 13 3.5 12.5C3.5 12 3.5 11.5 4 11.5C5 11.5 6 11.5 7 11.5C7 10 7 8.5 7 7.5C7 4.5 9.5 2 12 2ZM12 18.5C11.5 19 11 19 10.5 19C10 19 9.5 19 9 18.5C8.5 19 8 19 7.5 19C8 19.5 9 20 10.5 20C12 20 13 19.5 13.5 19C13 19 12.5 19 12 18.5ZM8.5 15C8 15 7.5 15 7 15.5C6.5 16 6.5 16 7 16C7.5 16 7.5 15.5 8.5 15ZM16 15.5C15.5 15 15 15 14.5 15C15.5 15.5 15.5 16 16 16C16.5 16 16.5 16 16 15.5Z"
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
