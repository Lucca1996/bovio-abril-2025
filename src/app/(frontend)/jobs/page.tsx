
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"

// Metadatos para SEO
export const metadata: Metadata = {
  title: "Nuestros Trabajos | Bovio SAS - Carpintería Especializada",
  description: "Descubre la amplitud de nuestras capacidades en carpintería comercial: gabinetes, mostradores, recepciones y mobiliario empresarial a medida.",
  keywords: "carpintería comercial, gabinetes comerciales, mostradores, recepciones, mobiliario empresarial, equipamiento comercial",
}

export default function Jobs() {
  return (
    <>
      <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 mt-28" id="jobs">
        <div className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center animate-fade-in-down">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              Capacidades Completas
            </span>
            <h1 className="font-heading mb-4 font-bold tracking-tight text-4xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
              Nuestros Trabajos
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Soluciones integrales en carpintería comercial y equipamiento empresarial
            </p>
          </div>

          {/* Sección de Capacidades */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Amplitud de Nuestras Capacidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Equipamiento Comercial */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mb-6 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Equipamiento Comercial</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Gabinetes y vitrinas comerciales</li>
                  <li>• Mostradores y counters</li>
                  <li>• Recepciones corporativas</li>
                  <li>• Displays y exhibidores</li>
                  <li>• Mobiliario de punto de venta</li>
                </ul>
              </div>

              {/* Carpintería Exterior */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mb-6 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21l4-4 4 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Carpintería Exterior</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Fachadas comerciales en madera</li>
                  <li>• Pérgolas y estructuras exteriores</li>
                  <li>• Decks y terrazas comerciales</li>
                  <li>• Señalización corporativa</li>
                  <li>• Elementos arquitectónicos</li>
                </ul>
              </div>

              {/* Mobiliario Corporativo */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mb-6 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2v-8a2 2 0 012-2V8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">Mobiliario Corporativo</h3>
                <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                  <li>• Escritorios ejecutivos</li>
                  <li>• Salas de juntas</li>
                  <li>• Bibliotecas y archivadores</li>
                  <li>• Divisiones de oficina</li>
                  <li>• Muebles de espera</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nuestra Forma de Trabajar */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Nuestra Metodología de Trabajo</h2>
            <div className="relative">
              {/* Línea de proceso */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 dark:bg-primary/30 hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paso 1 */}
                <div className="md:text-right md:pr-12 relative group">
                  <div className="absolute right-0 md:right-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-sm font-bold">1</div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2 text-primary">Consulta Inicial</h3>
                    <p className="text-gray-700 dark:text-gray-300">Reunión para entender sus necesidades, espacios y objetivos comerciales.</p>
                  </div>
                </div>
                
                {/* Paso 2 */}
                <div className="md:pl-12 relative group mt-8 md:mt-24">
                  <div className="absolute left-0 md:left-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-sm font-bold">2</div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2 text-primary">Diseño y Propuesta</h3>
                    <p className="text-gray-700 dark:text-gray-300">Desarrollo de planos, renders 3D y propuesta técnica detallada.</p>
                  </div>
                </div>
                
                {/* Paso 3 */}
                <div className="md:text-right md:pr-12 relative group mt-8 md:mt-0">
                  <div className="absolute right-0 md:right-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-sm font-bold">3</div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2 text-primary">Fabricación</h3>
                    <p className="text-gray-700 dark:text-gray-300">Producción en nuestro taller con materiales de primera calidad y seguimiento continuo.</p>
                  </div>
                </div>
                
                {/* Paso 4 */}
                <div className="md:pl-12 relative group mt-8 md:mt-24">
                  <div className="absolute left-0 md:left-[-24px] top-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center z-10 group-hover:scale-110 transition-transform text-sm font-bold">4</div>
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2 text-primary">Instalación</h3>
                    <p className="text-gray-700 dark:text-gray-300">Montaje profesional en sitio con mínima interrupción de sus operaciones.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Información para Presupuesto */}
          <div className="mb-20 py-16 bg-primary/5 dark:bg-primary/10 rounded-3xl">
            <div className="max-w-4xl mx-auto px-8">
              <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Información Necesaria para su Presupuesto</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Datos del Proyecto</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Dimensiones del espacio:</strong> Largo, ancho, alto y planos si están disponibles</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Tipo de negocio:</strong> Retail, oficina, restaurante, clínica, etc.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Funcionalidad requerida:</strong> Almacenamiento, exhibición, trabajo, etc.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Estilo deseado:</strong> Moderno, clásico, industrial, minimalista</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">Especificaciones Técnicas</h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Materiales preferidos:</strong> Tipo de madera, acabados, herrajes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Presupuesto estimado:</strong> Rango de inversión disponible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Cronograma:</strong> Fecha de inicio y entrega deseada</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Instalaciones existentes:</strong> Electricidad, plomería, climatización</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md inline-block">
                  <h4 className="text-lg font-bold mb-2 text-primary">¿Listo para comenzar?</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Contáctenos con esta información y recibirá una propuesta detallada en 48 horas</p>
                  <Link href="/contacto" className={buttonVariants({ variant: "default", size: "lg" })}>
                    Solicitar Presupuesto
                  </Link>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
    </>
  );
}