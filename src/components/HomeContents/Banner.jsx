"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const slides = [
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

  return (
    <div className="container mx-auto">
      <div className="w-full h-[600px] bg-base-100 ">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        
        
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center h-full px-4 md:px-20">
              <div className="w-full md:w-1/2 space-y-6">
                <p className="text-secondary font-medium">{slide.subtitle}</p>
                <h1 className="text-4xl md:text-6xl font-bold text-primary">
                  {slide.title}
                </h1>
                <button className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all">
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default Banner;