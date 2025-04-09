'use client'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const slides = [
  {
    title: "Site Under Construction",
    subtitle: "Coming Soon",
    buttonText: "STAY TUNED"
  },
  {
    title: "Portable device",
    subtitle: "For your comfort.",
    buttonText: "EXPLORE NOW"
  },
  {
    title: "Smart Solutions",
    subtitle: "For modern living.",
    buttonText: "LEARN MORE"
  },
  {
    title: "Innovation",
    subtitle: "For the future.",
    buttonText: "DISCOVER"
  }
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative container mx-auto"
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        className="h-[60vh] md:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="bg-gradient-to-r from-gray-900 to-gray-600 text-white mt-32">
            <div className="flex flex-col justify-center items-center h-full text-center px-4">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : -20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slide.title}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 20 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-xl md:text-2xl mb-8 max-w-2xl"
              >
                {slide.subtitle}
              </motion.p>
              
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1 : 0.9 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-focus text-white font-bold py-3 px-8 rounded-md"
              >
                {slide.buttonText}
              </motion.button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Banner;
