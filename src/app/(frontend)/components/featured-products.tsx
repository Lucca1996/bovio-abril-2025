'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { SkeletonSchema } from './skeletonSchema'
import { ProductCard } from './shared/product-card'
import type { Product } from '@/payload-types' // Importamos el tipo correcto
import { mapPayloadProductToProductType } from '../utils/product-mapper'

interface Props {
  products: Product[]
  initialFavorites?: number[]
  initialCart?: number[] // Agregar initialCart
}

export const FeaturedProducts: React.FC<Props> = ({
  products,
  initialFavorites = [],
  initialCart = [],
}) => {
  return (
    <div className="max-w-6xl py-4 mx-auto sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos Destacados</h3>
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 group">
                <div className="p-1">
                  <ProductCard
                    {...mapPayloadProductToProductType(product)}
                    initialIsFavorite={initialFavorites.includes(product.id)}
                    initialIsCart={initialCart.includes(product.id)}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <SkeletonSchema grid={3} />
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  )
}
