"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { ProductCard } from './shared/product-card';
import type { Product } from '@/payload-types';
import { mapPayloadProductToProductType } from '../utils/product-mapper';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsCarouselProps {
  products: Product[];
  initialFavorites?: number[];
  initialCart?: number[];
}

export const NewsCarousel = ({ 
  products, 
  initialFavorites = [], 
  initialCart = [] 
}: NewsCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(carouselRef, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  return (
    <section className="py-16 px-4 sm:py-24 sm:px-6" id="novedades">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } }
          }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Novedades
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style jsx global>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            
            @media (prefers-reduced-motion: no-preference) {
              .scroll-animation {
                scroll-behavior: smooth;
              }
            }
          `}</style>
          
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <motion.div 
                key={product.id}
                className="min-w-[280px] sm:min-w-[320px] w-[80%] sm:w-[40%] lg:w-[30%] flex-shrink-0 snap-start px-4"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }
                }}
              >
                <div className="h-full transform transition-transform duration-300 hover:scale-[1.02]">
                  <ProductCard
                    {...mapPayloadProductToProductType(product)}
                    initialIsFavorite={initialFavorites.includes(product.id)}
                    initialIsCart={initialCart.includes(product.id)}
                  />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="w-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};