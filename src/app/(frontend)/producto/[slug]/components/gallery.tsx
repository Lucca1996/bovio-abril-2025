"use client";

import { useState, memo, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  id: string;
  alt: string;
  image: string;
  tags?: {
    id: string;
    tag: string;
    position: number[];
  }[];
}

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = memo(({ images }: GalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Efecto parallax para la imagen principal
  useEffect(() => {
    const handleScroll = () => {
      if (!mainImageRef.current) return;
      const scrollY = window.scrollY;
      const translateY = scrollY * 0.1; // Ajusta la velocidad del parallax
      mainImageRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manejador para el efecto de zoom en hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setMousePosition({ x, y });
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal con efecto parallax y zoom */}
      <div 
        className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group"
        onClick={() => setIsLightboxOpen(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        ref={mainImageRef}
        aria-label={`Imagen principal: ${images[currentImage].alt}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={images[currentImage].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentImage].image}
              alt={images[currentImage].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-transform duration-700",
                isHovering && "scale-110"
              )}
              style={
                isHovering
                  ? {
                      transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
                    }
                  : undefined
              }
              priority
              quality={90}
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay con efecto de zoom */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">
          <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ZoomIn className="w-5 h-5" />
          </div>
        </div>

        {/* Controles de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-800"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden",
              currentImage === index 
                ? "ring-2 ring-primary shadow-md" 
                : "hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600"
            )}
            onClick={() => setCurrentImage(index)}
            aria-label={`Ver imagen: ${image.alt}`}
            aria-current={currentImage === index ? "true" : "false"}
          >
            <Image
              src={image.image}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 20vw, (max-width: 1200px) 10vw, 8vw"
              className={cn(
                "object-cover transition-all duration-300",
                currentImage === index ? "brightness-100" : "brightness-90 hover:brightness-100"
              )}
              loading="lazy"
              quality={60}
            />
            
            {/* Indicador de selección */}
            {currentImage === index && (
              <motion.div 
                className="absolute inset-0 border-2 border-primary rounded-lg"
                layoutId="selectedImageIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={images[currentImage].image}
              alt={images[currentImage].alt}
              fill
              sizes="(max-width: 1200px) 90vw, 70vw"
              className="object-contain"
              quality={100}
            />
          </div>
          
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between text-white">
            <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentImage + 1} / {images.length}
            </span>
            <span className="text-sm bg-black/50 px-3 py-1 rounded-full">
              {images[currentImage].alt}
            </span>
          </div>
          
          {/* Controles de navegación del lightbox */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-colors duration-300"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition-colors duration-300"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
});

Gallery.displayName = "Gallery";