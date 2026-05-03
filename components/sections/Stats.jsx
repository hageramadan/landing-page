'use client';

import { motion } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaAward, FaCode } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

const Stats = () => {
  const { t } = useLanguage();
  
  const stats = [
    { icon: FaUsers, value: 5000, label: t('stats.clients'), suffix: '+' },
    { icon: FaProjectDiagram, value: 1200, label: t('stats.projects'), suffix: '+' },
    { icon: FaAward, value: 25, label: t('stats.awards'), suffix: '' },
    { icon: FaCode, value: 100, label: t('stats.team'), suffix: '+' },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <stat.icon className="text-5xl mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;