import { useState } from "react"
import { IconButton } from "../../../components/icon-button"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "../../../lib/formatPrice"
import { ProductType } from "../../../types/product"
import { Heart, ShoppingCart } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
// Aquí importamos el tipo 'ProductInCart'

export type InfoProductProps = {
    product: ProductType
}

export const InfoProduct = (props: InfoProductProps) => {
    const { product } = props

    // Estado para manejar la cantidad seleccionada
    const [quantity, setQuantity] = useState(1)

    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (value: string) => {
        setQuantity(Number(value)) // Convertimos el valor a número
    }

    // Calcular el precio total basado en la cantidad
    const totalPrice = product.price * quantity

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
            <div className="flex">
                <Select value={String(quantity)} onValueChange={handleQuantityChange}>
                    <SelectTrigger className="w-16 self-center mr-5">
                        <SelectValue placeholder="1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cantidad</SelectLabel>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p className="my-4 text-2xl">{formatPrice(totalPrice)}</p> {/* Mostrar el precio total */}
            </div>
            <div className="flex items-center gap-5">
                <Button className="w-full" onClick={() => ({ ...product, quantity })}>Comprar</Button>
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
