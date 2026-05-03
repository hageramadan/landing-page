'use client';

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Check which section is in view
      const sections = ['about', 'services', 'projects', 'partners', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveLink(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active link
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { key: 'about', href: '#about', nameAr: 'عن تواجد', nameEn: 'About' },
    { key: 'services', href: '#services', nameAr: 'الخدمات', nameEn: 'Services' },
    { key: 'projects', href: '#projects', nameAr: 'المشاريع', nameEn: 'Projects' },
    { key: 'partners', href: '#partners', nameAr: 'الشركاء', nameEn: 'Partners' },
    { key: 'faq', href: '#faq', nameAr: 'الاسئلة', nameEn: 'FAQ' },
    { key: 'contact', href: '#contact', nameAr: 'تواصل معنا', nameEn: 'Contact Us' },
  ];

  const handleLinkClick = (linkKey: string) => {
    setActiveLink(linkKey);
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`sticky top-0 w-full z-20 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-2'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo - Right side with spinner */}
            <div className="cursor-pointer order-1">
              <div className="relative w-[80px] h-[50px] sm:w-[90px] sm:h-[55px] md:w-[104px] md:h-[64px]">
                {/* Spinner - Shows while image loading */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-[#4584C5] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Image with optimization */}
                <Image 
                  src="/images/logo/logo.png" 
                  alt="Tawajood Logo" 
                  width={200} 
                  height={120}
                  quality={90}
                  priority={true}
                  className={`w-full h-full object-contain transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Navigation Links - Center with Active Link Styling */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-4 order-2">
              <div className="flex items-center gap-4 xl:gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    onClick={() => handleLinkClick(link.key)}
                    className={`transition-colors font-medium text-sm xl:text-base whitespace-nowrap pb-1 ${
                      activeLink === link.key
                        ? 'text-black border-b-2 border-[#4584C5]'
                        : 'text-[#312E8199] hover:text-[#4584C5]'
                    }`}
                  >
                    {language === 'ar' ? link.nameAr : link.nameEn}
                  </a>
                ))}
              </div>
            </div>

            {/* Start Project Button - Left side */}
            <div className="order-3 hidden lg:flex items-center gap-4">
              <button 
                className="text-white px-4 py-1.5 md:px-5 md:py-2 rounded-lg transition text-sm xl:text-base whitespace-nowrap"
                style={{
                  background: 'linear-gradient(90deg, #4584C5 0%, #21405F 100%)',
                }}
              >
                {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden order-4">
              <button
                className="text-2xl text-gray-700 z-20 relative"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Modern Design with Active Link */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-[72px] left-4 right-4 bg-white shadow-2xl z-40 lg:hidden rounded-2xl overflow-hidden animate-slideDown">
            {/* Header with logo in mobile menu */}
            <div className="p-3 border-b border-gray-100 bg-gray-50">
              <div className="w-[60px] h-[40px] mx-auto relative">
                <Image 
                  src="/images/logo/logo.png" 
                  alt="Logo" 
                  width={120} 
                  height={80}
                  quality={85}
                  className='w-full h-full object-contain' 
                />
              </div>
            </div>
            
            {/* Navigation Links with Active Styling */}
            <div className="flex flex-col max-h-[60vh] overflow-y-auto">
              {navLinks.map((link, index) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => handleLinkClick(link.key)}
                  className={`transition py-3 px-4 text-center text-base font-medium ${
                    activeLink === link.key
                      ? 'text-black bg-blue-50 border-r-4 border-[#4584C5]'
                      : 'text-[#312E8199] hover:text-[#4584C5] hover:bg-gray-50'
                  } ${index !== navLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {language === 'ar' ? link.nameAr : link.nameEn}
                </a>
              ))}
            </div>
            
            {/* Button Section */}
            <div className="p-4 pt-2 border-t border-gray-100 bg-gray-50">
              <button className="w-full bg-[#4584C5] text-white px-4 py-2.5 rounded-xl hover:bg-[#21405F] transition text-sm font-medium">
                {language === 'ar' ? 'ابدأ مشروعك الآن' : 'Start Your Project Now'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;