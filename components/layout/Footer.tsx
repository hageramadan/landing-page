// Footer.js
"use client";


import { MdEmail } from "react-icons/md";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { useCountry } from "@/contexts/CountryContext";

const Footer = () => {
  const { t } = useLanguage();
  const { whatsappNumber } = useCountry();

  const services = [
    t("servicesNames.mobileAppDev"),
    t("servicesNames.websiteDevSystems"),
    t("servicesNames.ecommerceHosting"),
    t("servicesNames.brandIdentity"),
    t("servicesNames.digitalGrowth"),
  ];

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

  const phoneNumbers = ["966549256726+", "201024848723+"];
  const emails = ["info@tawajood.com"];
 const addresses = t("addressesList");

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* العمود الأول - الشعار والوصف */}
          <div>
            <div className="w-[264px] h-[177px] mb-4">
              <Image
                src="/logo2.png"
                alt="Logo"
                loading="eager"
                width={280}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-sm md:text-[16px] leading-relaxed mb-4">
              {t("footer.description")}
            </p>
          </div>

          {/* العمود الثاني - الخدمات */}
          <div>
            <h4 className="font-bold text-[16px] md:text-lg mb-4 text-white">
              {t("footer.services")}
            </h4>
            <ul className="space-y-2 md:space-y-6">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    aria-label={`go to ${service.alt}`}
                    href="#services"
                    className="text-white text-sm md:text-[16px] font-medium"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث - المساعدة والروابط القانونية */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">
              {t("footer.help")}
            </h4>
            <ul className="space-y-2 md:space-y-6 mb-6">
              <li>
                <Link href="/privacy" className="text-white text-sm block">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <a href="#" className="text-white text-sm block">
                  {t("footer.terms")}
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الرابع - الفروع والمواقع */}
          <div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">
                {t("footer.followUs")}
              </h4>

              <div className="space-y-6">
                {/* أرقام الهاتف */}
                {phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex items-center gap-3 md:gap-4">
                    <BiSolidPhoneCall className="w-5 h-5 md:w-6 md:h-6 text-[#ffffff]" />
                    <p className="text-lg font-semibold" dir="rtl">{phone}</p>
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
                  {addresses.map((address:any, index:any) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 md:gap-4"
                    >
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
             
              <div className="flex  gap-4 md:gap-6">
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
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p className="text-white text-xs mt-2">
          {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;