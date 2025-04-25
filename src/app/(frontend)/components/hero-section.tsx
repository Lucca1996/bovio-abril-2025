"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Datos para el carrusel
const carouselData = [
  {
    id: 1,
    image: "https://crehana-blog.imgix.net/media/filer_public/12/36/12361c27-ecd0-4e5b-bb82-4623aaf9e94a/taladro_de_carpinteria.jpg?auto=format&q=50",
    slogan: "Artesanía de precisión",
    description: "Cada pieza es una obra maestra de detalle y calidad",
    promo: "20% de descuento en muebles a medida"
  },
  {
    id: 2,
    image: "https://serveiestacio.com/blog/wp-content/uploads/2021/05/herramientas-de-carpinteria-servei-estacio.jpg",
    slogan: "Diseños que inspiran",
    description: "Creamos espacios que reflejan tu personalidad",
    promo: "Envío gratuito en compras superiores a $300.000"
  },
  {
    id: 3,
    image: "https://homepro.com.mx/hubfs/Todo%20sobre%20servicios%20de%20carpinter%C3%ADa%20en%20la%20CDMX.jpg",
    slogan: "Innovación sostenible",
    description: "Comprometidos con el medio ambiente y la calidad",
    promo: "2x1 en accesorios de madera esta semana"
  }
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Valores de parallax para diferentes elementos
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const fadeIn = useTransform(scrollY, [0, 200], [1, 0]);

  // Efecto para evitar problemas de hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Efecto para el autoplay del carrusel
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoplay]);

  // Pausar autoplay cuando el usuario interactúa con los controles
  const handleManualChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    
    // Reanudar autoplay después de 10 segundos de inactividad
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const nextSlide = () => {
    handleManualChange((currentSlide + 1) % carouselData.length);
  };

  const prevSlide = () => {
    handleManualChange((currentSlide - 1 + carouselData.length) % carouselData.length);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[95vh] md:h-[94vh] lg:h-[94vh] overflow-hidden bg-gradient-to-t from-black/70 via-black/40 to-transparent"
      aria-label="Sección principal"
    >
      <div className="container relative z-10 mx-auto h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-6 py-4 md:py-6 lg:py-8">
        {/* Contenido del texto a la izquierda */}
        <motion.div 
          className="w-full lg:w-1/2 mb-6 lg:mb-0 text-center lg:text-left mt-8 sm:mt-0"
          style={{ y: textY, opacity: fadeIn }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
            Transformamos <span className="text-primary">madera</span> en experiencias únicas
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0">
            Diseño y fabricación de mobiliario personalizado con los más altos estándares de calidad y sostenibilidad.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
            <Link 
              href="/catalogo" 
              className={buttonVariants({
                size: "default",
                className: "bg-primary hover:bg-primary/90 text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-md transition-all duration-300 transform hover:scale-105 shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]"
              })}
            >
              Ver Catálogo
            </Link>
            <Link 
              href="/medida" 
              className={buttonVariants({
                variant: "outline",
                size: "default",
                className: "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-md transition-all duration-300 mt-3 sm:mt-0"
              })}
            >
              Diseño a Medida
            </Link>
          </div>
        </motion.div>
        
        {/* Carrusel de imágenes a la derecha */}
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 h-[35vh] sm:h-[38vh] md:h-[40vh] lg:h-[50vh] relative perspective rounded-xl overflow-hidden neumorph mx-auto mt-6 lg:mt-0">
          {/* Controles del carrusel */}
          <div className="absolute top-1/2 left-2 sm:left-4 z-20 transform -translate-y-1/2">
            <button 
              onClick={prevSlide}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-2 sm:right-4 z-20 transform -translate-y-1/2">
            <button 
              onClick={nextSlide}
              className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-300"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>
          
          {/* Indicadores de slide */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2">
            {carouselData.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => handleManualChange(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir a slide ${index + 1}`}
                aria-current={currentSlide === index ? 'true' : 'false'}
              />
            ))}
          </div>
          
          {/* Slides del carrusel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-${currentSlide}`}
              className="absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={carouselData[currentSlide].image}
                  alt={carouselData[currentSlide].slogan}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
                  className="object-cover"
                  quality={90}
                />
                
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Contenido del slide */}
                <div className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-4 sm:left-6 right-4 sm:right-6 text-white z-10">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2"
                  >
                    {carouselData[currentSlide].slogan}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm sm:text-base md:text-lg text-gray-200 mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-none"
                  >
                    {carouselData[currentSlide].description}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="bg-primary/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg inline-block"
                  >
                    <span className="font-medium text-sm sm:text-base">
                      {carouselData[currentSlide].promo}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <motion.div 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ opacity: fadeIn }}
      >
        <span className="text-xs sm:text-sm text-white mb-1 sm:mb-2">Descubre más</span>
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center p-1">
          <motion.div 
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
            animate={{ 
              y: [0, 8, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};