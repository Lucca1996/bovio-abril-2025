"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Gift, Instagram } from "lucide-react"
import Image from "next/image"

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
            <div className="relative z-10 neumorph p-8 rounded-2xl max-w-4xl mx-auto transform transition-all duration-700 ease-out will-change-transform">
                <div className="flex items-center justify-center mb-6">
                    <div className={`bg-primary/20 p-3 rounded-full transition-all duration-700 ${inView ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-90'}`}
                        style={{ transitionDelay: '100ms' }}>
                        <Gift size={32} className="text-primary" />
                    </div>
                </div>
                
                <h2 
                    id="promo-heading"
                    className={`uppercase font-black text-xl sm:text-2xl md:text-3xl text-primary mb-3 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '200ms' }}
                >
                    🎉 Sorteo Semanal en Instagram
                </h2>
                
                <h3 
                    className={`text-lg sm:text-xl mb-8 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '400ms' }}
                >
                    Cada semana sorteamos productos únicos de carpintería
                </h3>
                
                {/* Productos del sorteo */}
                <div 
                    className={`flex flex-col sm:flex-row items-center justify-center gap-8 mb-8 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '500ms' }}
                >
                    <div className="flex flex-col items-center group">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            <Image 
                                src="https://i.pinimg.com/originals/c8/8b/28/c88b288f7a84765c42dee38e83bfc7cc.jpg" 
                                alt="Prensa de madera artesanal" 
                                width={120} 
                                height={120}
                                className="w-32 h-32"

                            />
                        </div>
                        <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-300">Mesitas de mate</p>
                    </div>
                    
                    <div className="flex flex-col items-center group">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                            <Image 
                                src="https://http2.mlstatic.com/D_NQ_NP_831727-MLA44764991425_012021-O.webp" 
                                alt="Macetas de madera" 
                                width={120} 
                                height={120}
                                className="w-32 h-32"
                            />
                        </div>
                        <p className="text-sm mt-2 font-medium text-gray-600 dark:text-gray-300">Macetas de Madera</p>
                    </div>
                </div>
                
                <div 
                    className={`max-w-md mx-auto sm:flex justify-center gap-6 mt-6 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '700ms' }}
                >
                    <Link 
                        href="https://www.instagram.com/bovio.sas/" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${buttonVariants()} relative overflow-hidden group transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
                    >
                        <Instagram size={20} />
                        <span className="relative z-10">Seguir en Instagram</span>
                        <span 
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            aria-hidden="true"
                        ></span>
                    </Link>
                    
                </div>
                
                <p 
                    className={`text-sm text-gray-500 dark:text-gray-400 mt-6 transition-all duration-700 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    style={{ transitionDelay: '800ms' }}
                >
                    ¡Síguenos para participar en el próximo sorteo!
                </p>
            </div>
        </section>
    )
}
