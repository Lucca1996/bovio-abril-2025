"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Percent } from "lucide-react"

export const BannerThree = () => {
    // Usar Intersection Observer para detectar cuando el componente está en el viewport
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <section 
            ref={ref}
            className="p-5 sm:p-20 text-center relative overflow-hidden content-visibility-auto"
            aria-labelledby="promo-heading"
        >
            {/* Fondo con gradiente neumórfico */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 opacity-50 -z-10"
                aria-hidden="true"
            ></div>
            
            {/* Círculos decorativos con animación */}
            <div 
                className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 transition-transform duration-1000 ease-out ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                style={{
                    transitionDelay: '300ms',
                    willChange: 'transform, opacity'
                }}
                aria-hidden="true"
            ></div>
            <div 
                className={`absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary/10 transition-transform duration-1000 ease-out ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                style={{
                    transitionDelay: '500ms',
                    willChange: 'transform, opacity'
                }}
                aria-hidden="true"
            ></div>
            
            {/* Contenido con animaciones */}
            <div className="relative z-10 neumorph p-8 rounded-2xl max-w-2xl mx-auto transform transition-all duration-700 ease-out will-change-transform">
                <div className="flex items-center justify-center mb-4">
                    <div className={`bg-primary/20 p-3 rounded-full transition-all duration-700 ${inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`}
                        style={{ transitionDelay: '100ms' }}>
                        <Percent size={32} className="text-primary" />
                    </div>
                </div>
                
                <h2 
                    id="promo-heading"
                    className={`uppercase font-black text-xl sm:text-2xl md:text-3xl text-primary mb-3 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    Consigue hasta un -25%
                </h2>
                
                <h3 
                    className={`text-lg sm:text-xl mb-6 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}
                >
                    -25% en tu próximo producto al gastar $ 350.000
                </h3>
                
                <div 
                    className={`max-w-md mx-auto sm:flex justify-center gap-8 mt-5 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '600ms' }}
                >
                    <Link 
                        href="/catalogo" 
                        className={`${buttonVariants()} relative overflow-hidden group transform hover:scale-105 transition-all duration-300`}
                    >
                        <span className="relative z-10">Comprar</span>
                        <span 
                            className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"
                        ></span>
                    </Link>
                    
                    <Link 
                        href="/about" 
                        className={`${buttonVariants({ variant: "outline" })} mt-4 sm:mt-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300`}
                    >
                        Más información
                    </Link>
                </div>
            </div>
        </section>
    )
}
