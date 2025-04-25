import React, { Suspense } from 'react';
import { getProducts } from '../components/getProducts';
import CatalogClient from './components/catalog-client';
import { getCategories } from '../components/getCategories';
import { getStyles } from './components/getStyles';
import type { Product, Category, Style } from '@/payload-types';
import { getUser } from '../(authenticated)/actions/getUser';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  let products: Product[] | null = null;
  try {
    products = await getProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  const categories: Category[] = await getCategories();
  const styles: Style[] = await getStyles();
  const user = await getUser();
  
  // Obtener los IDs de favoritos
  const favoriteIds = user?.favorites?.map(fav => 
    typeof fav === 'number' ? fav : fav.id
  ) || [];

  // Obtener los IDs del carrito
  const cartIds = user?.cart?.map(car => 
    typeof car === 'number' ? car : car.id
  ) || [];

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Breadcrumb navigation - Mejora la navegación y SEO */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">Catálogo</span>
          </li>
        </ol>
      </nav>
      
      {/* Contenedor principal con animación de entrada */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10 text-gray-900 dark:text-white transition-colors duration-300">
          Catálogo de Productos
        </h1>
        
        {/* Suspense con skeleton loading mejorado */}
        <Suspense fallback={
          <div className="text-center py-10 space-y-4">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        }>
          <CatalogClient 
            initialProducts={products} 
            initialCategories={categories} 
            initialStyles={styles}
            initialFavorites={favoriteIds}
            initialCart={cartIds}
          />
        </Suspense>
      </section>
    </main>
  );
}
