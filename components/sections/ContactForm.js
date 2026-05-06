// ContactForm.js
"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm = ({ countries: countriesProp, onSubmit }) => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
    additionalInfo: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  const [selectedCountry, setSelectedCountry] = useState(
    countriesProp[0] || {
      name: language === "ar" ? "السعودية" : "Saudi Arabia",
      code: "+966",
      flag: "🇸🇦",
      placeholder: "512345678",
    }
  );

  // 🟢 IMPORTANT: Update selected country name when language changes
  useEffect(() => {
    setSelectedCountry((prev) => {
      // Find the current country in countriesProp to get the translated name
      const currentCountryData = countriesProp.find(c => c.code === prev.code);
      if (currentCountryData) {
        return {
          ...prev,
          name: currentCountryData.name
        };
      }
      return prev;
    });
  }, [language, countriesProp]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Validation function with translations
  const validateForm = () => {
    const newErrors = {};

    // Validate name (at least 3 characters)
    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    } else if (formData.name.trim().length < 3) {
      newErrors.name = t("validation.nameMinLength");
    }

    // Validate phone (numbers only and at least 9 digits)
    const phoneRegex = /^[0-9]{9,15}$/;
    if (!formData.phone) {
      newErrors.phone = t("validation.phoneRequired");
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t("validation.phoneInvalid");
    }

    // Validate email (optional but if provided must be valid)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("validation.emailInvalid");
    }

    // Validate service type
    if (!formData.serviceType) {
      newErrors.serviceType = t("validation.serviceRequired");
    }

    // Validate message (at least 10 characters)
    if (!formData.message.trim()) {
      newErrors.message = t("validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("validation.messageMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    const country = countriesProp.find((c) => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
      setFormData((prev) => ({ ...prev, phone: "" }));
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Run validation
    if (!validateForm()) {
      return;
    }

    const fullPhoneNumber = `${selectedCountry.code}${formData.phone}`;
    const submissionData = {
      ...formData,
      fullPhoneNumber,
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
    };
    
    if (onSubmit) {
      onSubmit(submissionData);
    }
  };

  const getPhonePlaceholder = () => `${t("common.example")}: ${selectedCountry.placeholder}`;

  // Input className with blue focus (no black)
  const getInputClassName = (fieldName) => {
    return `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4886C6] focus:border-[#4886C6]  ${
      errors[fieldName] 
        ? "border-red-500 focus:ring-red-500" 
        : "border-gray-300"
    }`;
  };

  // Service options with translations
  const serviceOptions = [
    { value: "digital_marketing", label: t("servicesNames.digitalMarketing") },
    { value: "website_dev", label: t("servicesNames.websiteDev") },
    { value: "mobile_apps", label: t("servicesNames.mobileApps") },
    { value: "other", label: t("servicesNames.other") },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex-1 bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-10"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* الاسم ورقم الهاتف */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("form.fullName")} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("form.fullNamePlaceholder")}
              className={getInputClassName("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("form.phone")} <span className="text-red-500">*</span>
            </label>
            <div className="flex" dir="rtl">
              {/* Custom Select */}
              <div className="relative flex-shrink-0" ref={selectRef}>
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-3 bg-gradient-to-r from-gray-50 to-white border rounded-r-lg rounded-l-none focus:outline-none focus:ring-2 focus:ring-[#4886C6] transition-all duration-200 ${
                    errors.phone 
                      ? "border-red-500" 
                      : "border-gray-300"
                  }`}
                  style={{ minWidth: "90px" }}
                >
                  <span className="text-base sm:text-xl">{selectedCountry.flag}</span>
                  <span className="font-semibold text-gray-700 text-xs sm:text-base">{selectedCountry.code}</span>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                {isOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsOpen(false)}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-fit sm:w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      {countriesProp.map((country, index) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            handleCountryChange({ target: { value: country.code } });
                            setIsOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-2 sm:gap-3 px-3 py-2 sm:py-3 
                            hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                            transition-all duration-200 text-right
                            ${selectedCountry.code === country.code ? 'bg-blue-50 border-r-4 border-[#4886C6]' : ''}
                            ${index !== countriesProp.length - 1 ? 'border-b border-gray-100' : ''}
                          `}
                        >
                          <span className="text-lg sm:text-2xl">{country.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-bold text-gray-800 text-xs sm:text-sm">{country.code}</span>
                            <span className="text-[10px] sm:text-xs text-gray-500">{country.name}</span>
                          </div>
                          {selectedCountry.code === country.code && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 sm:w-4 sm:h-4 text-[#4886C6] mr-auto"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
              
              {/* Phone input */}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getPhonePlaceholder()}
                className={`flex-1 min-w-0 px-3 sm:px-4 py-3 border rounded-l-lg rounded-r-none focus:outline-none focus:ring-2 focus:ring-[#4886C6] focus:border-[#4886C6] transition-all text-sm sm:text-base ${
                  errors.phone 
                    ? "border-red-500" 
                    : "border-gray-300"
                }`}
              />
            </div>
            
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
            
            {/* 🟢 This will now update when language changes */}
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm sm:text-lg">{selectedCountry.flag}</span>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {selectedCountry.name}: {selectedCountry.code}XXXXXXXX
              </p>
            </div>
          </div>
        </div>

        {/* باقي الكود كما هو */}
        {/* الإيميل ومعلومات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("form.email")} <span className="text-gray-400 text-xs">({t("common.optional")})</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@tawajood.com"
              className={getInputClassName("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("form.additionalInfo")}{" "}
              <span className="text-gray-400 text-xs">({t("common.optional")})</span>
            </label>
            <input
              type="text"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder={t("form.additionalInfoPlaceholder")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4886C6] focus:border-[#4886C6]"
            />
          </div>
        </div>

        {/* نوع الخدمة */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t("form.serviceType")} <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {serviceOptions.map((service) => (
              <label key={service.value} className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name="serviceType"
                    value={service.value}
                    checked={formData.serviceType === service.value}
                    onChange={handleChange}
                    className="peer appearance-none mt-3 w-5 h-5 rounded-full border-2 border-gray-300 checked:bg-[#60D669] checked:border-[#60D669] cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-[16px]">
                    <svg
                      className={`w-3 h-3 text-white transition-all duration-200 ${
                        formData.serviceType === service.value ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm md:text-base text-gray-700 group-hover:text-gray-900">
                  {service.label}
                </span>
              </label>
            ))}
          </div>
          {errors.serviceType && (
            <p className="text-red-500 text-xs mt-2">{errors.serviceType}</p>
          )}
        </div>

        {/* رسالتك */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t("form.message")} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder={t("form.messagePlaceholder")}
            className={getInputClassName("message")}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        {/* زر الإرسال */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 6px 20px #00000060" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center
             group bg-gradient-to-r from-[#4584C5] to-[#21405F] hover:from-[#1E75AB] hover:to-[#1E75AB]
            justify-center gap-2 px-8 py-3 rounded-lg text-white font-semibold group text-base"
            style={{
              // background: "linear-gradient(90deg, #4584C5 0%, #21405F 100%)",
              boxShadow: "0px 4px 15px #00000040",
            }}
          >
            <span className="text-sm md:text-[16px] whitespace-nowrap">{t("form.submitButton")}</span>
            <motion.div>
              <FaArrowRight
                className={`inline group-hover:-rotate-45 ${language === "ar" ? "rotate-180" : ""} text-sm md:text-base`}
              />
            </motion.div>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;