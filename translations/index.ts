export const translations = {
  ar: {
    // Navigation
    nav: {
      home: "الرئيسية",
      features: "المميزات",
      services: "الخدمات",
      testimonials: "آراء العملاء",
      contact: "اتصل بنا",
      getStarted: "ابدأ مشروعك الآن"
    },
    
    // Hero Section
    hero: {
      badge: "🚀 مرحباً بك في المستقبل",
      title: "حوِّل حضورك",
      titleGradient: "الرقمي",
      description: "نساعد الأعمال على النمو بحلول متطورة واستراتيجيات مبتكرة. انضم إلى آلاف العملاء الراضين حول العالم.",
      cta: "ابدأ مشروعك الآن",
      demo: "شاهد العرض"
    },
    
    // Features Section
    features: {
      title: "لماذا يختار رواد الأعمال شركة تواجد؟",
      subtitle: "نقدم لك كل ما تحتاجه للنجاح في العالم الرقمي",
      items: [
        {
          title: "أداء سريع",
          description: "أوقات تحميل فائقة السرعة لتجربة مستخدم أفضل"
        },
        {
          title: "منصة آمنة",
          description: "حماية على مستوى المؤسسات لحماية بياناتك"
        },
        {
          title: "دعم على مدار الساعة",
          description: "دعم عملاء على مدار الساعة لتلبية احتياجاتك"
        },
        {
          title: "تحليلات متقدمة",
          description: "رؤى مفصلة لتنمية أعمالك"
        }
      ]
    },
    
    // Stats Section
    stats: {
      clients: "عملاء سعداء",
      projects: "مشاريع منجزة",
      awards: "جوائز فازنا بها",
      team: "أعضاء الفريق"
    },
    
    // Testimonials Section
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      subtitle: "موثوق من قبل الشركات حول العالم"
    },
    
    // CTA Section
    cta: {
      title: "هل أنت مستعد للبدء؟",
      description: "انضم إلى آلاف العملاء الراضين وابدأ رحلتك معنا اليوم",
      button: "ابدأ مشروعك الآن"
    },
    
    // Footer
    footer: {
      description: "نصنع تجارب رقمية مذهلة للشركات حول العالم",
      quickLinks: "روابط سريعة",
      legal: "قانوني",
      followUs: "تابعنا",
      about: "من نحن",
      services: "الخدمات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      cookie: "سياسة ملفات الارتباط",
      rights: "جميع الحقوق محفوظة"
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: "Home",
      features: "Features",
      services: "Services",
      testimonials: "Testimonials",
      contact: "Contact",
      getStarted: "Get Started"
    },
    
    // Hero Section
    hero: {
      badge: "🚀 Welcome to the future",
      title: "Transform Your",
      titleGradient: "Digital Presence",
      description: "We help businesses grow with cutting-edge solutions and innovative strategies. Join thousands of satisfied customers worldwide.",
      cta: "Get Started",
      demo: "Watch Demo"
    },
    
    // Features Section
    features: {
      title: "Why Choose Us?",
      subtitle: "We provide everything you need to succeed in the digital world",
      items: [
        {
          title: "Fast Performance",
          description: "Lightning fast loading times for better user experience"
        },
        {
          title: "Secure Platform",
          description: "Enterprise-grade security to protect your data"
        },
        {
          title: "24/7 Support",
          description: "Round-the-clock customer support for your needs"
        },
        {
          title: "Advanced Analytics",
          description: "Detailed insights to grow your business"
        }
      ]
    },
    
    // Stats Section
    stats: {
      clients: "Happy Clients",
      projects: "Projects Done",
      awards: "Awards Won",
      team: "Team Members"
    },
    
    // Testimonials Section
    testimonials: {
      title: "What Our Clients Say",
      subtitle: "Trusted by businesses worldwide"
    },
    
    // CTA Section
    cta: {
      title: "Ready to Get Started?",
      description: "Join thousands of satisfied customers and start your journey with us today",
      button: "Get Started Now"
    },
    
    // Footer
    footer: {
      description: "Creating amazing digital experiences for businesses worldwide",
      quickLinks: "Quick Links",
      legal: "Legal",
      followUs: "Follow Us",
      about: "About Us",
      services: "Services",
      pricing: "Pricing",
      contact: "Contact",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie Policy",
      rights: "All rights reserved"
    }
  }
};

export type Language = 'ar' | 'en';
export type TranslationKey = keyof typeof translations.ar;