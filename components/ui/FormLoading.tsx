'use client';

import { motion } from 'framer-motion';

const FormLoading = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 max-w-sm mx-4"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-gray-700 font-medium">جاري المعالجة...</p>
        <p className="text-sm text-gray-500">يرجى الانتظار</p>
      </motion.div>
    </div>
  );
};

export default FormLoading;