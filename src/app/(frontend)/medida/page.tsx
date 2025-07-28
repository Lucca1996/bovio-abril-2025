"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import Image from 'next/image'

type CarouselItemData = {
    id: number;
    title: string;
    link: string;
};

const dataCarouselTop: CarouselItemData[] = [
    {
        id: 1,
        title: "Envios a domicilio",
        link: "https://media.admagazine.com/photos/618a5fe3517556595755629d/master/w_1600%2Cc_limit/88711.jpg",
    },
    {
        id: 2,
        title: "Soluciones personalizadas",
        link: "https://media.revistaad.es/photos/65c3640a8218e9afce81024e/16:9/w_1280,c_limit/02_Destudio_CasaChaflan_ParedPalilleria.jpg",
    },
    {
        id: 3,
        title: "Experiencia comprobable",
        link: "https://png.pngtree.com/background/20230613/original/pngtree-large-bathroom-with-wooden-cabinets-and-two-sinks-picture-image_3426981.jpg",
    },
    {
        id: 4,
        title: "Novedades",
        link: "https://media.revistaad.es/photos/63ad310fd51201b6f36b0fb1/16:9/w_4496,h_2529,c_limit/Marta%20Labrador-Proyecto-El%20refugio%20de%20una%20artista-dormitorio%20principal-1-FOTO%20%C2%A9Alejandro%20Cayetano.jpg",
    },
];

export default function Page() {
   

    return (
        <>
            <section className="bg-white dark:bg-gray-900" id="about">
                {/* Encabezado */}
                <div className="max-w-screen-xl mx-auto mt-20 mb-8 p-4">
                    <div className="mb-6 max-w-3xl text-center mx-auto">
                        <h1 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                            A tu medida
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Diseñamos y fabricamos soluciones personalizadas para cada espacio
                        </p>
                    </div>
                </div>

                {/* Primera sección con texto e imagen */}
                <div className="max-w-6xl py-4 mx-auto sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-2/3">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                Bovio SAS es una carpintería especializada en ofrecer soluciones personalizadas para proyectos empresariales y clientes particulares. Desde nuestra apertura, nos hemos comprometido con la calidad, la creatividad y la atención a medida para transformar espacios y necesidades con madera de la más alta calidad.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3 flex justify-center">
                            <Image
                                src="https://img.freepik.com/fotos-premium/carpintero-trabajando-maquinas-carpinteria-carpinteria-hombre-trabaja-casa_1037926-3.jpg"
                                alt="Carpintero trabajando"
                                width={270}
                                height={270}
                                className="transition duration-300 ease-in-out rounded-full hover:scale-110 shadow-lg"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Carrusel de imágenes */}
                <div className="bg-gray-100 dark:bg-gray-800 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                            Nuestros proyectos a medida
                        </h2>
                        <Carousel className="w-full mx-auto">
                            <CarouselContent>
                                {dataCarouselTop.map(({ id, title, link }) => (
                                    <CarouselItem key={id} className="cursor-pointer">
                                        <Card className="shadow-lg border-none overflow-hidden">
                                            <div className="relative">
                                                <Image
                                                    src={link}
                                                    alt={title}
                                                    width={1920}
                                                    height={640}
                                                    className="sm:h-[40rem] w-full object-cover"
                                                    priority
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                                                    <h3 className="text-white text-lg sm:text-xl font-semibold">{title}</h3>
                                                </div>
                                            </div>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className="flex justify-center mt-4">
                                <CarouselPrevious className="mr-2" />
                                <CarouselNext className="ml-2" />
                            </div>
                        </Carousel>
                    </div>
                </div>

                {/* Segunda sección con imagen y texto */}
                <div className="max-w-6xl py-12 mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold text-primary uppercase">
                            Soluciones a medida, para cada espacio y necesidad
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/3 flex justify-center order-2 md:order-1">
                            <Image
                                src="https://alumacscm.es/wp-content/uploads/2024/04/servicios-carpinteria-de-aluminio.jpg"
                                alt="Servicios de carpintería"
                                width={270}
                                height={270}
                                className="transition duration-300 ease-in-out rounded-full hover:scale-110 shadow-lg"
                                priority
                            />
                        </div>
                        <div className="w-full md:w-2/3 order-1 md:order-2">
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                Ofrecemos una amplia gama de servicios: desde muebles a medida para hogares y oficinas hasta soluciones empresariales que incluyen diseño y fabricación de mobiliario corporativo. Ya sea que necesites un producto estándar de nuestro catálogo o un diseño personalizado, nuestro equipo está listo para hacer realidad tus ideas con la mejor calidad.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección de formulario de contacto */}
                <div className="bg-gray-100 dark:bg-gray-800 py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-primary uppercase mb-4">
                                ¿Tienes un proyecto en mente?
                            </h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                Te invitamos a ponerte en contacto con nosotros para crear juntos el proyecto perfecto. ¡Estaremos encantados de ayudarte!
                            </p>
                        </div>
                        
                     
                        
                        <div className="text-center mt-12">
                           
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link 
                                    href="/contacto" 
                                    className={buttonVariants({
                                        variant: "outline",
                                        className: "border-primary text-primary hover:bg-primary/10"
                                    })}
                                >
                                    Ir a contacto
                                </Link>
                                <Link 
                                    href="tel: 3816664927" 
                                    className={buttonVariants({
                                        variant: "ghost",
                                        className: "text-gray-700 dark:text-gray-300"
                                    })}
                                >
                                    Llamar ahora
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}