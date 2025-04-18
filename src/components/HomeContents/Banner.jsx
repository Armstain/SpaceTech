'use client'
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Clock, ShoppingCart, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import image1 from '@/public/assets/1.jpg';
import image2 from '@/public/assets/2.jpg';
import image3 from '@/public/assets/3.jpg';

const deals = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "Noise cancellation & 30-hour battery life",
    originalPrice: 299.99,
    salePrice: 199.99,
    discount: 33,
    imageSrc: image1,
    imageAlt: "Premium Wireless Headphones",
    expiryHours: 24,
  },
  {
    id: 2,
    title: "Ultra Slim 4K Smart TV",
    description: "Cutting-edge display with AI-powered processor",
    originalPrice: 1299.99,
    salePrice: 899.99,
    discount: 30,
    imageSrc: image2,
    imageAlt: "Ultra Slim 4K Smart TV",
    expiryHours: 48,
  },
  {
    id: 3,
    title: "Pro Gaming Laptop",
    description: "Latest GPU & CPU for maximum performance",
    originalPrice: 1899.99,
    salePrice: 1599.99,
    discount: 15,
    imageSrc: image3,
    imageAlt: "Pro Gaming Laptop",
    expiryHours: 72,
  },
  {
    id: 4,
    title: "Smartphone Flash Sale",
    description: "5G ready with advanced camera system",
    originalPrice: 999.99,
    salePrice: 749.99,
    discount: 25,
    imageSrc: "/api/placeholder/600/400",
    imageAlt: "Latest Smartphone Model",
    expiryHours: 12,
  },
];

// Countdown Timer Component
const CountdownTimer = ({ hours }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: hours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }

        let newTime = { ...prevTime };
        
        if (newTime.seconds > 0) {
          newTime.seconds -= 1;
        } else if (newTime.minutes > 0) {
          newTime.minutes -= 1;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours -= 1;
          newTime.minutes = 59;
          newTime.seconds = 59;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time units to always have two digits
  const formatTimeUnit = (unit) => {
    return unit < 10 ? `0${unit}` : unit;
  };

  return (
    <div className="flex items-center space-x-1 text-red-600">
      <Clock size={20} className="mr-1" />
      <div className="font-mono font-bold text-lg">
        {formatTimeUnit(timeLeft.hours)}:{formatTimeUnit(timeLeft.minutes)}:{formatTimeUnit(timeLeft.seconds)}
      </div>
    </div>
  );
};

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { addItem } = useCart();
  
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleAddToCart = (deal) => {
    addItem({
      id: deal.id,
      name: deal.title,
      price: deal.salePrice,
      image: deal.imageSrc.src || deal.imageSrc,
      quantity: 1
    });
    
    if (typeof toast !== 'undefined') {
      toast.success(`${deal.title} added to cart!`);
    } else {
      alert(`${deal.title} added to cart!`);
    }
  };

  return (
    <div className="bg-white text-gray-800 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto relative"
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   clickable: true,
          //   dynamicBullets: true,
          // }}

          onSlideChange={handleSlideChange}
          className="h-96 md:h-[28rem] rounded-xl overflow-hidden shadow-md"
        >
          {deals.map((deal, index) => (
            <SwiperSlide key={deal.id} className="text-gray-800 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                {/* Left side with image */}
                <div className="flex items-center justify-center p-4 bg-gray-50">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0, scale: activeIndex === index ? 1 : 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-64 md:h-80"
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={deal.imageSrc} 
                        alt={deal.imageAlt}
                        fill
                        className="object-contain"
                      />
                      
                      {/* Discount badge */}
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center text-center z-10 shadow-lg">
                        <span className="font-bold text-xl leading-none">{deal.discount}%</span>
                        <span className="text-xs font-medium">OFF</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Right side with deal details */}
                <div className="flex flex-col justify-center p-8 bg-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : 20 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold">FLASH DEAL</span>
                      <CountdownTimer hours={deal.expiryHours} />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{deal.title}</h2>
                    <p className="text-gray-600 text-lg">{deal.description}</p>
                    
                    <div className="flex items-baseline space-x-3">
                      <span className="text-3xl font-bold text-gray-800">${deal.salePrice.toFixed(2)}</span>
                      <span className="text-xl text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                      <button 
                        onClick={() => handleAddToCart(deal)}
                        className="bg-secondary hover:bg-secondary/80 text-white rounded-md py-3 px-6 font-semibold flex items-center justify-center transition-colors duration-300"
                      >
                        <ShoppingCart size={20} className="mr-2" />
                        ADD TO CART
                      </button>
                      <button className="bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-md py-3 px-6 font-semibold flex items-center justify-center transition-colors duration-300">
                        VIEW DETAILS
                        <ArrowRight size={20} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
};

export default Banner;