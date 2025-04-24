"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// Eliminar la importación no utilizada de 'cn' o renombrarla a '_cn'
interface FinishCustomizerProps {
  finishes: {
    id: string;
    type: string;
    priceMultiplier: number;
    image: string;
  }[];
  basePrice: number;
}

export const FinishCustomizer = ({ finishes, basePrice }: FinishCustomizerProps) => {
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const currentFinish = finishes[selectedFinish];
  const totalPrice = basePrice * currentFinish.priceMultiplier * quantity;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Personaliza tu producto</h3>
        <RadioGroup
          value={selectedFinish.toString()}
          onValueChange={(value) => setSelectedFinish(Number(value))}
          className="grid grid-cols-2 gap-4"
        >
          {finishes.map((finish, index) => (
            <div key={finish.id}>
              <RadioGroupItem
                value={index.toString()}
                id={`finish-${index}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`finish-${index}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="relative w-full aspect-square mb-2">
                  <Image
                    src={finish.image}
                    alt={finish.type}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="text-center">
                  <p className="font-medium">{finish.type}</p>
                  <p className="text-sm text-muted-foreground">
                    +{((finish.priceMultiplier - 1) * 100).toFixed(0)}%
                  </p>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Cantidad</h3>
        <Slider
          value={[quantity]}
          onValueChange={([value]) => setQuantity(value)}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-muted-foreground">1 unidad</span>
          <span className="text-sm text-muted-foreground">10 unidades</span>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">
            ${totalPrice.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </div>
  );
};