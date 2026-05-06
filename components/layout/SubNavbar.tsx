'use client';
import { FaFacebook , FaLinkedinIn , FaInstagram , FaTiktok  } from "react-icons/fa";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageDropdown from '@/components/LanguageDropdown';
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { useCountry } from '@/contexts/CountryContext';

const SubNavbar = () => {
  const { language } = useLanguage();
  const { whatsappNumber } = useCountry(); // استخدام الرقم من الـ Context

  return (
    <div
      className="w-full z-30 relative"
      style={{
        background: 'linear-gradient(90deg, #21405F 0%, #4584C5 100%)',
        height: '56px',
      }}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left Side - Contact Info */}
          <div className="flex items-center gap-6">
            <Link
            aria-label="go to email"
              href="mailto:info@tawajood.com"
              className="flex items-center cursor-pointer gap-2 text-white hover:text-blue-200 transition-colors"
              dir="ltr"
            >
              <span className="text-[16px] ">info@tawajood.com</span>
              <MdOutlineEmail className="text-sm md:w-6 md:h-6" />
            </Link>
          </div>

          {/* Right Side - Language Dropdown */}
          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-3">
              <p className='text-[#FEFEFE] text-[14px] whitespace-nowrap'>
                {language === 'ar' ? 'تواصل معنا :' : 'Contact us :'}
              </p>
              <Link aria-label="go to facebook" href="https://www.facebook.com/tawajood?mibextid=LQQJ4d" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaFacebook className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link aria-label="go to linkedin" href="https://www.linkedin.com/company/tawajood/posts/?feedView=all" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaLinkedinIn className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link aria-label="go to instagram" href="https://www.instagram.com/tawajoodco?igsh=MWxna2xqazBvZzQyaw%3D%3D" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaInstagram className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              {/* WhatsApp Link with Dynamic Number */}
              <Link 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                aria-label="go to whatsapp"
                className="text-white hover:text-green-400 transition-colors"
              >
                <IoLogoWhatsapp className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link aria-label="go to tiktok" href="https://www.tiktok.com/@tawajood?_t=8n26pzQEDlV&_r=1" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaTiktok className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
            </div>
            {/* Vertical Divider Line */}
            <div className="hidden md:block h-5 w-px bg-white/30"></div>
            {/* Language Dropdown */}
            <LanguageDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNavbar;