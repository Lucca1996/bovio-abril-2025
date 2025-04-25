'use client'

import type { Product, Category, Style } from '@/payload-types'
import { ProductCard } from '../../components/shared/product-card'
import { useState, useEffect } from 'react'
import { FiltersControlCategory } from './filters-control-category'
import { useRouter, useSearchParams } from 'next/navigation'
import { mapPayloadProductToProductType } from '../../utils/product-mapper'

interface CatalogClientProps {
  initialProducts: Product[] | null
  initialCategories: Category[]
  initialStyles: Style[]
  initialFavorites?: number[]
  initialCart?: number[]
}

const CatalogClient: React.FC<CatalogClientProps> = ({
  initialProducts,
  initialCategories,
  initialStyles,
  initialFavorites = [],
  initialCart = [],
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [categories] = useState<Category[]>(initialCategories)
  const [styles] = useState<Style[]>(initialStyles)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true)
      const category = searchParams.get('category')
      const style = searchParams.get('style')

      // Si no hay filtros, usar los productos iniciales
      if (!category && !style) {
        setProducts(initialProducts || [])
        setIsLoading(false)
        return
      }

      try {
        let url = '/api/products?depth=2'

        if (category) {
          url += `&where[category][equals]=${category}`
        }

        if (style) {
          url += `&where[style][equals]=${style}`
        }

        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Error al obtener los productos')
        }

        const data = await response.json()
        setProducts(data.docs || [])
      } catch (error) {
        console.error('Error fetching filtered products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilteredProducts()
  }, [searchParams, initialProducts])

  const handleCategoryChange = (categoryId: number | null) => {
    const currentStyle = searchParams.get('style')
    const params = new URLSearchParams()
    if (categoryId !== null) params.set('category', categoryId.toString())
    if (currentStyle) params.set('style', currentStyle)
    router.push(`/catalogo?${params.toString()}`)
  }

  const handleStyleChange = (styleId: number | null) => {
    const currentCategory = searchParams.get('category')
    const params = new URLSearchParams()
    if (currentCategory) params.set('category', currentCategory)
    if (styleId !== null) params.set('style', styleId.toString())
    router.push(`/catalogo?${params.toString()}`)
  }
  
  return (
    <div className="space-y-8">
      <FiltersControlCategory
        categories={categories}
        styles={styles}
        onCategoryChange={handleCategoryChange}
        onStyleChange={handleStyleChange}
        selectedCategory={searchParams.get('category')}
        selectedStyle={searchParams.get('style')}
      />
      
      {/* Resultados de productos */}
      <section aria-label="Productos" className="min-h-[300px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300 text-lg">No hay productos disponibles con los filtros seleccionados.</p>
            <button 
              onClick={() => {
                router.push('/catalogo')
              }}
              className="mt-4 text-primary hover:text-primary-dark transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <article 
                key={product.id} 
                className="group h-full transition-all duration-300 hover:z-10"
              >
                <ProductCard
                  {...mapPayloadProductToProductType(product)}
                  initialIsFavorite={initialFavorites.includes(product.id)}
                  initialIsCart={initialCart.includes(product.id)}
                />
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default CatalogClient
