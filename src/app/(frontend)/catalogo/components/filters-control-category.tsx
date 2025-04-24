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
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onCategoryChange(null)}
          variant={!selectedCategory ? "default" : "outline"}
        >
          Todas las categorías
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            variant={selectedCategory === category.id.toString() ? "default" : "outline"}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onStyleChange(null)}
          variant={!selectedStyle ? "default" : "outline"}
        >
          Todos los estilos
        </Button>
        {styles.map((style) => (
          <Button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            variant={selectedStyle === style.id.toString() ? "default" : "outline"}
          >
            {style.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
