"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation } from "framer-motion";
import type { Category } from '@/payload-types';

interface FeatureGridProps {
  categories: Category[];
}

// Componente de tarjeta con efecto flip
const FlipCard = ({ category, index }: { category: Category, index: number }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isFlipped, setIsFlipped] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Usar estado para controlar el flip en lugar de manipular el DOM directamente
  const handleMouseEnter = () => {
    setIsFlipped(true);
  };
  
  const handleMouseLeave = () => {
    setIsFlipped(false);
  };
  
  return (
    <motion.div
      ref={ref}
      className="group perspective h-[400px] w-full cursor-pointer"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      }}
      onClick={() => {
        window.location.href = `/catalogo?category=${category.id}`;
      }}
      style={{
        perspective: '1000px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative w-full h-full duration-500 transition-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Frente de la tarjeta */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          style={{
            backfaceVisibility: 'hidden'
          }}
        >
          {category.image && (
            <div className="relative h-3/4 w-full overflow-hidden">
              <Image 
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          )}
          <div className="p-4 flex flex-col items-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.name}</h3>
          </div>
        </div>
        
        {/* Reverso de la tarjeta */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/90 to-primary/70 text-white p-6 flex flex-col justify-center items-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
          <p className="text-center mb-6">Descubre nuestra colección de {category.name.toLowerCase()} diseñados con los más altos estándares de calidad.</p>
          <button 
            className="px-6 py-2 bg-white text-primary font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation(); // Evita que se active el onClick del contenedor padre
              window.location.href = `/catalogo?category=${category.id}`;
            }}
          >
            Explorar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const FeatureGrid = ({ categories }: FeatureGridProps) => {
  const titleControls = useAnimation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      titleControls.start("visible");
    }
  }, [titleControls, isInView]);
  
  return (
    <section className="py-16 px-4 sm:py-24 sm:px-6 bg-gray-50 dark:bg-gray-900" id="categorias">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          ref={titleRef}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          initial="hidden"
          animate={titleControls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" }
            }
          }}
        >
          Encuentra lo que estás buscando
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <FlipCard key={category.id} category={category} index={index} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No se encontraron categorías disponibles.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};