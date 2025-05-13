
import React, { useState, useEffect } from 'react';
import { Headphones } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/database.types";

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Default events that should be used when no events are in the database
  const defaultEvents = [
    {
      title: 'Festival',
      image_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null
    },
    {
      title: 'Beach Party',
      image_url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null
    },
    {
      title: 'Night Sound',
      image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null
    },
    {
      title: 'Club Mix',
      image_url: 'https://images.unsplash.com/photo-1576525865260-9f0e7cfb02b3',
      whatsapp_number: '966500000000',
      description: null,
      location: null,
      date: null
    }
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatWhatsAppLink = (event: Event) => {
    const number = event.whatsapp_number || '966500000000';
    return `https://wa.me/${number}?text=استفسار%20عن%20فعالية%20${encodeURIComponent(event.title)}`;
  };

  return (
    <section className="py-16 bg-flyboy-dark">
      <div className="container">
        <h2 className="section-title text-flyboy-gold relative">
          حفلاتي
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-flyboy-gold animate-float pulse-glow">
            <Headphones className="w-10 h-10" />
            <div className="equalizer-container absolute left-1/2 -top-1 transform -translate-x-1/2">
              <div className="equalizer-bar"></div>
              <div className="equalizer-bar"></div>
              <div className="equalizer-bar"></div>
            </div>
          </div>
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-flyboy-gold">جاري تحميل الحفلات...</div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-flyboy-purple rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative pb-[90%]">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-flyboy-gold font-bold mb-4">{event.title}</h3>
                  {event.location && (
                    <p className="text-white/80 text-sm mb-3">{event.location}</p>
                  )}
                  <a 
                    href={formatWhatsAppLink(event)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0a12 12 0 0 0-12 12c0 2.38.7 4.6 1.9 6.47L0 24l5.53-1.9A11.98 11.98 0 0 0 12 24a12 12 0 0 0 0-24zm6.03 16.92c-.22.64-1.12 1.17-1.84 1.33-.49.1-1.12.17-3.26-.7-2.73-1.1-4.5-3.76-4.64-3.93-.15-.17-1.2-1.6-1.2-3.05 0-1.45.74-2.17 1-2.46.22-.25.57-.37.91-.37l.33.01c.3 0 .44.03.64.49.24.57.82 2 .89 2.15.07.15.12.32.04.52a1.6 1.6 0 0 1-.3.42c-.15.15-.3.34-.43.45-.15.15-.3.3-.13.59.17.3.77 1.27 1.66 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.65-.07.17-.2.74-.87.94-1.16.2-.3.4-.25.67-.15.27.1 1.7.8 2 .95.29.15.49.22.56.35z"/>
                    </svg>
                    واتساب
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {defaultEvents.map((event, index) => (
              <div 
                key={index} 
                className="bg-flyboy-purple rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
              >
                <div className="relative pb-[90%]">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-flyboy-gold font-bold mb-4">{event.title}</h3>
                  {event.location && (
                    <p className="text-white/80 text-sm mb-3">{event.location}</p>
                  )}
                  <a 
                    href={`https://wa.me/966500000000?text=استفسار%20عن%20فعالية%20${encodeURIComponent(event.title)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0a12 12 0 0 0-12 12c0 2.38.7 4.6 1.9 6.47L0 24l5.53-1.9A11.98 11.98 0 0 0 12 24a12 12 0 0 0 0-24zm6.03 16.92c-.22.64-1.12 1.17-1.84 1.33-.49.1-1.12.17-3.26-.7-2.73-1.1-4.5-3.76-4.64-3.93-.15-.17-1.2-1.6-1.2-3.05 0-1.45.74-2.17 1-2.46.22-.25.57-.37.91-.37l.33.01c.3 0 .44.03.64.49.24.57.82 2 .89 2.15.07.15.12.32.04.52a1.6 1.6 0 0 1-.3.42c-.15.15-.3.34-.43.45-.15.15-.3.3-.13.59.17.3.77 1.27 1.66 2.06 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.65-.07.17-.2.74-.87.94-1.16.2-.3.4-.25.67-.15.27.1 1.7.8 2 .95.29.15.49.22.56.35z"/>
                    </svg>
                    واتساب
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
