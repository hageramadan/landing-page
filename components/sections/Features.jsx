"use client";

import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountry } from "@/contexts/CountryContext";
import Card from "../ui/Card";
import { BiSolidCheckShield } from "react-icons/bi";
import { FaLaptopCode } from "react-icons/fa6";
import { FaArrowRight } from 'react-icons/fa';
import { RiLoopRightLine } from "react-icons/ri";
const Features = () => {
  const { t } = useLanguage();
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry();

  const icons = [BiSolidCheckShield, FaRocket, FaLaptopCode, RiLoopRightLine];
  const colors = [
    "text-[#66BB6A]",
    "text-[#9333EA]",
    "text-[#FF5AD0]",
    "text-[#1D83D4]",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleWhatsAppClick = () => {
    const cleanNumber = whatsappNumber.replace(/[^\d+]/g, "");
    const message =
      t("features.consultation.message") ||
      (language === "ar"
        ? "السلام عليكم، أود الحصول على استشارة تقنية مجانية لمشروعي"
        : "Hello, I would like to get a free technical consultation for my project");

    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="about" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-xl text-[#070D14] md:text-3xl font-bold mb-3 md:mb-4">
            {t("features.title")}
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          // تغيير الكلاس هنا: شبكة بعمودين على جميع الشاشات
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-3 md:mb-10"
        >
          {t("features.items").map((feature, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center p-1 md:p-2">
                  {/* Icon Container - تصغير الحجم */}
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#ECF6FF] flex items-center justify-center mx-auto mb-2 md:mb-4">
                    <Icon className={`text-xl md:text-3xl w-5 h-5 md:w-8 md:h-8 ${color}`} />
                  </div>
                  {/* تصغير حجم النص للموبايل */}
                  <h2 className="text-sm md:text-xl whitespace-nowrap font-bold mb-1 md:mb-2 ">{feature.title}</h2>
                  <p className="text-[#585858] text-xs md:text-[16px] line-clamp-none">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* قسم الاستشارة المجانية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mt-5"
        >
          <motion.button
            onClick={handleWhatsAppClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 10,
              delay: 0
            }}
            className="flex items-center group bg-gradient-to-r from-[#4584C5] to-[#21405F] hover:from-[#1E75AB]
             hover:to-[#1E75AB] justify-center gap-2 px-4 py-2 md:px-8 md:py-3 rounded-lg text-white
              font-semibold mx-auto group text-sm md:text-base"
            style={{
              // background: "linear-gradient(90deg, #4584C5 0%, #21405F 100%)",
              boxShadow: "0px 4px 15px #00000040",
              minWidth: "220px",
            }}
          >
            <span>
              {t("features.consultation.button") || "احصل على استشارة مجانية"}
            </span>
            <motion.div>
              <FaArrowRight className={`inline group-hover:-rotate-45 ${language === 'ar' ? 'rotate-180' : ''} text-sm md:text-base`} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;