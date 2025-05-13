import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
const AboutSection = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const {
          data,
          error
        } = await supabase.from('about_section').select('content').limit(1).single();
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching about section:', error);
        } else if (data) {
          setContent(data.content);
        } else {
          // Fallback content if no data is found
          setContent("أنا FLY BOY، دي جي محترف ومنسق موسيقي مع خبرة تزيد عن ١٠ سنوات في مجال تنسيق الأغاني وإحياء الحفلات الموسيقية. أتميز بأسلوبي الفريد في دمج الموسيقى العربية والعالمية، وأمتلك القدرة على إضفاء أجواء مميزة تناسب مختلف أنواع المناسبات والحفلات. تتنوع خبراتي بين حفلات الشاطئ، النوادي الليلية، المهرجانات الموسيقية، والمناسبات الخاصة.");
        }
      } catch (error) {
        console.error('Error in fetchAboutData:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutData();
  }, []);
  if (isLoading) {
    return <section className="w-full bg-gradient-hero py-[50px]">
      <div className="container">
        <h2 className="section-title text-flyboy-gold">نبذة عني</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white">جاري التحميل...</p>
        </div>
      </div>
    </section>;
  }
  return <section className="w-full bg-gradient-hero py-[50px]">
      <div className="container">
        <h2 className="section-title text-flyboy-gold">من هو Fly Boy</h2>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-white text-right space-y-4 max-w-3xl mx-auto" dangerouslySetInnerHTML={{
          __html: content
        }} />
          
          <div className="text-center mt-8">
            <Link to="/about" className="inline-flex items-center gap-2 bg-flyboy-gold text-flyboy-dark px-6 py-3 rounded-md font-bold transition-all hover:bg-opacity-90">
              المزيد عني
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;