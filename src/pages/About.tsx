
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Music, Disc, Volume2, Headphones, Mic, Radio, Music4, FileMusic } from 'lucide-react';

const About = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  return <div className="min-h-screen py-24 bg-gradient-hero relative overflow-hidden">
      {/* Animated music elements */}
      {Array(20).fill(0).map((_, i) => (
        <div 
          key={i} 
          className="absolute animate-float" 
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 7}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.2,
            filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))'
          }}
        >
          {i % 8 === 0 ? <Music size={20} className="text-flyboy-gold" /> : 
           i % 8 === 1 ? <Disc size={20} className="text-flyboy-gold" /> : 
           i % 8 === 2 ? <Volume2 size={20} className="text-flyboy-gold" /> : 
           i % 8 === 3 ? <Headphones size={20} className="text-flyboy-gold" /> :
           i % 8 === 4 ? <Mic size={20} className="text-flyboy-gold" /> :
           i % 8 === 5 ? <Radio size={20} className="text-flyboy-gold" /> :
           i % 8 === 6 ? <Music4 size={20} className="text-flyboy-gold" /> :
           <FileMusic size={20} className="text-flyboy-gold" />}
        </div>
      ))}

      <div className="container relative z-10">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="bg-flyboy-gold text-flyboy-dark hover:bg-flyboy-gold/90 px-4 py-2 rounded-md flex items-center gap-2 transition-all">
            <ArrowRight size={20} />
            <span>العودة للرئيسية</span>
          </Link>
          
          <div className="pulse-glow">
            
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-flyboy-gold mb-12 text-center glow-text">
          نبذة عن FLY BOY
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-flyboy-gold blur-md opacity-20 group-hover:opacity-30 transition-opacity rounded-lg"></div>
            <img alt="FLY BOY DJ" className="w-full h-auto rounded-lg shadow-xl relative z-10" src="/lovable-uploads/516e9f78-1fb5-4933-bffb-e8b3bd51edf0.png" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-flyboy-purple border-2 border-flyboy-gold rounded-full flex items-center justify-center animate-pulse">
              <Disc size={32} className="text-flyboy-gold" />
            </div>
          </div>
          
          <div className="space-y-6 text-white">
            <p className="text-xl leading-relaxed animate-fade-in">
              بدأت مسيرتي الموسيقية منذ أكثر من عشر سنوات، حيث وجدت شغفي في عالم تنسيق الموسيقى وفن الـ DJ. تخصصت في البداية في موسيقى الهاوس والإلكترونيك، ثم توسعت لأشمل أنماطًا متنوعة من الموسيقى العربية والعالمية.
            </p>
            
            <p className="text-xl leading-relaxed animate-fade-in" style={{
            animationDelay: "0.2s"
          }}>
              حصلت على تدريب احترافي في أفضل مدارس الـ DJ العالمية، وعملت مع نخبة من المنتجين الموسيقيين الذين أثروا أسلوبي وطوروا مهاراتي.
            </p>
            
            <p className="text-xl leading-relaxed animate-fade-in" style={{
            animationDelay: "0.4s"
          }}>
              أقدم حاليًا عروضي في أرقى النوادي والمناسبات في منطقة الخليج والشرق الأوسط، وأتميز بقدرتي على قراءة الجمهور وتلبية أذواقهم الموسيقية المختلفة.
            </p>
            
            <div className="pt-6 animate-fade-in" style={{
            animationDelay: "0.6s"
          }}>
              <h3 className="text-2xl font-bold text-flyboy-gold mb-4 glow-text">خبراتي تشمل:</h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li className="hover:text-flyboy-gold transition-colors cursor-default">حفلات الشاطئ وأمسيات البحر</li>
                <li className="hover:text-flyboy-gold transition-colors cursor-default">المهرجانات الموسيقية الكبرى</li>
                <li className="hover:text-flyboy-gold transition-colors cursor-default">النوادي الليلية والحفلات الخاصة</li>
                <li className="hover:text-flyboy-gold transition-colors cursor-default">المناسبات الشخصية والشركات</li>
                <li className="hover:text-flyboy-gold transition-colors cursor-default">تنسيق وإنتاج المقاطع الموسيقية</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default About;
