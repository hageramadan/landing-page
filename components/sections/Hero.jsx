'use client';

import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountry } from '@/contexts/CountryContext';
import Image from 'next/image';

const Hero = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry(); // استخدام رقم الواتساب من السياق

  // Translations
  const translations = {
    ar: {
      badge: 'التحول الرقمي في السعودية',
      title: 'نطور أهدافك.. بلغة يفهمها واقع التحول الرقمي السعودي    ',
      description: 'حول فكرتك إلى مشروع رقمي ناجح مع تواجد. صممنا أكثر من 100 مشروع في 10 دول مختلفة (تطبيقات للمطاعم، لعيادات التجميل، عقارات، متاجر ذبائح، تاكسي، تأجير سيارات، مزادات، رياضية، وغيرها من المجالات المختلفة)',
      cta: 'استشارة مجانية',
      demo: 'شاهد أعمالنا',
      stats1: 'مشروع منجز',
      stats2: 'دول مختلفة',
      stats3: 'عميل سعيد'
    },
    en: {
      badge: 'Digital Transformation in Saudi',
      title: 'We develop your goals.. in a language that Saudi digital transformation reality understands',
      description: 'Turn your idea into a successful digital project with Tawajood. We have designed more than 100 projects in 10 different countries (Restaurant apps, beauty clinics, real estate, meat stores, taxi, car rental, auctions, sports, and various other fields)',
      cta: 'Free Consultation',
      demo: 'View Our Work',
      stats1: 'Projects Completed',
      stats2: 'Different Countries',
      stats3: 'Happy Clients'
    }
  };

  const t = translations[language];

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const message = language === 'ar' 
      ? "السلام عليكم، أود الحصول على استشارة مجانية لمشروعي الرقمي"
      : "Hello, I would like to get a free consultation for my digital project";
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section 
      id="about" 
      className="relative max-h-[730px] flex items-center overflow-hidden"
    
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/bg.avif"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          style={{
            boxShadow: '0px 20px 40px #00000040',
          }}
          priority
          quality={100}
        />
        {/* Dark Overlay for better text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content Container with Glassmorphism Effect */}
          <motion.div
            initial={{ opacity: 0, x: language === 'ar' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            {/* Glass Card with Border and Blur */}
            <div 
              className="p-6 md:p-8 lg:p-10 rounded-2xl backdrop-blur-md"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
             
              {/* Main Title - White Text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl lg:text-[46px] font-bold mb-6 leading-tight text-white"
              >
                {t.title}
              </motion.h1>
              
              {/* Description - White Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[12px] md:text-[20px] text-white/90 mb-8 leading-relaxed"
              >
                {t.description}
              </motion.p>
              
              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(90deg, #4584C5 0%, #21405F 100%)',
                    boxShadow: '0px 4px 15px #00000040',
                    minWidth: '200px'
                  }}
                >
                  {t.cta}
                  <FaArrowRight className={`inline ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </button>
                
                {/* يمكنك إضافة زر "شاهد أعمالنا" هنا إذا أردت */}
                {/* <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105 border border-white/30 hover:bg-white/10">
                  {t.demo}
                  <FaPlay className="inline ml-2" />
                </button> */}
                
              </motion.div>
            </div>
          </motion.div>

          {/* Empty div to maintain spacing */}
          <div className="w-full lg:w-1/2 hidden lg:block"></div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;