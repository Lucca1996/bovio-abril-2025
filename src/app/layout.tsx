"use client"

import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <style jsx global>{`
          @layer utilities {
            /* Utilidades personalizadas para efectos neumórficos */
            .neumorph {
              @apply bg-gray-100 dark:bg-gray-800 shadow-[6px_6px_12px_0_rgba(0,0,0,0.1),-6px_-6px_12px_0_rgba(255,255,255,0.8)] dark:shadow-[6px_6px_12px_0_rgba(0,0,0,0.3),-6px_-6px_12px_0_rgba(255,255,255,0.05)];
            }
            
            .neumorph-inset {
              @apply bg-gray-100 dark:bg-gray-800 shadow-[inset_6px_6px_12px_0_rgba(0,0,0,0.1),inset_-6px_-6px_12px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_6px_6px_12px_0_rgba(0,0,0,0.3),inset_-6px_-6px_12px_0_rgba(255,255,255,0.05)];
            }
            
            /* Utilidades para 3D y perspectiva */
            .perspective {
              perspective: 1000px;
            }
            
            .preserve-3d {
              transform-style: preserve-3d;
            }
            
            .backface-hidden {
              backface-visibility: hidden;
            }
            
            .rotate-y-180 {
              transform: rotateY(180deg);
            }
            
            /* Animaciones optimizadas */
            .will-change-transform {
              will-change: transform;
            }
            
            .will-change-opacity {
              will-change: opacity;
            }
            
            /* Utilidades para scroll */
            .scroll-snap-x {
              scroll-snap-type: x mandatory;
            }
            
            .snap-start {
              scroll-snap-align: start;
            }
            
            /* Utilidades para content-visibility */
            .content-visibility-auto {
              content-visibility: auto;
            }
          }
          
          /* Media query para preferencias de movimiento reducido */
          @media (prefers-reduced-motion: reduce) {
            *, ::before, ::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}