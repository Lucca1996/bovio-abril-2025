"use client"
import { useRouter } from "next/navigation"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
    {
        id: 1,
        title: "Innovación y diseño a medida",
        link: "#",
    },
    {
        id: 2,
        title: "Compromiso con la calidad y el cliente",
        link: "#",
    },
    {
        id: 3,
        title: "Soluciones a medida, para cada espacio y necesidad",
        link: "#",
    },
    {
        id: 4,
        title: "Diseño y confort",
        link: "#",
    },
]

export const BannerTwo = () => {
    const router = useRouter()
    
    const plugin = Autoplay({ 
        delay: 4000, // Tiempo intermedio entre el banner one y el carousel principal
       
    })

    return (
        <div className="bg-gray-200 dark:bg-slate-800">
            <Carousel 
                className="w-full max-w-4xl mx-auto"
                plugins={[plugin]}
              
            >
                <CarouselContent>
                    {dataCarouselTop.map(({ id, title, link }) => (
                        <CarouselItem key={id} onClick={() => router.push(link)} className="cursor-pointer">
                            <Card className="shadow-none border-none bg-transparent">
                                <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                    <p className="sm:text-lg text-wrap dark:text-white">{title}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
