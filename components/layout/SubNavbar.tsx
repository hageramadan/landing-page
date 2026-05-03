'use client';
import { FaFacebook , FaLinkedinIn , FaInstagram , FaTiktok  } from "react-icons/fa";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageDropdown from '@/components/LanguageDropdown';
import { MdOutlineEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import Link from "next/link";
import { useState, useEffect } from "react";

const SubNavbar = () => {
  const { language } = useLanguage();
  const [whatsappNumber, setWhatsappNumber] = useState<string>("201024848723"); // Default Egypt
  const [countryDetected, setCountryDetected] = useState<boolean>(false);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Method 1: Using IP API (most accurate)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
      
        if (data.country_code === 'EG') {
          setWhatsappNumber("201024848723");
          console.log('Egypt detected - WhatsApp: 201024848723');
        } else if (data.country_code === 'SA') {
          setWhatsappNumber("966549256726");
          console.log('Saudi Arabia detected - WhatsApp: 966549256726');
        } else {
          // Default to Saudi if country not detected
          setWhatsappNumber("966549256726");
          console.log('Default - WhatsApp: 966549256726');
        }
        setCountryDetected(true);
      } catch (error) {
        // Method 2: Fallback to timezone detection
        console.log('IP detection failed, using timezone fallback');
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const browserLang = navigator.language;
          
          // Check for Egypt
          if (timezone?.includes('Cairo') || 
              timezone?.includes('Egypt') || 
              browserLang?.includes('eg') ||
              browserLang?.includes('EG')) {
            setWhatsappNumber("201024848723");
            console.log('Egypt detected (timezone) - WhatsApp: 201024848723');
          } 
          // Check for Saudi Arabia
          else if (timezone?.includes('Riyadh') || 
                   timezone?.includes('Saudi') || 
                   browserLang?.includes('sa') ||
                   browserLang?.includes('SA')) {
            setWhatsappNumber("966549256726");
            console.log('Saudi detected (timezone) - WhatsApp: 966549256726');
          }
          // Default to Saudi
          else {
            setWhatsappNumber("966549256726");
            console.log('Default - WhatsApp: 966549256726');
          }
        } catch (fallbackError) {
          // Ultimate fallback - Saudi number
          setWhatsappNumber("966549256726");
          console.log('Fallback - WhatsApp: 966549256726');
        }
        setCountryDetected(true);
      }
    };

    detectCountry();
  }, []);

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
            <a
              href="mailto:info@tawajood.com"
              className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
              dir="ltr"
            >
              <span className="text-[16px] ">info@tawajood.com</span>
              <MdOutlineEmail className="text-sm md:w-6 md:h-6" />
            </a>
          </div>

          {/* Right Side - Language Dropdown */}
          <div className="flex items-center gap-6">
            {/* Social Links */}
            <div className="hidden md:flex items-center gap-3">
              <p className='text-[#FEFEFE] text-[14px] whitespace-nowrap'>
                {language === 'ar' ? 'تواصل معنا :' : 'Contact us :'}
              </p>
              <Link href="https://www.facebook.com/tawajood?mibextid=LQQJ4d" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaFacebook className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link href="https://www.linkedin.com/company/tawajood/posts/?feedView=all" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaLinkedinIn className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link href="https://www.instagram.com/tawajoodco?igsh=MWxna2xqazBvZzQyaw%3D%3D" target="_blank" className="text-white hover:text-blue-200 transition-colors">
                <FaInstagram className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              {/* WhatsApp Link with Dynamic Number */}
              <Link 
                href={`https://wa.me/${whatsappNumber}`} 
                target="_blank" 
                className="text-white hover:text-green-400 transition-colors"
              >
                <IoLogoWhatsapp className="text-white hover:text-blue-200 w-4 h-4"/>
              </Link>
              <Link href="https://www.tiktok.com/@tawajood?_t=8n26pzQEDlV&_r=1" target="_blank" className="text-white hover:text-blue-200 transition-colors">
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