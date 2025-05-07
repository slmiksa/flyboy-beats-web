
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-24 bg-gradient-hero">
      <div className="container">
        <div className="flex items-center mb-6">
          <Link to="/" className="text-white hover:text-flyboy-gold flex items-center gap-2 transition-colors">
            <ArrowRight size={20} />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-flyboy-gold mb-12 text-center">
          نبذة عن FLY BOY
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <img 
              src="/lovable-uploads/beedc4c4-95b4-4570-b85b-61e8853a966b.png" 
              alt="FLY BOY DJ" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          
          <div className="space-y-6 text-white">
            <p className="text-xl leading-relaxed">
              بدأت مسيرتي الموسيقية منذ أكثر من عشر سنوات، حيث وجدت شغفي في عالم تنسيق الموسيقى وفن الـ DJ. تخصصت في البداية في موسيقى الهاوس والإلكترونيك، ثم توسعت لأشمل أنماطًا متنوعة من الموسيقى العربية والعالمية.
            </p>
            
            <p className="text-xl leading-relaxed">
              حصلت على تدريب احترافي في أفضل مدارس الـ DJ العالمية، وعملت مع نخبة من المنتجين الموسيقيين الذين أثروا أسلوبي وطوروا مهاراتي.
            </p>
            
            <p className="text-xl leading-relaxed">
              أقدم حاليًا عروضي في أرقى النوادي والمناسبات في منطقة الخليج والشرق الأوسط، وأتميز بقدرتي على قراءة الجمهور وتلبية أذواقهم الموسيقية المختلفة.
            </p>
            
            <div className="pt-6">
              <h3 className="text-2xl font-bold text-flyboy-gold mb-4">خبراتي تشمل:</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>حفلات الشاطئ وأمسيات البحر</li>
                <li>المهرجانات الموسيقية الكبرى</li>
                <li>النوادي الليلية والحفلات الخاصة</li>
                <li>المناسبات الشخصية والشركات</li>
                <li>تنسيق وإنتاج المقاطع الموسيقية</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
