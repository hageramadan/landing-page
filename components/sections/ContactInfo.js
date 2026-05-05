// ContactInfo.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactInfo = ({ social, phoneNumbers, emails, addresses }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex-1 relative h-[677px] rounded-3xl max-w-[519px] overflow-hidden"
    >
      {/* الخلفية السوداء مع الصورة */}
      <div className="absolute inset-0 bg-[#011C2B] z-10"></div>
      <div dir="rtl" className="absolute z-10 w-[297px] h-[297px] start-0 bottom-0">
        <Image
          src="/images/contact/contact-bg.png"
          alt="Contact Background"
          fill
          sizes="297px"
          className="object-contain top-[25%] start-[-25%]"
          style={{ top: "25%", right: "-25%" }}
        />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 p-6 md:p-8 lg:p-10 text-white h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
            {t("contactInfo.title")}
          </h3>
          <p className="text-[16px] text-[#C9C9C9] mb-1">
            {t("contactInfo.subtitle")}
          </p>
          <div className="space-y-6">
            <div className="p-4"></div>

            {/* أرقام الهاتف */}
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex items-center gap-3 md:gap-4">
                <BiSolidPhoneCall className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
                <p className="text-lg font-semibold">{phone}</p>
              </div>
            ))}

            {/* الإيميلات */}
            {emails.map((email, index) => (
              <div key={index} className="flex items-start gap-3 md:gap-4">
                <MdEmail className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
                <p className="text-base font-medium dir-ltr">{email}</p>
              </div>
            ))}

            {/* العناوين */}
            <div className="space-y-3 text-sm">
              {addresses.map((address, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <FaLocationDot className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
                  <p className="text-white leading-relaxed text-[16px]">
                    {address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* صور السوشيال ميديا */}
        <div className="mt-8 pt-4">
          <div className="flex justify-end gap-4 md:gap-6">
            {social.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;