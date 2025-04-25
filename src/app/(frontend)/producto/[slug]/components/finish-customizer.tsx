"use client";

import { useState, memo, useMemo, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
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
}

export const FinishCustomizer = memo(({ finishes, basePrice }: FinishCustomizerProps) => {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isPriceAnimating, setIsPriceAnimating] = useState(false);

  // Usamos useMemo para calcular valores derivados
  const currentFinish = useMemo(() => finishes[selectedFinish], [finishes, selectedFinish]);
  const totalPrice = useMemo(() => 
    basePrice * currentFinish.priceMultiplier * quantity, 
    [basePrice, currentFinish.priceMultiplier, quantity]
  );

  // Activar animación de pulso cuando cambia el precio
  useEffect(() => {
    setIsPriceAnimating(true);
    const timer = setTimeout(() => setIsPriceAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [totalPrice]);

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
        <h3 className="text-lg font-semibold mb-4">Cantidad</h3>
        <Slider
          value={[quantity]}
          onValueChange={([value]) => setQuantity(value)}
          min={1}
          max={10}
          step={1}
          className="w-full"
          aria-label="Seleccionar cantidad"
        />
        <div className="flex justify-between mt-3">
          <span className="text-sm text-muted-foreground">1 unidad</span>
          <span className="text-sm text-muted-foreground">10 unidades</span>
        </div>
        
        {/* Contador visual de cantidad */}
        <div className="flex justify-center mt-4 gap-1">
          {Array.from({ length: Math.min(quantity, 5) }).map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-primary"
              style={{ opacity: 1 - (i * 0.15) }}
            />
          ))}
          {quantity > 5 && (
            <div className="text-xs text-primary ml-1">+{quantity - 5}</div>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={totalPrice}
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
              ${totalPrice.toLocaleString('es-AR')}
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
            Ahorras: ${(basePrice * quantity - totalPrice).toLocaleString('es-AR')}
          </motion.div>
        )}
      </div>
    </div>
  );
});

FinishCustomizer.displayName = "FinishCustomizer";