import Image from 'next/image'
import { Metadata } from 'next'

// Metadatos para SEO y accesibilidad
export const metadata: Metadata = {
  title: 'Contacto | Bovio SAS',
  description: 'Ponte en contacto con Bovio SAS. Estamos aquí para responder tus preguntas y atender tus necesidades.',
}

export default function Page() {
    return (
        <>
            {/* Sección principal de contacto */}
            <section className="relative" id="contact" aria-label="Sección de contacto">
                {/* Banner de imagen */}
                <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                    <Image
                        src="https://c.wallhere.com/photos/6a/a7/photography_phone_box_depth_of_field_phone-78038.jpg!d"
                        alt="Imagen de portada de contacto Bovio SAS"
                        width={1920}
                        height={384}
                        className="w-full h-full object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50 flex items-center justify-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
                            Contacto
                        </h1>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 dark:bg-gray-900">
                    {/* Introducción */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 dark:text-white">
                            Estamos aquí para ayudarte
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                            Tu opinión es importante para nosotros. Nos encantaría escuchar tus comentarios, responder tus preguntas o atender cualquier inquietud que tengas.
                        </p>
                    </div>

                    {/* Contenedor principal de información y formulario */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        
                        {/* Columna de información de contacto */}
                        <div className="space-y-10">
                            {/* Descripción */}
                            <div>
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                    En <span className="font-semibold">Bovio SAS</span> nos interesamos por tu opinión y/o duda, por eso te invitamos
                                    a comunicarte mediante este formulario o a través de nuestras redes sociales:
                                </p>
                                
                                {/* Redes sociales */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <a 
                                        href="https://www.facebook.com/profile.php?id=61578173561309" 
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 transition-colors duration-300"
                                        aria-label="Visita nuestro Facebook"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                        </svg>
                                        <span>Facebook</span>
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/bovio.sas/" 
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:hover:bg-pink-800 transition-colors duration-300"
                                        aria-label="Visita nuestro Instagram"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        <span>Instagram</span>
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/bovio.sas/" 
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800 transition-colors duration-300"
                                        aria-label="Visita nuestro Twitter"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                        <span>Twitter</span>
                                    </a>
                                    <a 
                                        href="https://wa.me/3816664927" 
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 transition-colors duration-300"
                                        aria-label="Contáctanos por WhatsApp"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                        </svg>
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                            </div>
                            
                            {/* Información de contacto */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Información de contacto</h3>
                                
                                <div className="space-y-4">
                                    {/* Ubicación */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white dark:bg-gray-700 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Ubicación</h4>
                                            <address className="not-italic text-gray-700 dark:text-gray-300 mt-1">
                                                Diagonal sur salvador allende 2996<br />
                                                San Miguel de Tucumán, Argentina
                                            </address>
                                        </div>
                                    </div>
                                    
                                    {/* Teléfono y Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white dark:bg-gray-700 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Contacto</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">
                                                <a href="tel:+11234567890" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                                    Teléfono: 381-6664927
                                                </a>
                                            </p>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <a href="mailto:boviosas@gmail.com" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                                    Email: sas.bovio@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Horario */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-900 text-white dark:bg-gray-700 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900 dark:text-white">Horario de atención</h4>
                                            <p className="text-gray-700 dark:text-gray-300 mt-1">Lunes - Viernes: 08:00 - 17:00</p>
                                            <p className="text-gray-700 dark:text-gray-300">Sábados y Domingos: 08:00 - 12:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Formulario de contacto */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Envíanos un mensaje</h3>
                            
                            <form id="contactForm" className="space-y-6">
                                {/* Campo Nombre */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nombre completo <span className="text-red-600 dark:text-red-400">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        autoComplete="name" 
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-gray-900 dark:focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Tu nombre completo"
                                        aria-required="true"
                                    />
                                </div>
                                
                                {/* Campo Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Correo electrónico <span className="text-red-600 dark:text-red-400">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        autoComplete="email" 
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-gray-900 dark:focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="tu.email@ejemplo.com"
                                        aria-required="true"
                                    />
                                </div>
                                
                                {/* Campo Asunto */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Asunto <span className="text-red-600 dark:text-red-400">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-gray-900 dark:focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="Asunto de tu mensaje"
                                        aria-required="true"
                                    />
                                </div>
                                
                                {/* Campo Teléfono (opcional) */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Teléfono <span className="text-gray-500 dark:text-gray-400">(opcional)</span>
                                    </label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone" 
                                        autoComplete="tel"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-gray-900 dark:focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-colors"
                                        placeholder="+54 XXX XXX XXXX"
                                    />
                                </div>
                                
                                {/* Campo Mensaje */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Mensaje <span className="text-red-600 dark:text-red-400">*</span>
                                    </label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        rows={5} 
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 focus:border-gray-900 dark:focus:border-gray-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                        aria-required="true"
                                    ></textarea>
                                </div>
                                
                                {/* Botón de envío */}
                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full bg-gray-900 text-white font-medium py-3 px-6 rounded-md shadow-sm hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-500 transition-colors duration-300"
                                    >
                                        Enviar mensaje
                                    </button>
                                </div>
                                
                                {/* Nota de privacidad */}
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                                    Al enviar este formulario, aceptas nuestra <a href="#" className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-white">política de privacidad</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                    
                    {/* Mapa o ubicación (opcional) */}
                    <div className="mt-16">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Nuestra ubicación</h3>
                        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d889.8165303736408!2d-65.23251597186777!3d-26.86328481143959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225b9c70c1008d%3A0x7ec3b96cc2ec78e!2sDiag.%20Sur%202996%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1753734728842!5m2!1ses!2sar" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Bovio SAS"
                                aria-label="Mapa mostrando la ubicación de nuestras oficinas"
                                className="dark:opacity-80"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}