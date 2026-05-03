'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-4 -right-4 md:-top-8 md:-right-8"
          >
            <FaSearch className="text-4xl md:text-6xl text-gray-400 animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {language === 'ar'
              ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها'
              : 'Sorry, the page you are looking for does not exist or has been moved'}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button variant="primary" size="lg" className="flex items-center gap-2">
              <FaHome />
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            {language === 'ar' ? 'الرجوع للخلف' : 'Go Back'}
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-500">
                {language === 'ar' ? 'أو يمكنك البحث' : 'Or you can search'}
              </span>
            </div>
          </div>
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder={language === 'ar' ? 'ابحث في الموقع...' : 'Search site...'}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/${e.currentTarget.value}`;
                  }
                }}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}