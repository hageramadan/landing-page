'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { LuMessageCircle } from "react-icons/lu";
const FloatingWhatsAppSimple = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('966549256726'); // Default Saudi
  const [countryDetected, setCountryDetected] = useState<boolean>(false);
  const { language } = useLanguage();

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Try multiple methods for better accuracy
        
        // Method 1: Using IP API (most accurate)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code === 'EG') {
          setPhoneNumber('201024848723');
          console.log('Country detected: Egypt - Using number: 201024848723');
        } else if (data.country_code === 'SA') {
          setPhoneNumber('966549256726');
          console.log('Country detected: Saudi Arabia - Using number: 966549256726');
        } else {
          // If not Egypt or Saudi, default to Saudi
          setPhoneNumber('966549256726');
          console.log('Country not detected - Using default Saudi number');
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
            setPhoneNumber('201024848723');
            console.log('Timezone detected: Egypt - Using number: 201024848723');
          } 
          // Check for Saudi Arabia
          else if (timezone?.includes('Riyadh') || 
                   timezone?.includes('Saudi') || 
                   browserLang?.includes('sa') ||
                   browserLang?.includes('SA')) {
            setPhoneNumber('966549256726');
            console.log('Timezone detected: Saudi Arabia - Using number: 966549256726');
          }
          // Default to Saudi
          else {
            setPhoneNumber('966549256726');
            console.log('Default: Saudi Arabia - Using number: 966549256726');
          }
        } catch (fallbackError) {
          // Ultimate fallback - Saudi number
          setPhoneNumber('966549256726');
          console.log('Fallback: Using default Saudi number');
        }
        setCountryDetected(true);
      }
    };

    detectCountry();
  }, []);

  const handleWhatsAppClick = () => {
    // Clean phone number (remove any non-digit characters except +)
    const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');
    
    const message = language === 'ar' 
      ? 'السلام عليكم، أود الحصول على استشارة مجانية'
      : 'Hello, I would like to get a free consultation';
    
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-12 end-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg group"
        style={{
    background: '#25D366',
    boxShadow: '0 4px 20px #25D3664D'
  }}
      whileHover={{  background: '#20B859',
    boxShadow: '0 6px 25px #25D36666' }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-white font-medium text-sm ">
        {language === 'ar' ? 'استشارة مجانية' : 'Free Consultation'}
      </span>
      <LuMessageCircle className="text-white text-xl" />

    </motion.button>
  );
};

export default FloatingWhatsAppSimple;