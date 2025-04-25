'use client'

import { IconButton } from '../icon-button'
import { ProductSticker } from './product-sticker'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Expand, Heart, ShoppingCart } from 'lucide-react'
import { ProductType } from '../../types/product'
import { formatPrice } from '../../lib/formatPrice'
import { useState, useEffect } from 'react'
import { toggleFavorite } from '../../actions/favoriteActions'
import { toggleCart } from '../../actions/cartActions'
import { toast } from 'sonner'
import { useFavoriteStore } from '@/store/useFavoriteStore'
import { useCartStore } from '@/store/useCartStore'
import Image from 'next/image'
import { getImageUrl } from '../../lib/getImageUrl'


interface ProductCardProps extends ProductType {
  onFavoriteRemoved?: () => void
  onCartRemoved?: () => void
  initialIsFavorite?: boolean
  initialIsCart?: boolean
}

interface AuthError {
  message: string;
}

export const ProductCard = (props: ProductCardProps) => {
  const {
    style,
    category,
    slug,
    title,
    gallery,
    price,
    id,
    onFavoriteRemoved,
    onCartRemoved,
    initialIsFavorite,
    initialIsCart,
  } = props
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite || false)
  const [isCart, setIsCart] = useState(initialIsCart || false)
  const { updateFavoritesCount } = useFavoriteStore()
  const { updateCartCount } = useCartStore()

  useEffect(() => {
    setIsFavorite(initialIsFavorite || false)
  }, [initialIsFavorite])

  useEffect(() => {
    setIsCart(initialIsCart || false)
  }, [initialIsCart])

  const handleFavoriteClick = async () => {
    try {
      const newFavoriteStatus = await toggleFavorite(id)
      setIsFavorite(newFavoriteStatus)
      updateFavoritesCount(newFavoriteStatus)

      if (!newFavoriteStatus && onFavoriteRemoved) {
        onFavoriteRemoved()
      }

      toast.success(
        newFavoriteStatus ? 'Producto añadido a favoritos' : 'Producto eliminado de favoritos',
      )
    } catch (error: unknown) {
      const err = error as AuthError;
      if (err.message === 'Usuario no autenticado') {
        toast.error('Debes iniciar sesión para guardar favoritos')
        router.push('/login')
      } else {
        toast.error('Error al modificar favoritos')
      }
    }
  }

  const handleCartClick = async () => {
    try {
      const newCartStatus = await toggleCart(id)
      setIsCart(newCartStatus)
      updateCartCount(newCartStatus)

      if (!newCartStatus && onCartRemoved) {
        onCartRemoved()
      }

      toast.success(
        newCartStatus ? 'Producto añadido al carrito' : 'Producto eliminado del carrito',
      )
    } catch (error: unknown) {
      const err = error as AuthError;
      if (err.message === 'Usuario no autenticado') {
        toast.error('Debes iniciar sesión para guardar un carrito')
        router.push('/login')
      } else {
        toast.error('Error al modificar carrito')
      }
    }
  }

  return (
    <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 bg-white dark:bg-gray-800 group">
      <CardContent className="p-0">
        {/* Imagen con lazy loading nativo */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={gallery && gallery[0] && gallery[0].image ? getImageUrl(gallery[0].image) : ''}
            alt={gallery && gallery[0] ? gallery[0].alt : title}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=="
          />
          
          {/* Overlay con botones de acción */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-3">
              <IconButton
                onClick={() => router.push(`/producto/${slug}`)}
                icon={<Expand size={20} />}
                className="bg-white text-gray-800 hover:bg-primary hover:text-white transition-colors duration-200 transform active:scale-95"
                aria-label="Ver detalles del producto"
              />
              <IconButton
                onClick={handleCartClick}
                icon={<ShoppingCart size={20} fill={isCart ? 'currentColor' : 'none'} />}
                className={`bg-white text-gray-800 hover:bg-primary hover:text-white transition-colors duration-200 transform active:scale-95 ${isCart ? 'text-primary' : ''}`}
                aria-label={isCart ? "Eliminar del carrito" : "Añadir al carrito"}
              />
              <IconButton
                onClick={handleFavoriteClick}
                icon={<Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />}
                className={`bg-white text-gray-800 hover:bg-primary hover:text-white transition-colors duration-200 transform active:scale-95 ${isFavorite ? 'text-red-500' : ''}`}
                aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
              />
            </div>
          </div>
        </div>
        
        {/* Información del producto */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium line-clamp-2 text-gray-900 dark:text-white">{title}</h3>
            <ProductSticker style={style.title} category={category.name} />
          </div>
          <p className="text-lg font-bold text-green-700 dark:text-green-400">
            {formatPrice(price)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
