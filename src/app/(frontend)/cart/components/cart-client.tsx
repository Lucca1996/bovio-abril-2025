'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatPrice } from '@/app/(frontend)/lib/formatPrice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Minus, ArrowLeft, Shield, Truck, CreditCard, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/useCartStore'
import Image from 'next/image'

export const CartClient: React.FC = () => {
  const [coupon, setCoupon] = useState('')
  const [isValidCoupon, setIsValidCoupon] = useState(false)
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  const handleQuantityChange = (productId: string, increment: boolean) => {
    const currentItem = items.find(item => item.id === productId)
    if (currentItem) {
      const newQuantity = increment ? currentItem.quantity + 1 : Math.max(1, currentItem.quantity - 1)
      updateQuantity(productId, newQuantity)
    }
  }

  const handleRemoveItem = (productId: string) => {
    removeItem(productId)
    toast.success('Producto eliminado del carrito')
  }

  const validateCoupon = () => {
    setIsValidCoupon(coupon.length > 0)
    toast.success('Cupón aplicado correctamente')
  }

  const calculateSubtotal = () => {
    return getTotalPrice()
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = isValidCoupon ? subtotal * 0.1 : 0
    const shipping = subtotal > 1000 ? 0 : 50
    return subtotal - discount + shipping
  }



  const generateWhatsAppMessage = () => {
    let message = 'Hola, estoy interesado en los siguientes productos:\n\n'
    
    items.forEach((item) => {
      message += `• ${item.name} - Cantidad: ${item.quantity} - Precio: ${formatPrice(item.price * item.quantity)}\n`
    })
    
    message += `\nSubtotal: ${formatPrice(calculateSubtotal())}`
    
    if (isValidCoupon) {
      message += `\nDescuento (10%): -${formatPrice(calculateSubtotal() * 0.1)}`
    }
    
    message += `\nEnvío: ${calculateSubtotal() > 1000 ? 'Gratis' : formatPrice(50)}`
    message += `\nTotal: ${formatPrice(calculateTotal())}`
    
    return encodeURIComponent(message)
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
            <h1 className="text-2xl font-bold">Tu carrito ({items.length} items)</h1>
          </div>

          <AnimatePresence>
            {items.length === 0 ? (
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
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex gap-4"
                  >
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, false)}
                          className="h-8 w-8"
                        >
                          <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(item.id, true)}
                          className="h-8 w-8"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
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

              <Button 
                size="lg" 
                className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                onClick={() => {
                  if (items.length > 0) {
                    window.open(`https://wa.me/5493816237710?text=${generateWhatsAppMessage()}`, '_blank')
                  } else {
                    toast.error('Tu carrito está vacío')
                  }
                }}
                disabled={items.length === 0}
              >
                <MessageSquare size={20} />
                Consultar por WhatsApp
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