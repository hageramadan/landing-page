"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";

const IndustrySolutions = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isRTL = language === "ar";

  const slides = [
    {
      id: 1,
      image: "/images/Industry/mobile-app.png",
      title: "برمجة وتطوير تطبيقات الجوال (iOS & Android)",
      subtitle: "برمجة وتطوير تطبيقات الجوال",
      description:
        "نصمم ونطور تطبيقات ذكية وسهلة الاستخدام تضمن لعملائك تجربة فريدة، مع برمجة قوية تتحمل آلاف المستخدمين في وقت واحد.",
      buttonText: "ابدأ استشارتك المجانية الآن",
      previewText: "معاينة",
      hasPreview: false,
    },
    {
      id: 2,
      image: "/images/Industry/web-dev.png",
      title: "برمجة وتطوير المواقع الإلكترونية",
      subtitle: "برمجة وتطوير تطبيقات الجوال",
      description:
        "نصمم ونطور تطبيقات ذكية وسهلة الاستخدام تضمن لعملائك تجربة فريدة، مع برمجة قوية تتحمل آلاف المستخدمين في وقت واحد.",
      buttonText: "ابدأ استشارتك المجانية الآن",
      previewText: "معاينة",
      hasPreview: true,
    },
    
   
  ];

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber?.replace(/[^\d+]/g, "") || "";
    const message =
      language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project";

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* العنوان والوصف */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center  mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            حلول برمجية تناسب مختلف الصناعات
          </h2>
          <p className="text-[#585858] text-base md:text-lg">
            استكشف سابقة أعمالنا في صناعات مثل العقارات، المطاعم، عيادات التجميل،
            المتاجر الالكترونية، والمزيد.
          </p>
        </motion.div>

        {/* السلايدر */}
        <div className="relative max-w-5xl mx-auto">
          {/* الأسهم */}
          {/* {slides.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`absolute ${
                  isRTL ? "left-0 md:-left-16" : "right-0 md:-right-16"
                } top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200 ${
                  currentIndex === 0 && "opacity-50 cursor-not-allowed"
                }`}
                aria-label="السابق"
                disabled={currentIndex === 0}
              >
                                 <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#4584C5]" />

              </button>

              <button
                onClick={handleNext}
                className={`absolute ${
                  isRTL ? "right-0 md:-right-16" : "left-0 md:-left-16"
                } top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200 ${
                  currentIndex === slides.length - 1 && "opacity-50 cursor-not-allowed"
                }`}
                aria-label="التالي"
                disabled={currentIndex === slides.length - 1}
              >
                                 <FaChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#4584C5]" />

              </button>
            </>
          )} */}

          {/* الكروت */}
          {/* <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: isRTL ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? -100 : 100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                  </div>

               
                  <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                      {slides[currentIndex].title}
                    </h3>
                    <p className="text-[#4584C5] font-medium mb-4">
                      {slides[currentIndex].subtitle}
                    </p>
                    <p className="text-[#585858] text-sm md:text-base leading-relaxed mb-6">
                      {slides[currentIndex].description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                    
                      {slides[currentIndex].hasPreview && (
                        <button className="text-[#4584C5] font-semibold text-sm md:text-base flex items-center gap-1 hover:gap-2 transition-all duration-300 group">
                          <span>{slides[currentIndex].previewText}</span>
                          <FaArrowRight
                            className={`text-sm ${language === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`}
                          />
                        </button>
                      )}
                      
                 
                      <button
                        onClick={handleWhatsAppClick}
                        className="bg-gradient-to-r from-[#4584C5] to-[#21405F] text-white px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                      >
                        <span>{slides[currentIndex].buttonText}</span>
                        <FaArrowRight
                          className={`text-sm ${language === "ar" ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div> */}

        
       
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;