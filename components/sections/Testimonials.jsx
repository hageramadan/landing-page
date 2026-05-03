import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, Tech Corp',
      content: 'Amazing team to work with! They delivered beyond our expectations.',
      rating: 5,
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Jane Smith',
      role: 'Marketing Director',
      content: 'The best decision we made for our digital transformation journey.',
      rating: 5,
      image: 'https://via.placeholder.com/100',
    },
    {
      name: 'Mike Johnson',
      role: 'Startup Founder',
      content: 'Professional, reliable, and innovative. Highly recommended!',
      rating: 5,
      image: 'https://via.placeholder.com/100',
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section id="testimonials" className="bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by businesses worldwide
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <FaQuoteLeft className="text-6xl text-blue-200 mb-6" />
              <p className="text-xl text-gray-700 mb-6">
                {testimonials[current].content}
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                  <p className="text-gray-600">{testimonials[current].role}</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={() => setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;