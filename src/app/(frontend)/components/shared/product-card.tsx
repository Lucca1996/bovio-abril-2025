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

  // Eliminar esta función que no se está utilizando correctamente
  // const getImageUrl = (image: string | { filename: string }) => {
  //   if (typeof image === 'string') {
  //     return image
  //   }
  //   return `${image}`
  // }

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
    <Card className="py-4 border border-gray-200 shadow-none hover:shadow-md transition-shadow duration-200">
      <CardContent className="relative flex items-center justify-center px-4 sm:px-6 py-2 h-[15rem] sm:h-[25rem]">
        <Image
          src={gallery && gallery[0] && gallery[0].image ? getImageUrl(gallery[0].image) : ''}
          alt={gallery && gallery[0] ? gallery[0].alt : title}
          className="h-full w-full object-cover rounded-lg"
          width={500}
          height={500}
          unoptimized
          priority
        />
        <div className="absolute w-full px-4 sm:px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
          <div className="flex justify-center gap-x-4 sm:gap-x-6">
            <IconButton
              onClick={() => router.push(`producto/${slug}`)}
              icon={<Expand size={20} />}
              className="text-gray-600 hover:text-primary"
            />
            <IconButton
              onClick={handleCartClick}
              icon={<ShoppingCart size={20} fill={isCart ? 'currentColor' : 'none'} />}
              className={`text-gray-600 hover:text-primary ${isCart ? 'text-black' : ''}`}
            />
            <IconButton
              onClick={handleFavoriteClick}
              icon={<Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />}
              className={`text-gray-600 hover:text-primary ${isFavorite ? 'text-red-500' : ''}`}
            />
          </div>
        </div>
      </CardContent>
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 px-4 sm:px-8">
        <div className="text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold">{title}</h3>
          <p className="text-lg font-bold text-green-900 dark:text-green-300">
            {formatPrice(price)}
          </p>
        </div>
        <div className="flex justify-center sm:justify-end">
          <ProductSticker style={style.title} category={category.name} />
        </div>
      </div>
    </Card>
  )
}
