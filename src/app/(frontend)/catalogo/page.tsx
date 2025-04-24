import React, { Suspense } from 'react';
import { getProducts } from '../components/getProducts';
import CatalogClient from './components/catalog-client';
import { getCategories } from '../components/getCategories';
import { getStyles } from './components/getStyles';
import type { Product, Category, Style } from '@/payload-types';
import { getUser } from '../(authenticated)/actions/getUser';

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
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center my-10">Catálogo de Productos</h1>
      <Suspense fallback={<div>Cargando...</div>}>
        <CatalogClient 
          initialProducts={products} 
          initialCategories={categories} 
          initialStyles={styles}
          initialFavorites={favoriteIds}
          initialCart={cartIds} // Pasar initialCart
        />
      </Suspense>
    </main>
  );
}
