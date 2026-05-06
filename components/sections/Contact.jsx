// ContactSection.js
"use client";

import { useCountry } from "@/contexts/CountryContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const { whatsappNumber } = useCountry();
  const { language, t } = useLanguage();

  // Data for ContactInfo component
  const social = [
    {
      id: 1,
      imageSrc: "/images/social/in.png",
      link: "https://www.linkedin.com/company/tawajood/posts/?feedView=all",
      alt: "LinkedIn",
      bgColor: "hover:bg-[#0077B5]",
    },
    {
      id: 2,
      imageSrc: "/images/social/insta.png",
      link: "https://www.instagram.com/tawajoodco?igsh=MWxna2xqazBvZzQyaw%3D%3D",
      alt: "Instagram",
      bgColor:
        "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]",
    },
    {
      id: 3,
      imageSrc: "/images/social/face.png",
      link: "https://www.facebook.com/tawajood?mibextid=LQQJ4d",
      alt: "Facebook",
      bgColor: "hover:bg-[#1877F2]",
    },
    {
      id: 4,
      imageSrc: "/images/social/whats.png",
      link: `https://wa.me/${whatsappNumber}`,
      alt: "WhatsApp",
      bgColor: "hover:bg-[#25D366]",
    },
    {
      id: 5,
      imageSrc: "/images/social/tiktok.png",
      link: "https://www.tiktok.com/@tawajood?_t=8n26pzQEDlV&_r=1",
      alt: "TikTok",
      bgColor: "hover:bg-[#000000]",
    },
  ];

  const phoneNumbers = ["+966549256726", "01024848723"];
  const emails = ["info@tawajood.com"];
 const addresses = t("addressesList");

  // Data for ContactForm component
  // في ContactSection.js - قم بتعديل countries بهذه الطريقة

const {  } = useLanguage();

const countries = [
  { 
    name: language === "ar" ? "السعودية" : "Saudi Arabia", 
    code: "+966", 
    flag: "🇸🇦", 
    placeholder: "512345678" 
  },
  { 
    name: language === "ar" ? "مصر" : "Egypt", 
    code: "+20", 
    flag: "🇪🇬", 
    placeholder: "1012345678" 
  },
  { 
    name: language === "ar" ? "اليمن" : "Yemen", 
    code: "+967", 
    flag: "🇾🇪", 
    placeholder: "712345678" 
  },
  { 
    name: language === "ar" ? "العراق" : "Iraq", 
    code: "+964", 
    flag: "🇮🇶", 
    placeholder: "7701234567" 
  },
  { 
    name: language === "ar" ? "الجزائر" : "Algeria", 
    code: "+213", 
    flag: "🇩🇿", 
    placeholder: "551234567" 
  },
];

  const handleFormSubmit = () => {
    // console.log("Form submitted from parent:", data);
    // هنا يمكنك إضافة منطق الإرسال الفعلي (API call)
  };

  return (
    <section id="contact" className="pt-3 md:pt-5 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center flex flex-col gap-3 mb-3">
          <h1 className=" text-xl md:text-3xl font-bold mb-2 md:mb-4 text-[#070D14]">
            {t("contactSection.title")}
          </h1>
          <p className="text-[#595689] text-[16px] md:text-[18px] mb-4 ">
            {t("contactSection.description")}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <ContactInfo 
            social={social}
            phoneNumbers={phoneNumbers}
            emails={emails}
            addresses={addresses}
          />
          
          <ContactForm 
            countries={countries}
            onSubmit={handleFormSubmit}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;