'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Tipos para mayor seguridad
type Story = { title: string; description: string; image: string };
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
    description: 'Mobiliario médico especializado pensando en el flujo de atencion.',
    story: [
      { 
        title: 'Render 3D', 
        description: 'Visualización detallada del mobiliario de recepcion con especificaciones técnicas y acabados.',
        image: 'https://i.pinimg.com/736x/dc/a3/7e/dca37ec27208152e3f8e9e9285951709.jpg'
      },
      { 
        title: 'Construcción', 
        description: 'Fabricación con materiales de grado médico y estándares de calidad hospitalaria.',
        image: 'https://i.pinimg.com/736x/71/9d/ac/719dacf8ce8082cbc192212ded4d92cb.jpg'
      },
      { 
        title: 'Resultado final', 
        description: 'Instalación completa de mobiliario funcional que mejora la eficiencia del centro de salud.',
        image: 'https://i.pinimg.com/736x/20/6c/33/206c3395cfbbded469da2ece3726ffb5.jpg'
      }
    ]
  },
  {
    id: 2,
    name: 'Hospital Padilla',
    category: 'Salud',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIa6o4p4figAGjK0jFDzlT5iQfGWO-svE6TA&s',
    description: 'Soluciones de mobiliario hospitalario para áreas de atención.',
    story: [
      { 
        title: 'Render 3D', 
        description: 'Modelado tridimensional de estaciones de trabajo y mobiliario especializado para hospital.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkgUcTTVaep9vdmt_z1Kg4TYA5H6j86_8xDw&s'
      },
      { 
        title: 'Construcción', 
        description: 'Fabricación con materiales y diseño adaptado a protocolos hospitalarios.',
        image: 'https://i.pinimg.com/736x/de/f8/ce/def8ce85d7042861633140be4cb110f1.jpg'
      },
      { 
        title: 'Resultado final', 
        description: 'Implementación exitosa que optimiza los espacios de trabajo del personal de salud.',
        image: 'https://i.pinimg.com/736x/12/e0/ce/12e0ceab91da050b265a0e37934e967c.jpg'
      }
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
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
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
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      // Capturar el valor actual de animationRefs.current
      const currentRefs = animationRefs.current;
      
      currentRefs.forEach((el) => {
        if (el) observer.observe(el);
      });
      
      // Si hay un cliente seleccionado, también observar los elementos de la línea de tiempo
      if (selectedClient) {
        setTimeout(() => {
          const timelineElements = document.querySelectorAll('.timeline-step');
          timelineElements.forEach((el) => {
            if (el instanceof HTMLElement) {
              observer.observe(el);
            }
          });
        }, 100);
      }
      
      return () => {
        // Usar la variable capturada en la función de limpieza
        currentRefs.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      };
    }
  }, [isLoading, filteredClients, selectedClient]);

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
    // Si se selecciona el mismo cliente, cerramos la vista
    if (client === selectedClient) {
      setSelectedClient(null);
      return;
    }
    
    // Seleccionamos el nuevo cliente
    setSelectedClient(client);
    
    // Damos tiempo para que el DOM se actualice antes de inicializar las animaciones
    setTimeout(() => {
      // Refrescar las referencias de animación para los nuevos elementos
      const timelineElements = document.querySelectorAll('.timeline-step');
      timelineElements.forEach((el, _idx) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = '1';
          el.classList.add('animate-fadeIn');
        }
      });
    }, 100);
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
                <div key={client.id} className="flex flex-col">
                  <article 
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
                  
                  {/* Timeline for mobile - appears directly under each client card */}
                  {selectedClient && selectedClient.id === client.id && (
                    <div className="block sm:hidden mt-4 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 animate-fadeIn">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                        Nuestra colaboración
                      </h3>
                      
                      {/* Mobile Timeline */}
                      <div className="space-y-6">
                        {client.story.map((step, stepIndex) => {
                          const getStepColor = (idx: number) => {
                            switch(idx) {
                              case 0: return 'from-blue-500 to-blue-600';
                              case 1: return 'from-green-500 to-green-600';
                              case 2: return 'from-purple-500 to-purple-600';
                              default: return 'from-slate-500 to-slate-600';
                            }
                          };
                          
                          return (
                            <div 
                              key={stepIndex}
                              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 timeline-step"
                              style={{opacity: 0, animationDelay: `${0.2 * (stepIndex + 1)}s`}}
                            >
                              <div className="flex items-center mb-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getStepColor(stepIndex)} flex items-center justify-center shadow-md mr-3`}>
                                  <span className="text-white font-bold">{stepIndex + 1}</span>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {step.title}
                                </h4>
                              </div>
                              
                              <div className="relative mb-3">
                                <Image
                                  src={step.image}
                                  alt={`${step.title} - ${client.name}`}
                                  width={300}
                                  height={180}
                                  className="w-full h-32 object-cover rounded-lg cursor-pointer shadow-md"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedImage(step.image);
                                  }}
                                />
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {step.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="text-center mt-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedClient(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-slate-600 rounded-md hover:bg-slate-700 transition-colors"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Client Story Timeline Section */}
      {selectedClient && (
        <section className="py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900 transition-all duration-300 animate-fadeIn mt-8 sm:mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Nuestra colaboración con {selectedClient.name}
            </h2>
            
            {/* Trigger animation refresh when client changes */}
            <div className="hidden">{selectedClient.id}</div>
            
            {/* Horizontal Story Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800 dark:via-green-800 dark:to-purple-800 transform -translate-y-1/2"></div>
              
              {/* Timeline steps */}
              <div className="relative flex flex-nowrap overflow-x-auto pb-8 gap-4 md:gap-0 md:justify-between" id="timeline-container">
                {selectedClient.story.map((step, index) => {
                  // Define icons for each step
                  const getStepIcon = (stepIndex: number) => {
                    switch(stepIndex) {
                      case 0: // Render 3D
                        return (
                          <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                        );
                      case 1: // Construcción
                        return (
                          <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        );
                      case 2: // Resultado final
                        return (
                          <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        );
                      default:
                        return (
                          <svg className="w-8 h-8 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                          </svg>
                        );
                    }
                  };
                  
                  const getStepColor = (stepIndex: number) => {
                    switch(stepIndex) {
                      case 0: return 'from-blue-500 to-blue-600';
                      case 1: return 'from-green-500 to-green-600';
                      case 2: return 'from-purple-500 to-purple-600';
                      default: return 'from-slate-500 to-slate-600';
                    }
                  };
                  
                  return (
                    <div 
                      key={index} 
                      className="flex-none w-64 md:w-1/4 px-4"
                    >
                      <div 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative transition-all duration-500 hover:shadow-xl transform hover:scale-105 timeline-step" 
                        ref={el => {animationRefs.current[filteredClients.length + index + 1] = el}}
                        style={{animationDelay: `${0.2 * (index + 1)}s`, opacity: 0, marginTop: '30px'}}
                      >
                        {/* Timeline dot with icon */}
                        <div className={`absolute top-0 left-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${getStepColor(index)} border-4 border-white dark:border-gray-800 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-lg`}>
                          {getStepIcon(index)}
                        </div>
                        
                        {/* Step number */}
                        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{index + 1}</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 mt-8 text-center">
                          {step.title}
                        </h3>
                        
                        {/* Image */}
                        <div className="relative mb-3 group">
                          <Image
                            src={step.image}
                            alt={`${step.title} - ${selectedClient.name}`}
                            width={200}
                            height={120}
                            className="w-full h-24 object-cover rounded-lg cursor-zoom-in transition-transform duration-300 hover:scale-105 shadow-md"
                            onClick={(e) => {
                              e.stopPropagation(); // Evitar que el evento se propague al contenedor padre
                              setExpandedImage(step.image);
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                            </svg>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-center text-sm leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Progress indicator */}
                        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${getStepColor(index)} transition-all duration-1000`}
                            style={{width: '100%', animationDelay: `${0.5 * (index + 1)}s`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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

      {/* Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] animate-scaleIn">
            <Image
              src={expandedImage}
              alt="Imagen expandida"
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              priority={true}
            />
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
              aria-label="Cerrar imagen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes timelineFadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 1 !important;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .timeline-step {
          animation: timelineFadeIn 0.8s ease-out forwards;
          opacity: 1 !important;
        }
      `}</style>
    </main>
  );
}