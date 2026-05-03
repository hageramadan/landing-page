'use client';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
const Footer = () => {
  const { t, language } = useLanguage();
  
  const socialIcons = [
    { icon: FaFacebook, color: 'hover:text-blue-600' },
    { icon: FaTwitter, color: 'hover:text-sky-500' },
    { icon: FaInstagram, color: 'hover:text-pink-600' },
    { icon: FaLinkedin, color: 'hover:text-blue-700' },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo2.png"
              alt="Logo"      
              width={150}        
              height={50}             
              className="mb-4" />
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition">{t('footer.about')}</a></li>
              <li><a href="#services" className="hover:text-white transition">{t('footer.services')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('footer.pricing')}</a></li>
              <li><a href="#contact" className="hover:text-white transition">{t('footer.contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-white transition">{t('footer.cookie')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer.followUs')}</h4>
            <div className="flex space-x-4">
              {socialIcons.map((Social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3 }}
                  className={`text-gray-400 ${Social.color} transition text-2xl`}
                >
                  <Social.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {language === 'ar' ? 'علامتي التجارية' : 'BrandLogo'}. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;