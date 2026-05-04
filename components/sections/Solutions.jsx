"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";

const SolutionsSection = () => {
  const { language, t } = useLanguage();
  const { whatsappNumber } = useCountry();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const cardWidth = 280;
  const gap = 24;
  const cardTotalWidth = cardWidth + gap;

  const isRTL = language === "ar";

  // جلب الكروت من ملف الترجمة
  const cards = t("solutions.cards", { 
    returnObjects: true,
    defaultValue: [
      {
        id: 1,
        image: "/images/Solutions/s1.png",
        title: "برمجة وتطوير تطبيقات الجوال",
        description: "نصمم ونطور تطبيقات ذكية وسهلة الاستخدام تضمن لعملائك تجربة فريدة، مع برمجة قوية تتحمل آلاف المستخدمين في وقت واحد.",
        linkText: "ابدأ برمجة تطبيقك الآن",
      },
      {
        id: 2,
        image: "/images/Solutions/s2.png",
        title: "تصميم وتطوير المواقع الإلكترونية والأنظمة",
        description: "نبني مواقع وأنظمة برمجية متطورة تتناسب مع حجم أعمالك، مع لوحات تحكم احترافية تمكنك من إدارة مشروعك بكل سلاسة.",
        linkText: "اطلب نظامك الخاص",
      },
      {
        id: 3,
        image: "/images/Solutions/s3.png",
        title: "إنشاء المتاجر الإلكترونية وحلول الاستضافة",
        description: "حلول متكاملة لإطلاق متجرك الإلكتروني، تشمل التصميم والبرمجة مع استضافة سريعة وآمنة تضمن بقاء مشروعك أونلاين.",
        linkText: "أطلق متجرك الإلكتروني",
      },
      {
        id: 4,
        image: "/images/Solutions/s4.png",
        title: "بناء الهوية البصرية وتجربة المستخدم",
        description: "نبتكر هوية بصرية تعكس احترافية شركتك، مع تصميم واجهات عصرية تركز على سلوك المستخدم وتسهل رحلة الشراء.",
        linkText: "صمم هوية مشروعك",
      },
      {
        id: 5,
        image: "/images/Solutions/s5.png",
        title: "حلول النمو والتسويق الرقمي",
        description: "لا نكتفي بالبرمجة فقط، بل نساعدك في الوصول لجمهورك المستهدف من خلال حملات إعلانية ذكية (Google & Meta) وخطط نمو تضمن لك أعلى عائد على الاستثمار",
        linkText: "ابدأ الانتشار الرقمي",
      },
      {
        id: 6,
        image: "/images/Solutions/s6.png",
        title: "عام كامل من الدعم الفني",
        description: "علاقتنا بك لا تنتهي بتسليم التطبيق. نؤمن لك دعمًا فنيًا متكاملاً لمدة سنة كاملة، لضمان استمرارية تميزك في السوق دون أي عوائق تقنية.",
        linkText: "ابدأ مشروعك برعاية تقنية كاملة",
      },
    ]
  });

  // دالة فتح الواتساب
  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber?.replace(/[^\d+]/g, "") || "";
    const message = t("solutions.whatsappMessage") ||
      (language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project");

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // تحديث عدد الكروت الظاهرة حسب حجم الشاشة
  useEffect(() => {
    setIsMounted(true);

    const updateCardsPerView = () => {
      const newCardsPerView = window.innerWidth >= 1024 ? 4 : 1;
      setCardsPerView(newCardsPerView);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);

  const maxIndex = Math.max(0, cards.length - cardsPerView);

  // إعادة ضبط currentIndex عند تغيير cardsPerView
  useEffect(() => {
    if (isMounted && currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex, isMounted]);

  const handleNext = useCallback(() => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // حساب الـ translateX حسب اللغة
  const getTranslateX = () => {
    const translateValue = currentIndex * cardTotalWidth;
    return isRTL ? translateValue : -translateValue;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section className="bg-white py-6 overflow-hidden">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            {t("solutions.title") || "حلول تقنية متكاملة، مصممة لنمو أعمالك"}
          </h2>
          <p className="text-[#585858] text-base md:text-lg">
            {t("solutions.description") || "من الفكرة إلى الإطلاق، نقدم لك باقة شاملة من الخدمات البرمجية والتسويقية التي تضمن استقرار مشروعك وانتشارك في السوق الرقمي."}
          </p>
        </motion.div>

        <div className="relative">
          {/* السهم الأيمن (التالي) */}
          {maxIndex > 0 && (
            <button
              onClick={handleNext}
              className={`absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200 ${
                currentIndex >= maxIndex && "opacity-50 cursor-not-allowed"
              }`}
              aria-label={t("solutions.next") || "التالي"}
              disabled={currentIndex >= maxIndex}
            >
              <FaChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#4584C5]" />
            </button>
          )}

          {/* السهم الأيسر (السابق) */}
          {maxIndex > 0 && (
            <button
              onClick={handlePrev}
              className={`absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 bg-white shadow-xl rounded-full p-3 hover:bg-gray-50 transition-all duration-300 border border-gray-200 ${
                currentIndex === 0 && "opacity-50 cursor-not-allowed"
              }`}
              aria-label={t("solutions.prev") || "السابق"}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#4584C5]" />
            </button>
          )}

          {/* الحاوية الرئيسية للكروت */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 pb-6 px-8"
              animate={{
                x: getTranslateX(),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{
                width: `${cards.length * cardTotalWidth}px`,
              }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 pt-10"
                  style={{ width: `${cardWidth}px` }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className="bg-white rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col relative"
                    style={{ height: "340px" }}
                  >
                    <div className="absolute -top-[37px] left-1/2 transform -translate-x-1/2 z-10">
                      <div style={{ width: "74px", height: "74px" }}>
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src={card.image}
                            alt={card.title}
                            width={74}
                            height={74}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 text-center flex-1 flex flex-col mt-9">
                      <h3 className="text-base md:text-[20px] font-bold mb-3 text-gray-800 line-clamp-2 min-h-[56px]">
                        {card.title}
                      </h3>
                      <p className="text-[#585858] text-xs md:text-[16px] leading-relaxed mb-5 line-clamp-4 min-h-[96px]">
                        {card.description}
                      </p>
                      <button
                        onClick={handleWhatsAppClick}
                        className={`inline-flex items-center justify-center gap-2 text-[#4584C5] font-bold text-sm md:text-[16px] transition-all duration-300 group mt-auto ${
                          hoveredCard === card.id ? "gap-3" : "gap-2"
                        }`}
                      >
                        <span>{card.linkText}</span>
                        <FaArrowRight
                          className={`inline ${language === "ar" ? "rotate-180" : ""} text-sm md:text-base`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;