"use client"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
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
        title: "Envio 24/48 h",
        link: "https://media.admagazine.com/photos/618a5fe3517556595755629d/master/w_1600%2Cc_limit/88711.jpg",
    },
    {
        id: 2,
        title: "Descuento en compras",
        link: "https://media.revistaad.es/photos/65c3640a8218e9afce81024e/16:9/w_1280,c_limit/02_Destudio_CasaChaflan_ParedPalilleria.jpg",
    },
    {
        id: 3,
        title: "Algunos tipos laburando",
        link: "https://png.pngtree.com/background/20230613/original/pngtree-large-bathroom-with-wooden-cabinets-and-two-sinks-picture-image_3426981.jpg",
    },
    {
        id: 4,
        title: "Comprar novedades",
        link: "https://media.revistaad.es/photos/63ad310fd51201b6f36b0fb1/16:9/w_4496,h_2529,c_limit/Marta%20Labrador-Proyecto-El%20refugio%20de%20una%20artista-dormitorio%20principal-1-FOTO%20%C2%A9Alejandro%20Cayetano.jpg",
    },
];



export default function Page() {
    return (
        <>
            <section className="" id="about">
                <div className="max-w-screen-xl flex-wrap items-end justify-between mx-auto mt-20 mb-11 p-4">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">

                            <h2 className="font-heading mb-4 font-bold tracking-tight  text-3xl sm:text-5xl">
                                A tu medida
                            </h2>
                        </div>
                    </div>
                    <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>

                        <div className="flex">
                            <div>

                                <p className="text-lg  text-gray-700 leading-relaxed mt-8 mb-8 px-4 md:px-8">Bovio SAS es una carpintería especializada en ofrecer soluciones personalizadas para proyectos empresariales y clientes particulares. Desde nuestra apertura, nos hemos comprometido con la calidad, la creatividad y la atención a medida para transformar espacios y necesidades con madera de la más alta calidad.
                                </p>

                            </div>
                            <Image
                                src="https://img.freepik.com/fotos-premium/carpintero-trabajando-maquinas-carpinteria-carpinteria-hombre-trabaja-casa_1037926-3.jpg"
                                alt="Carpintero trabajando"
                                width={270}
                                height={270}
                                className="transition duration-300 ease-in-out rounded-full hover:scale-110"
                                priority
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-200 dark:bg-primary">
                    <Carousel className="w-full mx-auto"
                        >
                        <CarouselContent>
                            {dataCarouselTop.map(({ id, title, link }) => (
                                <CarouselItem key={id} className="cursor-pointer">
                                    <Card className="shadow-none border-none bg-transparent">

                                        <Image
                                            src={link}
                                            alt={title}
                                            width={1920}
                                            height={640}
                                            className="sm:h-[40rem] w-full object-cover"
                                            priority
                                        />


                                    </Card>
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                    </Carousel>
                </div>

                <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
                    <div className="p-5 sm:p-20 text-center">
                        <h2 className="uppercase font-black text-xl text-primary">Soluciones a medida, para cada espacio y necesidad</h2>
                    </div>
                    <div className="flex">
                        <Image
                            src="https://alumacscm.es/wp-content/uploads/2024/04/servicios-carpinteria-de-aluminio.jpg"
                            alt="Servicios de carpintería"
                            width={270}
                            height={270}
                            className="transition duration-300 ease-in-out rounded-full hover:scale-110"
                            priority
                        />
                        <div>

                            <p className="text-lg text-gray-700 leading-relaxed mt-8 mb-8 px-4 md:px-8">Ofrecemos una amplia gama de servicios: desde muebles a medida para hogares y oficinas hasta soluciones empresariales que incluyen diseño y fabricación de mobiliario corporativo. Ya sea que necesites un producto estándar de nuestro catálogo o un diseño personalizado, nuestro equipo está listo para hacer realidad tus ideas con la mejor calidad.
                            </p>

                        </div>
                    </div>
                </div>
                <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
                    <div className="p-5 sm:p-20 text-center">
                        <h2 className="uppercase font-black text-xl text-primary">Te invitamos a ponerte en contacto con nosotros para crear juntos el proyecto perfecto. ¡Estaremos encantados de ayudarte!</h2>
                    </div>
                    <div className="flex">

                        <div className="max-w-md mx-auto sm:flex justify-center gap-8">
                            <Link href="#" className={buttonVariants()}>Contacto</Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}