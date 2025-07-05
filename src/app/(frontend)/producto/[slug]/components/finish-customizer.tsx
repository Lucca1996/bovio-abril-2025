"use client";

import { useState, memo, useMemo, useEffect } from "react";
// Ya no necesitamos el componente Slider
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FinishCustomizerProps {
  finishes: {
    id: string;
    type: string;
    priceMultiplier: number;
    image: string;
  }[];
  basePrice: number;
  onFinishChange?: (finish: { id: string; type: string; priceMultiplier: number; image: string }) => void;
}

export const FinishCustomizer = memo(({ finishes, basePrice, onFinishChange }: FinishCustomizerProps) => {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  // Usamos useMemo para calcular valores derivados
  const currentFinish = useMemo(() => finishes[selectedFinish], [finishes, selectedFinish]);
  const productPrice = useMemo(() => 
    basePrice * currentFinish.priceMultiplier, 
    [basePrice, currentFinish.priceMultiplier]
  );

  // Notificar al componente padre cuando cambia el acabado seleccionado
  useEffect(() => {
    if (onFinishChange) {
      onFinishChange(currentFinish);
    }
  }, [currentFinish, onFinishChange]);

  // Activar animación de pulso cuando cambia el precio
  useEffect(() => {
    setIsPriceAnimating(true);
    const timer = setTimeout(() => setIsPriceAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [productPrice]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 relative inline-block">
          Personaliza tu producto
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left"></span>
        </h3>
        
        <RadioGroup
          value={selectedFinish.toString()}
          onValueChange={(value) => setSelectedFinish(Number(value))}
          className="grid grid-cols-3 gap-2 sm:grid-cols-4"
        >
          {finishes.map((finish, index) => (
            <div key={finish.id} className="relative">
              <RadioGroupItem
                value={index.toString()}
                id={`finish-${index}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`finish-${index}`}
                className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-300 ease-in-out hover:shadow-md cursor-pointer"
              >
                <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-md">
                  <Image
                    src={finish.image}
                    alt={finish.type}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 15vw"
                  />
                  
                  {/* Overlay para indicar selección */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    selectedFinish === index ? 'bg-primary/10' : 'bg-black/0 hover:bg-black/10'
                  }`} />
                </div>
                
                <div className="text-center">
                  <p className="font-medium text-sm">{finish.type}</p>
                  <p className="text-xs text-muted-foreground">
                    +{((finish.priceMultiplier - 1) * 100).toFixed(0)}%
                  </p>
                </div>
                
                {/* Indicador de selección animado */}
                {selectedFinish === index && (
                  <motion.div 
                    className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    ✓
                  </motion.div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3 className="text-lg font-semibold">Información importante</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Las cantidades pueden ser ajustadas desde el carrito de compras una vez que agregues el producto.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Los tiempos de producción están sujetos al stock disponible de cada producto y acabado seleccionado.
        </p>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Precio</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={productPrice}
              className={`text-2xl font-bold ${isPriceAnimating ? 'text-primary' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isPriceAnimating ? 1.1 : 1
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              ${productPrice.toLocaleString('es-AR')}
            </motion.span>
          </AnimatePresence>
        </div>
        
        {/* Información de ahorro si hay descuento */}
        {currentFinish.priceMultiplier < 1 && (
          <motion.div 
            className="mt-2 text-right text-sm text-green-600 dark:text-green-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            Ahorras: ${(basePrice - productPrice).toLocaleString('es-AR')}
          </motion.div>
        )}
      </div>
    </div>
  );
});

FinishCustomizer.displayName = "FinishCustomizer";