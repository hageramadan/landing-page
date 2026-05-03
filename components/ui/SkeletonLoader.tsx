'use client';

import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  type?: 'card' | 'hero' | 'text' | 'image';
  count?: number;
}

const SkeletonLoader = ({ type = 'card', count = 1 }: SkeletonLoaderProps) => {
  const variants = {
    card: (
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    ),
    hero: (
      <div className="min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-32 h-8 bg-gray-200 rounded-full mb-6 animate-pulse" />
              <div className="h-16 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-16 bg-gray-200 rounded mb-6 animate-pulse w-3/4" />
              <div className="h-20 bg-gray-200 rounded mb-8 animate-pulse" />
              <div className="flex gap-4">
                <div className="w-40 h-12 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-40 h-12 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    ),
    text: (
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
      </div>
    ),
    image: (
      <div className="bg-gray-200 rounded-2xl animate-pulse" style={{ height: 300 }} />
    ),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {variants[type]}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;