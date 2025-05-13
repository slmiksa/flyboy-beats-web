
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
          d="M12 2C9.5 2 8 3.5 8 6.5C8 7.25 7.875 9.25 7.75 10.5C7 10.5 6 10 5 10C4.5 10 4 10.25 4 11C4 11.75 5 12.25 6 13C6.5 13.5 6.5 14 6 14.5C5.5 15 4.5 15 4 15C3.5 15 3 15.5 3 16C3 17 4.5 17 5.5 17C6 17 6.5 17.25 6.75 18C7 18.75 6.5 20 6 20.5C6 21.5 8.5 22 12 22C15.5 22 18 21.5 18 20.5C17.5 20 17 18.75 17.25 18C17.5 17.25 18 17 18.5 17C19.5 17 21 17 21 16C21 15.5 20.5 15 20 15C19.5 15 18.5 15 18 14.5C17.5 14 17.5 13.5 18 13C19 12.25 20 11.75 20 11C20 10.25 19.5 10 19 10C18 10 17 10.5 16.25 10.5C16.125 9.25 16 7.25 16 6.5C16 3.5 14.5 2 12 2Z"
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

  // Default links if none are configured yet
  const defaultSocialLinks: SocialMedia[] = [
    { id: '1', platform: 'snapchat', url: '#', icon: 'snapchat', order_position: 1, created_at: '', updated_at: '' },
    { id: '2', platform: 'instagram', url: '#', icon: 'instagram', order_position: 2, created_at: '', updated_at: '' },
    { id: '3', platform: 'twitter', url: '#', icon: 'twitter', order_position: 3, created_at: '', updated_at: '' },
    { id: '4', platform: 'chat', url: '#', icon: 'chat', order_position: 4, created_at: '', updated_at: '' },
    { id: '5', platform: 'tiktok', url: '#', icon: 'tiktok', order_position: 5, created_at: '', updated_at: '' },
    { id: '6', platform: 'youtube', url: '#', icon: 'youtube', order_position: 6, created_at: '', updated_at: '' },
    { id: '7', platform: 'jaco', url: '#', icon: 'jaco', order_position: 7, created_at: '', updated_at: '' }
  ];

  const linksToShow = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <div className="bg-flyboy-dark py-4">
      <div className={`flex justify-center items-center ${spacingClass}`}>
        {linksToShow.map((link) => (
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
