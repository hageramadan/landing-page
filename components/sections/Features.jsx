'use client';

import { motion } from 'framer-motion';
import { FaRocket, FaShieldAlt, FaHeadset, FaChartLine } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import Card from '../ui/Card';

const Features = () => {
  const { t } = useLanguage();
  
  const icons = [FaRocket, FaShieldAlt, FaHeadset, FaChartLine];
  const colors = ['text-blue-600', 'text-green-600', 'text-purple-600', 'text-orange-600'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.title')}
          </h2>
      
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {t('features.items').map((feature, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="text-center hover:shadow-xl transition-shadow">
                  <Icon className={`text-5xl ${color} mx-auto mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;