'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Tipos para mayor seguridad
type Story = { title: string; description: string };
type Client = {
  id: number;
  name: string;
  category: string;
  logo: string;
  description: string;
  story: Story[];
};

// Datos de ejemplo para los clientes
const clientsData: Client[] = [
 
  {
    id: 1,
    name: 'Centro de salud',
    category: 'Salud',
    logo: 'https://www.comunicaciontucuman.gob.ar/fotos/cache/notas/2023/10/04/730x473_231004123423_89680.jpg',
    description: 'Proyectos arquitectónicos sostenibles con enfoque en eficiencia energética.',
    story: [
      { title: 'Consultoría', description: 'Evaluación de necesidades específicas del proyecto.' },
      { title: 'Diseño', description: 'Creación de soluciones arquitectónicas innovadoras.' },
      { title: 'Construcción', description: 'Implementación con materiales sostenibles.' },
      { title: 'Entrega', description: 'Certificación LEED y reducción de huella de carbono.' }
    ]
  },
  {
    id: 2,
    name: 'Hospital Padilla',
    category: 'Salud',
    logo: 'https://msptucuman.gov.ar/wordpress/wp-content/uploads/2015/07/portada-padilla-2-1024x512.jpg',
    description: 'Soluciones digitales para mejorar la experiencia de pacientes y profesionales.',
    story: [
      { title: 'Diagnóstico', description: 'Identificación de puntos de mejora en procesos.' },
      { title: 'Planificación', description: 'Desarrollo de roadmap tecnológico.' },
      { title: 'Desarrollo', description: 'Implementación de plataforma digital integrada.' },
      { title: 'Monitoreo', description: 'Mejora continua basada en datos de usuarios.' }
    ]
  },
];

// Categorías disponibles para filtrado
const categories = ['Todos', 'Tecnología', 'Construcción', 'Salud', 'Finanzas', 'Educación', 'Retail'];

export default function OurClients() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const animationRefs = useRef<(HTMLElement | null)[]>([]);

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredClients(clientsData);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Configurar Intersection Observer para animaciones al hacer scroll
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target instanceof HTMLElement) {
              entry.target.classList.add('animate-fadeIn');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      // Capturar el valor actual de animationRefs.current
      const currentRefs = animationRefs.current;
      
      currentRefs.forEach((el) => {
        if (el) observer.observe(el);
      });
      
      return () => {
        // Usar la variable capturada en la función de limpieza
        currentRefs.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      };
    }
  }, [isLoading, filteredClients]);

  // Filtrar clientes por categoría
  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredClients(clientsData);
    } else {
      setFilteredClients(clientsData.filter(client => client.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Manejar selección de cliente para mostrar su historia
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client === selectedClient ? null : client);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 md:px-8 transition-all duration-300" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-slate-600 dark:text-gray-400 dark:hover:text-slate-400 transition-colors duration-200">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="ml-2 font-medium text-slate-600 dark:text-slate-400" aria-current="page">Nuestros Clientes</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <div 
          className="max-w-7xl mx-auto opacity-0" 
          ref={el => { animationRefs.current[0] = el; }}
          style={{animationDelay: '0.2s'}}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Nuestros Clientes
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-10">
            Colaboramos con empresas líderes en diversos sectores, ayudándoles a alcanzar sus objetivos a través de soluciones innovadoras y estratégicas.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-20 w-64 h-64 bg-slate-100 dark:bg-slate-900/20 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-20 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-70 blur-3xl"></div>
      </section>

      {/* Sticky Filter Section */}
      <section className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md py-4 px-4 md:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Filtrar por industria</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${
                    selectedCategory === category
                      ? 'bg-slate-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Filtrar por ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Grid Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredClients.map((client, index) => (
                <article 
                  key={client.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden opacity-0 transition-all duration-500 hover:shadow-xl transform hover:scale-[1.02] cursor-pointer"
                  ref={el => {animationRefs.current[index + 1] = el}}
                  style={{animationDelay: `${0.1 * (index + 1)}s`}}
                  onClick={() => handleClientSelect(client)}
                  aria-label={`Ver detalles de ${client.name}`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={client.logo}
                      alt={`Logo de ${client.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-black-600 bg-slate-100 dark:bg-slate-900 dark:text-slate-200 mb-2">
                      {client.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{client.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{client.description}</p>
                    <div className="flex justify-end">
                      <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center">
                        Ver historia
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Client Story Timeline Section */}
      {selectedClient && (
        <section className="py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Nuestra colaboración con {selectedClient.name}
            </h2>
            
            {/* Horizontal Story Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 transform -translate-y-1/2"></div>
              
              {/* Timeline steps */}
              <div className="relative flex flex-nowrap overflow-x-auto pb-8 gap-4 md:gap-0 md:justify-between">
                {selectedClient.story.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex-none w-64 md:w-1/4 px-4"
                    ref={el => {animationRefs.current[filteredClients.length + index + 1] = el}}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative opacity-0 transition-all duration-500" style={{animationDelay: `${0.2 * (index + 1)}s`}}>
                      {/* Timeline dot */}
                      <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-slate-600 border-4 border-white dark:border-gray-800 transform -translate-x-1/2 -translate-y-1/2"></div>
                      
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-4 text-center">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={() => setSelectedClient(null)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-transform duration-200 transform active:scale-95"
                aria-label="Cerrar historia del cliente"
              >
                Cerrar
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8">
        <div 
          className="max-w-4xl mx-auto text-center opacity-0"
          ref={el => {animationRefs.current[filteredClients.length + 6] = el}}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra lista de clientes satisfechos y descubre cómo podemos ayudarte a alcanzar tus objetivos de negocio.
          </p>
          <Link 
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-transform duration-200 transform hover:scale-105 active:scale-95"
            aria-label="Contactar para más información"
            href="/contacto"
          >
            Contáctanos hoy
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}