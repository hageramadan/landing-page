"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import { RxLink1 } from "react-icons/rx";

const IndustrySolutions = () => {
  const { language, t } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const isRTL = language === "ar";

  // Get slides from translation
  const slides = t("industrySolutions.slides", {
    returnObjects: true,
    defaultValue: [
      {
        id: 1,
        image: "/images/Industry/mobile-app.png",
        imagesApp: ["/images/Industry/google.png", "/images/Industry/app.png"],
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
    ]
  });

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber?.replace(/[^\d+]/g, "") || "";
    const message = t("industrySolutions.whatsappMessage") ||
      (language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project");

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isRTL) {
      // In RTL mode (Arabic)
      if (isLeftSwipe) {
        handlePrev(); // Swipe left goes to previous
      }
      if (isRightSwipe) {
        handleNext(); // Swipe right goes to next
      }
    } else {
      // In LTR mode (English)
      if (isLeftSwipe) {
        handleNext(); // Swipe left goes to next
      }
      if (isRightSwipe) {
        handlePrev(); // Swipe right goes to previous
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Animation variants for moving image
  const imageVariants = {
    initial: { x: isRTL ? 200 : -200, opacity: 0, rotate: -5 },
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      x: isRTL ? -200 : 200,
      opacity: 0,
      rotate: 5,
      transition: { duration: 0.4 },
    },
  };

  const contentVariants = {
    initial: { x: isRTL ? -100 : 100, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
    exit: {
      x: isRTL ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="projects" className="bg-white pt-3 md:pt-5 overflow-hidden">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        {/* العنوان والوصف */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mx-auto mb-12 md:mb-16"
        >
          <h1 className="text-xl text-[#070D14] md:text-3xl font-bold mb-3 md:mb-4">
            {t("industrySolutions.title") || "حلول برمجية تناسب مختلف الصناعات"}
          </h1>
          <p className="text-[#585858] text-sm md:text-lg">
            {t("industrySolutions.description") || "استكشف سابقة أعمالنا في صناعات مثل العقارات، المطاعم، عيادات التجميل، المتاجر الالكترونية، والمزيد."}
          </p>
        </motion.div>

        {/* السلايدر */}
        <div className="relative mx-auto">
          {/* الأسهم - Hidden on mobile, visible on desktop */}
          {slides.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className={`hidden md:flex absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200`}
                aria-label={t("common.previous") || "السابق"}
              >
                <FaChevronLeft  className={`w-5 h-5 md:w-6 md:h-6 text-[#4584C5] ${language === 'ar' ? 'rotate-180' : 'rotate-180'}`} />
              </button>

              <button
                onClick={handleNext}
                className={`hidden md:flex absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200`}
                aria-label={t("common.next") || "التالي"}
              >
                <FaChevronRight className={`w-5 h-5 md:w-6 md:h-6 text-[#4584C5] ${language === 'ar' ? 'rotate-180' : 'rotate-180'}`}  />
              </button>
            </>
          )}

          {/* الكروت */}
          <div
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Side by side layout on mobile */}
                <div className="flex flex-row md:flex-row">
                  {/* Moving Image Section - 40% width on mobile */}
                  <motion.div
                    className="w-2/5 md:w-1/2 relative h-[200px] md:h-[346px] overflow-hidden"
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      fill
                      sizes="346px"
                      className="object-contain"
                    />
                  </motion.div>

                  {/* Content Section - 60% width on mobile */}
                  <motion.div
                    className="w-3/5 md:w-1/2 p-3 md:p-8 flex flex-col justify-center"
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h2 className="text-[7px] md:text-[14px] w-fit px-2 md:px-4 py-1 md:py-2 rounded font-semibold mb-1 md:mb-2 bg-[#79C5F2] text-white truncate">
                      {slides[currentIndex].title}
                    </h2>
                    <p className="font-bold text-[#191C1F] text-[12px] md:text-[20px] my-1 md:my-4">
                      {slides[currentIndex].subtitle}
                    </p>
                    <p className="text-[#545454] text-[10px] md:text-sm leading-relaxed mb-2 md:mb-6 line-clamp-3 md:line-clamp-none">
                      {slides[currentIndex].description}
                    </p>

                    <div className="flex flex-col gap-2 md:gap-4">
                      <div className="flex flex-col gap-2 md:gap-4">
                        {slides[currentIndex].hasPreview && (
                          <button
                            className="text-[#4584C5] border border-[#4584C5] 
                          w-fit py-1 md:py-2 px-3 md:px-6 rounded font-bold text-[8px]
                           md:text-[16px] flex items-center gap-3 transition-all duration-300"
                          >
                            <span>{slides[currentIndex].previewText}</span>
                            <RxLink1 className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        )}

                        {/* App Store Images - Visible below buttons on mobile */}
                        {slides[currentIndex].imagesApp &&
                          slides[currentIndex].imagesApp.length > 0 && (
                            <div className="flex gap-2 md:gap-3 mt-1 md:mt-4">
                              {slides[currentIndex].imagesApp.map(
                                (appImage, idx) => (
                                  <div
                                    key={idx}
                                    className="relative rounded p-0.5 md:p-1 w-[60px] md:w-[138px] h-[20px] md:h-[46px]"
                                  >
                                    <Image
                                      src={appImage}
                                      alt={`App store ${idx + 1}`}
                                      fill
                                      sizes="138px"
                                      className="object-fit"
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          )}

                        <button
                          onClick={handleWhatsAppClick}
                          className=" mt-3 w-fit 
                           group bg-gradient-to-r from-[#4584C5] to-[#21405F] hover:from-[#1E75AB] hover:to-[#1E75AB]
                            text-white px-2 md:px-5 py-1 md:py-2.5 
                            rounded-lg font-semibold text-[8px]
                             md:text-[16px] hover:shadow-lg transition-all duration-300 flex items-center gap-1 md:gap-2 group"
                        >
                          <span className="whitespace-nowrap">
                            {slides[currentIndex].buttonText}
                          </span>
                          <FaArrowRight
                            className={`text-[8px] md:text-sm ${language === "ar" ? "rotate-180" : ""} group-hover:-rotate-45 transition-transform`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

      
        </div>
      </div>
    </section>
  );
};

export default IndustrySolutions;