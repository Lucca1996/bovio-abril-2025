'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '@/payload-types'
import { formatPrice } from '@/app/(frontend)/lib/formatPrice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Minus, ArrowLeft, Shield, Truck, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { toggleCart } from '@/app/(frontend)/actions/cartActions'
import { useCartStore } from '@/store/useCartStore'
import { Media } from '@/types/media'
import { getImageUrl } from '@/app/(frontend)/lib/getImageUrl'
import Image from 'next/image'
import { getUser } from '@/app/(frontend)/(authenticated)/actions/getUser'

interface CartClientProps {
  initialCart: Product[]
  cartIds?: number[]
}

export const CartClient: React.FC<CartClientProps> = ({ initialCart, cartIds = [] }) => {
  const [cart, setCart] = useState<Product[]>(initialCart)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [coupon, setCoupon] = useState('')
  const [isValidCoupon, setIsValidCoupon] = useState(false)
  const router = useRouter()
  const { updateCartCount, cartCount } = useCartStore()
 
  useEffect(() => {
    // Inicializar cantidades
    const initialQuantities = initialCart.reduce(
      (acc, product) => {
        acc[product.id] = 1
        return acc
      },
      {} as Record<number, number>,
    )
    setQuantities(initialQuantities)
  }, [initialCart])

  // Efecto para actualizar el carrito cuando cambian los cartIds
  useEffect(() => {
    // Filtrar los productos del carrito basado en los cartIds actualizados
    const updatedCart = initialCart.filter(product => cartIds.includes(product.id))
    setCart(updatedCart)
  }, [cartIds, initialCart])

  // Efecto para actualizar el carrito cuando cambia el contador global
  useEffect(() => {
    const refreshCart = async () => {
      try {
        // Obtener los datos actualizados del usuario (incluido el carrito)
        const userData = await getUser()
        
        if (userData && userData.cart) {
          // Filtrar solo los productos completos (no IDs)
          const cartProducts = userData.cart.filter((item): item is Product => 
            typeof item !== 'number' && item !== null
          )
          
          setCart(cartProducts)
          
          // Actualizar cantidades para los nuevos productos
          const newQuantities = { ...quantities }
          cartProducts.forEach((product) => {
            if (!newQuantities[product.id]) {
              newQuantities[product.id] = 1
            }
          })
          setQuantities(newQuantities)
        }
      } catch (error) {
        console.error('Error al actualizar el carrito:', error)
      }
    }
    
    // Refrescar el carrito cuando cambie el contador global
    refreshCart()
    
    // También podemos refrescar el carrito cuando el componente se monte
    router.refresh()
    
  }, [cartCount, router, quantities])

  // Efecto para actualizar el carrito cuando se añade un nuevo producto
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const data = await response.json()
          if (data && data.products) {
            setCart(data.products)
            
            // Actualizar cantidades para los nuevos productos
            const newQuantities = { ...quantities }
            data.products.forEach((product: Product) => {
              if (!newQuantities[product.id]) {
                newQuantities[product.id] = 1
              }
            })
            setQuantities(newQuantities)
          }
        }
      } catch (error) {
        console.error('Error al obtener productos del carrito:', error)
      }
    }

    // Verificar si hay cambios en el contador del carrito
    fetchCartProducts()
  }, [cartCount, quantities])

  const handleQuantityChange = (productId: number, increment: boolean) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + (increment ? 1 : -1)),
    }))
  }

  const handleRemoveItem = async (productId: number) => {
    try {
      await toggleCart(productId)
      setCart((prev) => prev.filter((p) => p.id !== productId))
      updateCartCount(false)
      toast.success('Producto eliminado del carrito')
    } catch (_error) {
      // Renombrar 'error' a '_error' para indicar que no se usa
      toast.error('Error al eliminar el producto')
    }
  }

  const validateCoupon = () => {
    // Simulación de validación de cupón
    setIsValidCoupon(coupon.length > 0)
    toast.success('Cupón aplicado correctamente')
  }

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * (quantities[product.id] || 1)
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = isValidCoupon ? subtotal * 0.1 : 0 // 10% de descuento
    const shipping = subtotal > 1000 ? 0 : 50 // Envío gratis para compras mayores a $1000
    return subtotal - discount + shipping
  }

  const getProductImageUrl = (
    image: string | number | { filename: string } | Media | null | undefined,
  ): string => {
    if (!image) return ''
    if (typeof image === 'number') return ''
    if (typeof image === 'string') return getImageUrl(image)
    if ('filename' in image && image.filename) return getImageUrl(image.filename)
    return ''
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} />
              Continuar comprando
            </Button>
            <h1 className="text-2xl font-bold">Tu carrito ({cart.length} items)</h1>
          </div>

          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <Button onClick={() => router.push('/catalogo')}>Explorar productos</Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cart.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex gap-4"
                  >
                    <Image
                      src={product.gallery?.[0] ? getProductImageUrl(product.gallery[0].image) : ''}
                      alt={product.title}
                      width={96}
                      height={96}
                      className="object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.title}</h3>
                      <p className="text-primary font-bold">{formatPrice(product.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, false)}
                          className="h-8 w-8"
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center">{quantities[product.id] || 1}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(product.id, true)}
                          className="h-8 w-8"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X size={20} />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Resumen de compra */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Código de cupón"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={validateCoupon} disabled={!coupon}>
                  Aplicar
                </Button>
              </div>

              {isValidCoupon && (
                <div className="flex justify-between text-green-500">
                  <span>Descuento (10%)</span>
                  <span>-{formatPrice(calculateSubtotal() * 0.1)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Envío</span>
                <span>{calculateSubtotal() > 1000 ? 'Gratis' : formatPrice(50)}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>

              <Button size="lg" className="w-full" onClick={() => router.push('/checkout')}>
                Proceder al pago
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield size={16} />
                <span>Pago seguro</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Truck size={16} />
                <span>Envío en 24-48 horas</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CreditCard size={16} />
                <span>Múltiples métodos de pago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
