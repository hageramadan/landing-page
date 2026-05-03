'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import OptimizedImage from '@/components/ui/OptimizedImage';

const Gallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Generate dummy images
    const dummyImages = Array.from({ length: 6 }, (_, i) => 
      `https://via.placeholder.com/400x300?text=Image+${i + 1}`
    );
    setImages(dummyImages);

    // Setup Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc && img.src !== dataSrc) {
              img.src = dataSrc;
            }
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">معرض الأعمال</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              ref={(el) => { imageRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <OptimizedImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-64"
                objectFit="cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;