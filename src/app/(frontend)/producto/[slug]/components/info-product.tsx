import { IconButton } from "../../../components/icon-button"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "../../../lib/formatPrice"
import { ProductType } from "../../../types/product"
import { Heart, ShoppingCart } from "lucide-react"
// Ya no necesitamos los componentes de Select

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
// Aquí importamos el tipo 'ProductInCart'

export type InfoProductProps = {
    product: ProductType
}

export const InfoProduct = (props: InfoProductProps) => {
    const { product } = props

    // Ya no necesitamos manejar la cantidad aquí, se hará desde el carrito
    // El precio ahora es simplemente el precio del producto
    const productPrice = product.price

    return (
        <div className="px-6">
            <div className="justify-between mb-3 sm:flex">
                <h1 className="text-2xl">{product.title}</h1>
                <div className="flex items-center justify-between gap-3">
                    <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{product.style.title}</p>
                    <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{product.category.name}</p>
                </div>
            </div>
            <Separator className="my-4" />
            <p>{product.description}</p>
            <Separator className="my-4" />
            <div className="flex items-center space-x-2">
                <p className="text-gray-600 text-sm">Madera:</p>
                <Label htmlFor="airplane-mode">Pino</Label>
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Caoba</Label>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <ShoppingCart size={18} className="text-primary" />
                        <h3 className="font-medium">Información importante</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Las cantidades pueden ser ajustadas desde el carrito de compras. Los tiempos de producción están sujetos al stock disponible de cada producto.
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="font-medium">Precio:</span>
                    <p className="text-2xl font-semibold">{formatPrice(productPrice)}</p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => ({ ...product })}>Comprar</Button>
                <IconButton
                    onClick={console.log}
                    icon={<ShoppingCart size={20} className={` ${ 'fill-black dark:fill-white'}`} />}
                    className="text-gray-600"
                />
                <IconButton
                    onClick={console.log}
                    icon={<Heart size={20} className={` ${'fill-black dark:fill-white'}`} />}
                    className="text-gray-600"
                />
            </div>
        </div>
    )
}
