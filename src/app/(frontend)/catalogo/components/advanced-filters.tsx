"use client";

import React, { useState, useEffect } from 'react';
import type { Category, Style, Uso, Area, Tipo } from '@/payload-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Search, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  categories: Category[];
  styles: Style[];
  usos: Uso[];
  areas: Area[];
  tipos: Tipo[];
  onCategoryChange: (category: number | null) => void;
  onStyleChange: (style: number | null) => void;
  onUsoChange: (uso: number | null) => void;
  onAreaChange: (area: number | null) => void;
  onTipoChange: (tipo: number | null) => void;
  selectedCategory: string | null;
  selectedStyle: string | null;
  selectedUso: string | null;
  selectedArea: string | null;
  selectedTipo: string | null;
  onClearAllFilters: () => void;
}

interface FilterSection {
  id: string;
  title: string;
  items: Array<{ id: number; name?: string; title?: string }>;
  selectedValue: string | null;
  onChange: (value: number | null) => void;
  searchPlaceholder: string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  categories,
  styles,
  usos,
  areas,
  tipos,
  onCategoryChange,
  onStyleChange,
  onUsoChange,
  onAreaChange,
  onTipoChange,
  selectedCategory,
  selectedStyle,
  selectedUso,
  selectedArea,
  selectedTipo,
  onClearAllFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    category: '',
    style: '',
    uso: '',
    area: '',
    tipo: ''
  });
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: false,
    styles: false,
    usos: false,
    areas: false,
    tipos: false
  });

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const filterSections: FilterSection[] = [
     {
      id: 'usos',
      title: 'Uso',
      items: usos.map(uso => ({ id: uso.id, title: uso.title })),
      selectedValue: selectedUso,
      onChange: onUsoChange,
      searchPlaceholder: 'Buscar usos...'
    },
    {
      id: 'areas',
      title: 'Área',
      items: areas.map(area => ({ id: area.id, title: area.title })),
      selectedValue: selectedArea,
      onChange: onAreaChange,
      searchPlaceholder: 'Buscar áreas...'
    },
     
    {
      id: 'tipos',
      title: 'Tipo',
      items: tipos.map(tipo => ({ id: tipo.id, title: tipo.title })),
      selectedValue: selectedTipo,
      onChange: onTipoChange,
      searchPlaceholder: 'Buscar tipos...'
    },
    {
      id: 'categories',
      title: 'Categorías',
      items: categories.map(cat => ({ id: cat.id, name: cat.name })),
      selectedValue: selectedCategory,
      onChange: onCategoryChange,
      searchPlaceholder: 'Buscar categorías...'
    },
    {
      id: 'styles',
      title: 'Estilos',
      items: styles.map(style => ({ id: style.id, title: style.title })),
      selectedValue: selectedStyle,
      onChange: onStyleChange,
      searchPlaceholder: 'Buscar estilos...'
    },
   
   
  ];

  const activeFiltersCount = [selectedCategory, selectedStyle, selectedUso, selectedArea, selectedTipo]
    .filter(Boolean).length;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const updateSearchTerm = (sectionId: string, term: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [sectionId]: term
    }));
  };

  const getFilteredItems = (section: FilterSection) => {
    const searchTerm = searchTerms[section.id as keyof typeof searchTerms] || '';
    if (!searchTerm) return section.items;
    
    return section.items.filter(item => {
      const displayName = item.name || item.title || '';
      return displayName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  const getDisplayName = (item: { name?: string; title?: string }) => {
    return item.name || item.title || '';
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
      {/* Header con toggle y contador de filtros activos */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">Filtros</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAllFilters}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-xs lg:text-sm px-2"
            >
              <X className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-1" />
              <span className="hidden lg:inline">Limpiar</span>
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Filtros activos como badges */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex flex-wrap gap-1.5">
                 {selectedUso && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800 text-xs px-2 py-1">
                  {usos.find(u => u.id.toString() === selectedUso)?.title}
                  <button
                    onClick={() => onUsoChange(null)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}
              {selectedCategory && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800 text-xs px-2 py-1">
                  {categories.find(c => c.id.toString() === selectedCategory)?.name}
                  <button
                    onClick={() => onCategoryChange(null)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}
              {selectedStyle && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800 text-xs px-2 py-1">
                  {styles.find(s => s.id.toString() === selectedStyle)?.title}
                  <button
                    onClick={() => onStyleChange(null)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}
           
              {selectedArea && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800 text-xs px-2 py-1">
                  {areas.find(a => a.id.toString() === selectedArea)?.title}
                  <button
                    onClick={() => onAreaChange(null)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}
              {selectedTipo && (
                <Badge variant="outline" className="bg-white dark:bg-gray-800 text-xs px-2 py-1">
                  {tipos.find(t => t.id.toString() === selectedTipo)?.title}
                  <button
                    onClick={() => onTipoChange(null)}
                    className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenido de filtros */}
      <AnimatePresence>
        {(isExpanded || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 lg:p-4 space-y-4 lg:space-y-6"
          >
            {filterSections.map((section) => {
              const filteredItems = getFilteredItems(section);
              const isExpanded = expandedSections[section.id];
              
              return (
                <div key={section.id} className="space-y-3">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        {/* Barra de búsqueda para secciones con muchos elementos */}
                        {section.items.length > 5 && (
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                            <Input
                              placeholder={section.searchPlaceholder}
                              value={searchTerms[section.id as keyof typeof searchTerms] || ''}
                              onChange={(e) => updateSearchTerm(section.id, e.target.value)}
                              className="pl-8 h-8 text-xs lg:text-sm"
                            />
                          </div>
                        )}
                        
                        {/* Botón "Todos" */}
                        <Button
                          onClick={() => section.onChange(null)}
                          variant={!section.selectedValue ? "default" : "outline"}
                          size="sm"
                          className="w-full justify-start text-xs lg:text-sm h-8 lg:h-9"
                        >
                          Todos
                        </Button>
                        
                        {/* Lista de opciones */}
                        <div className="space-y-1 max-h-40 lg:max-h-48 overflow-y-auto">
                          {filteredItems.map((item) => (
                            <Button
                              key={item.id}
                              onClick={() => section.onChange(item.id)}
                              variant={section.selectedValue === item.id.toString() ? "default" : "outline"}
                              size="sm"
                              className="w-full justify-start text-xs lg:text-sm h-8 lg:h-9 transition-all duration-200 hover:scale-[1.01] lg:hover:scale-[1.02]"
                            >
                              <span className="truncate">{getDisplayName(item)}</span>
                            </Button>
                          ))}
                        </div>
                        
                        {filteredItems.length === 0 && searchTerms[section.id as keyof typeof searchTerms] && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                            No se encontraron resultados
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};