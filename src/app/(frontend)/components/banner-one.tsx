"use client"
import { useRouter } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
    {
        id: 1,
        title: "Envio 24/48 h",
        description: "Como cliente VIP, tus envios en 24/48 horas. Obten mas informacion y unete.",
        link: "#",
    },
    {
        id: 2,
        title: "Descuento en compras",
        description: "20% de descuento en tu segunda compra superior a 50.000$.",
        link: "#",
    },
    {
        id: 3,
        title: "Devoluciones y entregas",
        description: "Tienes envios y devoluviones gratis en un plazo de una semana.",
        link: "#",
    },
    {
        id: 4,
        title: "Comprar novedades",
        description: "Todas las novedades al 50% de descuento.",
        link: "#",
    },
]

export const BannerOne = () => {
    const router = useRouter()
    
    const plugin = Autoplay({ 
        delay: 4000, // Un poco más rápido que el carousel principal
    })

    return (
        <div className="bg-gray-200 dark:bg-slate-800 mt-16">
            <Carousel 
                className="w-full max-w-4xl mx-auto"
                plugins={[plugin]}
               
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, description, link }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <Card className="shadow-none border-none bg-transparent">
                                <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                    <p className="font-semibold sm:text-lg dark:text-white">{title}</p>
                                    <p className="text-sm text-muted-foreground dark:text-gray-300">{description}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
