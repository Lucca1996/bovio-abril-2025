"use client";

import React from 'react';
import type { Category, Style } from '@/payload-types';
import { Button } from '@/components/ui/button';

interface FiltersControlCategoryProps {
  categories: Category[];
  styles: Style[];
  onCategoryChange: (category: number | null) => void;
  onStyleChange: (style: number | null) => void;
  selectedCategory: string | null;
  selectedStyle: string | null;
}

export const FiltersControlCategory: React.FC<FiltersControlCategoryProps> = ({
  categories,
  styles,
  onCategoryChange,
  onStyleChange,
  selectedCategory,
  selectedStyle,
}) => {
  return (
    <section 
      aria-label="Filtros de productos" 
      className="sticky top-16 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-4 px-2 rounded-lg mb-8 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300"
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Categorías */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Categorías</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onCategoryChange(null)}
              variant={!selectedCategory ? "default" : "outline"}
              className="text-sm transition-transform active:scale-95 focus:ring-2 focus:ring-primary/50"
              aria-pressed={!selectedCategory}
            >
              Todas
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                className="text-sm transition-transform active:scale-95 focus:ring-2 focus:ring-primary/50"
                aria-pressed={selectedCategory === category.id.toString()}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Estilos */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Estilos</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onStyleChange(null)}
              variant={!selectedStyle ? "default" : "outline"}
              className="text-sm transition-transform active:scale-95 focus:ring-2 focus:ring-primary/50"
              aria-pressed={!selectedStyle}
            >
              Todos
            </Button>
            {styles.map((style) => (
              <Button
                key={style.id}
                onClick={() => onStyleChange(style.id)}
                variant={selectedStyle === style.id.toString() ? "default" : "outline"}
                className="text-sm transition-transform active:scale-95 focus:ring-2 focus:ring-primary/50"
                aria-pressed={selectedStyle === style.id.toString()}
              >
                {style.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
