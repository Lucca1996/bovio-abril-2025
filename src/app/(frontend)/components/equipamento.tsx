"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { Building2, ArrowRight } from "lucide-react"

export const Equipamento = () => {
    // Usar Intersection Observer para detectar cuando el componente está en el viewport
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <section 
            ref={ref}
            className="max-w-6xl py-8 mx-auto sm:py-16 sm:px-8 relative overflow-hidden"
            aria-labelledby="equipamiento-heading"
        >
            {/* Fondo con gradiente sutil */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 opacity-50 -z-10 rounded-xl"
                aria-hidden="true"
            ></div>
            
            <div className="px-6">
                <div className="flex items-center gap-3 mb-2">
                    <Building2 className={`text-primary transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} />
                    <h3 className={`text-3xl font-bold transition-all duration-700 ${inView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                        Equipamiento empresarial
                    </h3>
                </div>
                
                <div className={`p-5 sm:p-10 text-center transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '200ms' }}>
                    <h2 id="equipamiento-heading" className="uppercase font-black text-xl text-primary">
                        En Bovio SAS pensamos en el futuro de tu negocio
                    </h2>
                </div>
                
                <div className={`transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}>
                    <div className="sm:flex items-center justify-between gap-8">
                        <div className="flex-1">
                            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                                Entendemos que cada negocio tiene necesidades únicas. Por eso, ofrecemos soluciones de carpintería personalizadas que se adaptan
                                perfectamente a los requerimientos de tu empresa. Desde mobiliario a medida hasta proyectos de gran escala, trabajamos estrechamente
                                contigo para crear espacios funcionales y estéticamente atractivos.
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-8">
                                Con un enfoque en la calidad, la durabilidad y el diseño innovador,
                                nos comprometemos a ser tu aliado para llevar el futuro de tu negocio al siguiente nivel. Confía en nosotros para transformar tus ideas en realidades tangibles.
                            </p>
                        </div>
                        
                        <div className="relative w-full sm:w-auto mx-auto mb-8 sm:mb-0 flex-shrink-0">
                            <div className="absolute inset-0 bg-primary/20 rounded-lg transform rotate-3 scale-105"></div>
                            <Image 
                                src="https://res.cloudinary.com/dncvxpgj1/image/upload/v1736386356/imagen-de-servicio-1.jpg"
                                alt="Servicio empresarial"
                                width={300}
                                height={300}
                                className="relative z-10 transition duration-500 ease-in-out rounded-lg hover:scale-105 shadow-lg object-cover"
                            />
                        </div>
                    </div>
                    
                    <div className={`max-w-md mx-auto flex flex-col sm:flex-row justify-center gap-4 mt-10 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                        style={{ transitionDelay: '600ms' }}>
                        <Link 
                            href="/catalogo" 
                            className={`${buttonVariants()} group flex items-center justify-center gap-2 hover:gap-3 transition-all duration-300`}
                        >
                            <span>Ver catálogo</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link 
                            href="/contacto" 
                            className={`${buttonVariants({ variant: "outline" })} hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300`}
                        >
                            Solicitar información
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
