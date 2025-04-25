import React from "react";
import { HeroSection } from './components/hero-section';
import { getCategories } from "./components/getCategories";
import { getProducts } from "./components/getProducts";
import { getUser } from "./(authenticated)/actions/getUser";
import { Metadata } from "next";
import { CallToAction } from './components/call-to-action';
import { NewsCarousel } from "./components/news-carousel";
import { FeatureGrid } from "./components/feature-grid";
import { BannerThree } from "./components/banner-three";
import { Equipamento } from "./components/equipamento";

// Metadatos para SEO
export const metadata: Metadata = {
  title: 'Bovio SAS - Carpintería de Calidad',
  description: 'Soluciones de carpintería personalizadas para hogares y empresas. Diseño, calidad y servicio excepcional.',
}

export default async function HomePage() {
  const categories = await getCategories();
  const products = await getProducts();
  const user = await getUser();
  
  const favoriteIds = user?.favorites?.map(fav => 
    typeof fav === 'number' ? fav : fav.id
  ) || [];
  const cartIds = user?.cart?.map(car => 
    typeof car === 'number' ? car : car.id
  ) || [];

  return <main className="min-h-screen overflow-x-hidden">
 
      <HeroSection />
      
      {/* Grid de características con flip-cards */}
      <FeatureGrid categories={categories} />
        <NewsCarousel products={products} initialFavorites={favoriteIds} initialCart={cartIds} />
        <BannerThree />
        <Equipamento />
        {/* Llamado a acción con animación de morphing */}
        <CallToAction />
  </main>
}
