
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-hero">
      <div className="container">
        <h2 className="section-title text-flyboy-gold">نبذة عني</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-white leading-relaxed mb-8">
            أنا FLY BOY، دي جي محترف ومنسق موسيقي مع خبرة تزيد عن ١٠ سنوات في مجال تنسيق الأغاني وإحياء الحفلات الموسيقية. 
            أتميز بأسلوبي الفريد في دمج الموسيقى العربية والعالمية، وأمتلك القدرة على إضفاء أجواء مميزة تناسب مختلف أنواع المناسبات والحفلات.
            تتنوع خبراتي بين حفلات الشاطئ، النوادي الليلية، المهرجانات الموسيقية، والمناسبات الخاصة.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-flyboy-gold text-flyboy-dark px-6 py-3 rounded-md font-bold transition-all hover:bg-opacity-90"
          >
            المزيد عني
            <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
