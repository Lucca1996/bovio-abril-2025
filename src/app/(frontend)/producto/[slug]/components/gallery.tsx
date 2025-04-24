"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

export const Gallery = ({ images }: GalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div 
        className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setIsLightboxOpen(true)}
      >
       <Image
  src={images[currentImage].image}
  alt={images[currentImage].alt}
  fill
  unoptimized
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden",
              currentImage === index && "ring-2 ring-primary"
            )}
            onClick={() => setCurrentImage(index)}
          >
            <Image
  src={images[currentImage].image}
  alt={images[currentImage].alt}
  fill
  unoptimized
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative aspect-square">
          <Image
  src={images[currentImage].image}
  alt={images[currentImage].alt}
  fill
  unoptimized
  className="object-cover"
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};