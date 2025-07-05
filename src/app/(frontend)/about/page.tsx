import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Sobre Bovio SAS | Carpintería especializada y soluciones a medida",
  description: "Descubre la historia, valores y equipo detrás de Bovio SAS. Ofrecemos soluciones personalizadas en carpintería con los más altos estándares de calidad desde 2010.",
  keywords: "carpintería especializada, muebles a medida, diseño de interiores, mobiliario corporativo, artesanos calificados, madera de calidad",
}

export default function Page() {
    return (
        <>
            <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 mt-28" id="about">
                <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    {/* Header con animación sutil */}
                    <div className="mb-16 text-center animate-fade-in-down">
                        <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
                            Desde 2020
                        </span>
                        <h1 className="font-heading mb-4 font-bold tracking-tight text-4xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
                            Nuestra Historia
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
                            Transformando ideas en espacios únicos con pasión artesanal y visión innovadora
                        </p>
                    </div>

                    {/* Sección de Misión y Visión con tarjetas de glassmorphism */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Misión</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Transformar espacios a través de soluciones en madera que combinen funcionalidad, estética y sostenibilidad, superando las expectativas de nuestros clientes con un servicio personalizado y de excelencia.
                            </p>
                        </div>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <h3 className="text-2xl font-bold text-primary mb-4">Nuestra Visión</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Ser referentes en la industria de la carpintería especializada, reconocidos por nuestra innovación, calidad superior y compromiso con la satisfacción del cliente y la sostenibilidad ambiental.
                            </p>
                        </div>
                    </div>

                    {/* Línea de tiempo de la empresa */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestra Trayectoria</h2>
                        <div className="relative">
                            {/* Línea vertical */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 dark:bg-primary/30"></div>
                            
                            {/* Eventos de la línea de tiempo */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:text-right md:pr-12 relative group">
                                    <div className="absolute right-0 md:right-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform">2020</div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">Fundación</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Iniciamos operaciones con un pequeño taller y grandes sueños.</p>
                                    </div>
                                </div>
                                
                                <div className="md:pl-12 relative group mt-8 md:mt-24">
                                    <div className="absolute left-0 md:left-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform">2021</div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">Expansión</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Ampliamos nuestras instalaciones y equipo para atender proyectos más ambiciosos.</p>
                                    </div>
                                </div>
                                
                                <div className="md:text-right md:pr-12 relative group mt-8 md:mt-0">
                                    <div className="absolute right-0 md:right-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform">2022</div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">Innovación</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Incorporamos tecnología de punta y procesos sostenibles en nuestra producción.</p>
                                    </div>
                                </div>
                                
                                <div className="md:pl-12 relative group mt-8 md:mt-24">
                                    <div className="absolute left-0 md:left-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform">2025</div>
                                    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-xl font-bold mb-2 dark:text-white">Presente</h3>
                                        <p className="text-gray-700 dark:text-gray-300">Consolidados como referentes en soluciones de carpintería especializada con presencia nacional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Valores con iconos */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestros Valores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Excelencia</h3>
                                <p className="text-gray-700 dark:text-gray-300">Nos esforzamos por superar expectativas en cada proyecto, con atención meticulosa a los detalles.</p>
                            </div>
                            
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Innovación</h3>
                                <p className="text-gray-700 dark:text-gray-300">Buscamos constantemente nuevas técnicas y soluciones para crear diseños únicos y funcionales.</p>
                            </div>
                            
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">Compromiso</h3>
                                <p className="text-gray-700 dark:text-gray-300">Nos dedicamos a cumplir nuestras promesas, respetando &ldquo;plazos y especificaciones&rdquo; acordadas.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Equipo con tarjetas interactivas */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestro Equipo</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="group">
                                <div className="relative overflow-hidden rounded-xl">
                                    <Image 
                                        src="https://scontent.ftuc4-2.fna.fbcdn.net/v/t39.30808-6/324737531_722802015883925_1591074182124347838_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGqIHZ4Xd80ButvFnODTynzDtd4L4yTTj4O13gvjJNOPvWN6DJ3ATix-2Lkim76y0I&_nc_ohc=o3ELwRh4ojIQ7kNvwG9RqqB&_nc_oc=AdmASpBHEwOOVNvo6ygj41nVSqB1SYfFj_1LrcINBmkpfqpuhcyBxoaNPG8b_pdcz-G-poL6yk-6uDb_BJdYD8qw&_nc_zt=23&_nc_ht=scontent.ftuc4-2.fna&_nc_gid=ROOwGnKUqAasLDVFPUd7BQ&oh=00_AfFeP2cHEJ2asdje9VPr9RwZqFSvEuBHI7oA6EKEvyKdRg&oe=681073EE" 
                                        alt="Director de Bovio SAS" 
                                        width={400} 
                                        height={400}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-xl font-bold text-white">Yamil Bovio</h3>
                                        <p className="text-white/80">Director General</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="relative overflow-hidden rounded-xl">
                                    <Image 
                                        src="https://d28pk2nlhhgcne.cloudfront.net/assets/app/uploads/sites/3/2023/01/become-furniture-designer-homebyme-720x405.png" 
                                        alt="Diseñadora de Bovio SAS" 
                                        width={400} 
                                        height={400}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-xl font-bold text-white">Diego Aguilera</h3>
                                        <p className="text-white/80">Diseñador Principal</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="group">
                                <div className="relative overflow-hidden rounded-xl">
                                    <Image 
                                        src="https://maderia.es/wp-content/uploads/2024/04/cual-es-la-diferencia-entre-un-carpintero-de-primera-y-un-carpintero-de-segunda.jpg" 
                                        alt="Maestro Carpintero de Bovio SAS" 
                                        width={400} 
                                        height={400}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                        <h3 className="text-xl font-bold text-white">Martín Rojas</h3>
                                        <p className="text-white/80">Maestro Carpintero</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Métricas con animación en scroll */}
                    <div className="mb-20 py-16 bg-primary/5 dark:bg-primary/10 rounded-3xl">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestro Impacto</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">+15</div>
                                <p className="text-gray-700 dark:text-gray-300">Años de experiencia</p>
                            </div>
                            
                            <div className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">+500</div>
                                <p className="text-gray-700 dark:text-gray-300">Proyectos completados</p>
                            </div>
                            
                            <div className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">+300</div>
                                <p className="text-gray-700 dark:text-gray-300">Clientes satisfechos</p>
                            </div>
                            
                            <div className="p-6">
                                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                                <p className="text-gray-700 dark:text-gray-300">Tasa de recomendación</p>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Servicios con tarjetas interactivas */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestros Servicios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="relative h-64">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1565372195458-9de0b320ef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                                        alt="Muebles a medida para hogares" 
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">Muebles Residenciales</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">Diseñamos y fabricamos muebles a medida que transforman tu hogar en un espacio único y funcional.</p>
                                    <Link href="/servicios/residencial" className={buttonVariants({ variant: "outline", size: "sm" })}>
                                        Conocer más
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="relative h-64">
                                    <Image 
                                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                                        alt="Mobiliario corporativo" 
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 dark:text-white">Soluciones Empresariales</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">Creamos espacios de trabajo eficientes y estéticos que reflejan la identidad de tu empresa.</p>
                                    <Link href="/servicios/empresarial" className={buttonVariants({ variant: "outline", size: "sm" })}>
                                        Conocer más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Testimonios en formato carrusel */}
                  

                    {/* CTA final */}
                    <div className="text-center bg-gradient-to-r from-primary/10 to-primary/20 rounded-3xl p-12">
                        <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tus espacios?</h2>
                        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
                            Permítenos ayudarte a crear ambientes únicos que reflejen tu estilo y necesidades. Nuestro equipo está listo para hacer realidad tu visión.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/catalogo" className={buttonVariants({ size: "lg" })}>
                                Ver Catálogo
                            </Link>
                            <Link href="/contacto" className={buttonVariants({ variant: "outline", size: "lg" })}>
                                Contactar
                            </Link>
                        </div>
                    </div>
                </div>
                
                {/* Botón flotante para contacto */}
                <div className="fixed bottom-8 right-8 z-50">
                    <Link 
                        href="/contacto" 
                        className="bg-primary hover:bg-primary-dark text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
                        aria-label="Contactar con Bovio SAS"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    )
}