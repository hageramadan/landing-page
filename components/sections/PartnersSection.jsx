"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnersSection = () => {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesPerView, setImagesPerView] = useState(8);
  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const isRTL = language === "ar";

  // Partner images data with fallback array
  const partnersData = t("partners.images", { 
    returnObjects: true,
    defaultValue: []
  });

  // Ensure partners is always an array
  const partners = Array.isArray(partnersData) ? partnersData : [];

  // Default partners if translation returns empty
  const defaultPartners = [
    { id: 1, image: "/images/Partners/partner1.png", name: "Partner 1" },
    { id: 2, image: "/images/Partners/partner2.png", name: "Partner 2" },
    { id: 3, image: "/images/Partners/partner3.png", name: "Partner 3" },
    { id: 4, image: "/images/Partners/partner4.png", name: "Partner 4" },
    { id: 5, image: "/images/Partners/partner5.png", name: "Partner 5" },
    { id: 6, image: "/images/Partners/partner6.png", name: "Partner 6" },
    { id: 7, image: "/images/Partners/partner7.png", name: "Partner 7" },
    { id: 8, image: "/images/Partners/partner8.png", name: "Partner 8" },
    { id: 9, image: "/images/Partners/partner9.png", name: "Partner 9" },
    { id: 10, image: "/images/Partners/partner10.png", name: "Partner 10" },
  ];

  // Use default partners if translation returns empty
  const finalPartners = partners.length > 0 ? partners : defaultPartners;

  // حجم أصغر بكثير على الموبايل
  const imageWidth = isMobile ? 100 : 150;
  const gap = isMobile ? 12 : 24;
  const imageTotalWidth = imageWidth + gap;

  // Update images per view based on screen size
  useEffect(() => {
    setIsMounted(true);

    const updateImagesPerView = () => {
      const width = window.innerWidth;
      const isMobileDevice = width < 768;
      setIsMobile(isMobileDevice);
      
      if (width >= 1024) {
        setImagesPerView(8);
      } else if (width >= 640) {
        setImagesPerView(6);
      } else {
        setImagesPerView(4); // موبايل: 4 صور بدل 8
      }
    };

    updateImagesPerView();
    window.addEventListener("resize", updateImagesPerView);

    return () => {
      window.removeEventListener("resize", updateImagesPerView);
    };
  }, []);

  const maxIndex = Math.max(0, finalPartners.length - imagesPerView);

  // Auto-slide functionality - أبطأ قليلاً لحركة أنعم
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    
    autoPlayRef.current = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => {
          if (prevIndex >= maxIndex) {
            return 0;
          }
          return prevIndex + 1;
        });
      }
    }, 4000); // 4 ثواني بدل 3 لحركة أبطأ وأنعم
  }, [maxIndex, isDragging]);

  // Stop auto-slide
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Start auto-slide when component mounts and dependencies change
  useEffect(() => {
    if (isMounted && finalPartners.length > 0) {
      startAutoPlay();
    }
    
    return () => {
      stopAutoPlay();
    };
  }, [isMounted, finalPartners.length, startAutoPlay, stopAutoPlay]);

  // Reset currentIndex when imagesPerView changes
  useEffect(() => {
    if (isMounted && currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [imagesPerView, maxIndex, currentIndex, isMounted]);

  const handleNext = useCallback(() => {
    stopAutoPlay();
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    startAutoPlay();
  }, [currentIndex, maxIndex, stopAutoPlay, startAutoPlay]);

  const handlePrev = useCallback(() => {
    stopAutoPlay();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(maxIndex);
    }
    startAutoPlay();
  }, [currentIndex, maxIndex, stopAutoPlay, startAutoPlay]);

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    stopAutoPlay();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchEnd) {
      startAutoPlay();
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isRTL) {
      if (isLeftSwipe) {
        handlePrev();
      }
      if (isRightSwipe) {
        handleNext();
      }
    } else {
      if (isLeftSwipe) {
        handleNext();
      }
      if (isRightSwipe) {
        handlePrev();
      }
    }
    
    setTouchStart(0);
    setTouchEnd(0);
    startAutoPlay();
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e) => {
    setIsDragging(true);
    stopAutoPlay();
    setTouchStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      startAutoPlay();
      return;
    }
    
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      startAutoPlay();
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isRTL) {
      if (isLeftSwipe) {
        handlePrev();
      }
      if (isRightSwipe) {
        handleNext();
      }
    } else {
      if (isLeftSwipe) {
        handleNext();
      }
      if (isRightSwipe) {
        handlePrev();
      }
    }
    
    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
    startAutoPlay();
  };

  // Calculate translateX based on language
  const getTranslateX = () => {
    const translateValue = currentIndex * imageTotalWidth;
    return isRTL ? translateValue : -translateValue;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div id="partners" className="pt-2 overflow-hidden">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mx-auto mb-6"
        >
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-[#070D14]">
            {t("partners.title") || "شركاء النجاح حول العالم"}
          </h1>
          <p className="text-[#585858] text-xs md:text-lg px-4 mx-auto">
            {t("partners.description") || "نحن شركاء في رحلة التحول الرقمي لنخبة من العلامات التجارية التي اختارت تواجد لتوسيع نطاق أعمالها دولياً."}
          </p>
        </motion.div>

        {/* Slider Section */}
        <div className="relative">
          {/* Slider Container */}
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={sliderRef}
          >
            <motion.div
              className="flex gap-6 py-4"
              animate={{
                x: getTranslateX(),
              }}
              transition={{
                type: "tween", // changed from "linear" to "tween" for smoother animation
                ease: [0.25, 0.1, 0.25, 1], // custom cubic bezier for very smooth motion
                duration: 0.8, // أبطأ لحركة أنعم
              }}
              style={{
                width: `${finalPartners.length * imageTotalWidth}px`,
              }}
            >
              {/* Duplicate images for infinite loop effect */}
              {[...finalPartners, ...finalPartners].map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (index % finalPartners.length) * 0.03 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0"
                  style={{ width: `${imageWidth}px` }}
                >
                  <div className="transition-all duration-300 p-2 md:p-4 flex items-center justify-center group">
                    <div className={`relative ${isMobile ? 'w-[100px] h-[100px]' : 'w-[150px] h-[150px]'}`}>
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        sizes="100px"
                        className="object-contain p-1 md:p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;