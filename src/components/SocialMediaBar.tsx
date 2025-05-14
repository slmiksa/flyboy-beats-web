
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
          d="M12 2c3.681 0 5.606 2.57 5.478 5.447-.043 1.019-.192 3.404-.192 3.553a.636.636 0 00.64.585 3.07 3.07 0 001.326-.258c.425-.192.82-.384.82-.384.276-.128.532.064.425.383-.149.384-.276.575-.405.767 0 0-.234.362-.639.67-.064.064-.128.128-.192.192-.362.319-.49.638-.426 1.022.128.575.767 1.405 1.597 1.916.404.255.83.447 1.3.575.276.064.362.362.234.575a2.36 2.36 0 01-.404.468c-.298.276-.723.511-1.17.66-.107.042-.213.17-.234.298-.64.384-.107.766-.17.957-.064.191-.276.319-.489.319a4.98 4.98 0 01-.788-.127c-.447-.107-.958-.213-1.66-.213-.256 0-.533.021-.788.064-1.5.234-2.01 1.724-4.398 1.724-2.388 0-2.92-1.511-4.397-1.724a5.95 5.95 0 00-.788-.064c-.703 0-1.192.106-1.661.213-.255.064-.532.127-.788.127a.394.394 0 01-.49-.32c-.063-.19-.105-.572-.17-.956-.021-.128-.127-.256-.233-.298-.447-.149-.873-.384-1.17-.66a2.36 2.36 0 01-.405-.468c-.128-.213-.042-.51.235-.575.468-.128.894-.32 1.298-.575.83-.51 1.47-1.34 1.598-1.916.064-.384-.064-.703-.426-1.022-.064-.064-.127-.128-.191-.192-.405-.308-.639-.67-.639-.67-.13-.192-.256-.383-.405-.766-.107-.32.149-.512.426-.384 0 0 .394.192.819.384.383.17.82.257 1.326.257.341 0 .575-.213.64-.585 0-.15-.15-2.534-.192-3.553C6.394 4.57 8.32 2 12 2z"
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
