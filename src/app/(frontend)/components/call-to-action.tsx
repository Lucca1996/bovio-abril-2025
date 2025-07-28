"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useAnimation } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // SVG path para la animación de morphing

  
  return (
    <section 
      ref={containerRef}
      className="relative py-20 px-4 sm:py-32 sm:px-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Blob animado de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-20">
        <motion.svg
          viewBox="0 0 150 150"
          className="w-full h-full text-primary"
          initial="hidden"
          animate={controls}
        >
          <motion.path
            fill="currentColor"
            
          />
        </motion.svg>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }
            }
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Transforma tus espacios con diseños únicos
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            En Bovio SAS entendemos que cada espacio es único. Nuestro equipo de expertos está listo para crear soluciones personalizadas que se adapten perfectamente a tus necesidades.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/medida" 
                className={buttonVariants({
                  size: "lg",
                  className: "bg-primary dark:text-black hover:bg-primary/90 text-white font-medium px-8 py-3 rounded-md shadow-[0_4px_14px_0_rgba(0,118,255,0.39)]"
                })}
              >
                Solicitar Presupuesto
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contacto" 
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "border-primary text-primary hover:bg-primary/10 font-medium px-8 py-3 rounded-md"
                })}
              >
                Contactar Ahora
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};