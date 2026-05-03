'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaComment, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '../ui/Button';

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setStatus('success');
      
      // Track conversion event in GTM
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_submission',
          form_name: 'contact_form',
          form_location: 'landing_page'
        });
        console.log('GTM Event: form_submission pushed to dataLayer');
      }
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
      
    } catch (error) {
      setStatus('error');
      setErrorMessage('حدث خطأ، يرجى المحاولة مرة أخرى');
      
      // Track error event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'form_error',
          form_name: 'contact_form',
          error_message: 'Submission failed'
        });
      }
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'نحن هنا للإجابة على أسئلتك واستفساراتك'
              : 'We are here to answer your questions and inquiries'}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center gap-3"
            >
              <FaCheckCircle className="text-2xl" />
              <span>
                {language === 'ar' 
                  ? '✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً'
                  : '✓ Message sent successfully! We will get back to you soon'}
              </span>
            </motion.div>
          )}

          {/* Error Message */}
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-3"
            >
              <FaExclamationCircle className="text-2xl" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative">
              <FaUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                placeholder={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                style={{ paddingRight: '3rem' }}
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                style={{ paddingRight: '3rem' }}
              />
            </div>

            <div className="relative">
              <FaComment className="absolute right-3 top-4 text-gray-400" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder={language === 'ar' ? 'رسالتك' : 'Your Message'}
                style={{ paddingRight: '3rem' }}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {language === 'ar' ? 'جاري الإرسال...' : 'Sending...'}
                </span>
              ) : (
                language === 'ar' ? 'إرسال الرسالة' : 'Send Message'
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;