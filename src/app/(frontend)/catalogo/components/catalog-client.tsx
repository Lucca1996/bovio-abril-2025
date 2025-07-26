'use client'

import type { Product, Category, Style, Uso, Area, Tipo } from '@/payload-types'
import { ProductCard } from '../../components/shared/product-card'
import { useState, useEffect } from 'react'
import { AdvancedFilters } from './advanced-filters'
import { useRouter, useSearchParams } from 'next/navigation'
import { mapPayloadProductToProductType } from '../../utils/product-mapper'

interface CatalogClientProps {
  initialProducts: Product[] | null
  initialUsos: Uso[]
  initialCategories: Category[]
  initialStyles: Style[]
  initialAreas: Area[]
  initialTipos: Tipo[]
  initialFavorites?: number[]
  initialCart?: number[]
}

const CatalogClient: React.FC<CatalogClientProps> = ({
  initialProducts,
  initialUsos,
  initialCategories,
  initialStyles,
  initialAreas,
  initialTipos,
  initialFavorites = [],
  initialCart = [],
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || [])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usos] = useState<Uso[]>(initialUsos)
  const [categories] = useState<Category[]>(initialCategories)
  const [styles] = useState<Style[]>(initialStyles)
  const [areas] = useState<Area[]>(initialAreas)
  const [tipos] = useState<Tipo[]>(initialTipos)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true)
      const uso = searchParams.get('uso')
      const category = searchParams.get('category')
      const style = searchParams.get('style')
      const area = searchParams.get('area')
      const tipo = searchParams.get('tipo')

      // Si no hay filtros, usar los productos iniciales
      if (!category && !style && !uso && !area && !tipo) {
        setProducts(initialProducts || [])
        setIsLoading(false)
        return
      }

      try {
        let url = '/api/products?depth=2'
        if (uso) {
          url += `&where[uso][equals]=${uso}`
        }
        if (category) {
          url += `&where[category][equals]=${category}`
        }

        if (style) {
          url += `&where[style][equals]=${style}`
        }

        if (area) {
          url += `&where[area][equals]=${area}`
        }

        if (tipo) {
          url += `&where[tipo][equals]=${tipo}`
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

  const updateFilters = (filterType: string, value: number | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (value !== null) {
      params.set(filterType, value.toString())
    } else {
      params.delete(filterType)
    }
    
    router.push(`/catalogo?${params.toString()}`)
  }

  const handleUsoChange = (usoId: number | null) => {
    updateFilters('uso', usoId)
  }
  const handleCategoryChange = (categoryId: number | null) => {
    updateFilters('category', categoryId)
  }

  const handleStyleChange = (styleId: number | null) => {
    updateFilters('style', styleId)
  }


  const handleAreaChange = (areaId: number | null) => {
    updateFilters('area', areaId)
  }

  const handleTipoChange = (tipoId: number | null) => {
    updateFilters('tipo', tipoId)
  }

  const handleClearAllFilters = () => {
    router.push('/catalogo')
  }
  
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Sidebar de filtros - Izquierda */}
      <aside className="w-full lg:w-80 lg:flex-shrink-0">
        <div className="lg:sticky lg:top-6">
          <AdvancedFilters
            usos={usos}
            categories={categories}
            styles={styles}
            areas={areas}
            tipos={tipos}
            onUsoChange={handleUsoChange}
            onCategoryChange={handleCategoryChange}
            onStyleChange={handleStyleChange}
            onAreaChange={handleAreaChange}
            onTipoChange={handleTipoChange}
            selectedUso={searchParams.get('uso')}
            selectedCategory={searchParams.get('category')}
            selectedStyle={searchParams.get('style')}
            selectedArea={searchParams.get('area')}
            selectedTipo={searchParams.get('tipo')}
            onClearAllFilters={handleClearAllFilters}
          />
        </div>
      </aside>
      
      {/* Contenido principal de productos - Derecha */}
      <main className="flex-1 min-w-0">
        <section aria-label="Productos" className="min-h-[300px]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2   gap-4 md:gap-6">
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
      </main>
    </div>
  )
}

export default CatalogClient
