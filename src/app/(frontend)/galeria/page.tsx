"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from 'next/image';

// Array de imágenes optimizado para evitar duplicados
const uniqueImages = [
    "https://i.pinimg.com/736x/06/7b/b7/067bb7e4a1684ea4ea9a564e9878b488.jpg",
    "https://i.pinimg.com/736x/3f/59/1b/3f591b3363f3e775b30471a475e3029e.jpg",
    "https://i.pinimg.com/736x/ec/27/a8/ec27a8577a1e2695ec19b6300ed7c20f.jpg",
    "https://i.pinimg.com/736x/22/4a/2d/224a2d22c8364588c47a57980ac1e041.jpg",
    "https://i.pinimg.com/736x/51/fd/be/51fdbed71025e42256b69ece961c7a5f.jpg",
    "blob:https://ar.pinterest.com/2e1c0734-4bf2-41ee-9e58-b485358118ef",
    "https://i.pinimg.com/736x/20/6c/33/206c3395cfbbded469da2ece3726ffb5.jpg",
    "https://i.pinimg.com/736x/71/9d/ac/719dacf8ce8082cbc192212ded4d92cb.jpg",
];

// Textos para las polaroids
const polaroidTexts = [
    "Profesionales en ejecucion",
    "Deposito de pedidos",
    "Obras en ejecucion",
    "Instalaciones en la maternidad",
    "Otra vista de nuestros trabajos en la maternidad",
    "Escritorio pedido por el horpital de ranchillos",
    "Resultados en el centro de salud",
    "Ejecucion en el centro de salud",
];

export default function Page() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const modalRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    // Simular carga de página
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Cerrar modal
    const closeModal = useCallback(() => {
        setSelectedImage(null);
        document.body.style.overflow = ''; // Restaurar scroll
    }, []);

    // Navegar entre imágenes
    const navigateImages = useCallback((direction: number) => {
        if (currentIndex === -1) return;
        
        const newIndex = (currentIndex + direction + uniqueImages.length) % uniqueImages.length;
        setCurrentIndex(newIndex);
        setSelectedImage(uniqueImages[newIndex]);
    }, [currentIndex]);

    // Gestión de navegación con teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedImage) return;
            
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigateImages(-1);
                    break;
                case 'ArrowRight':
                    navigateImages(1);
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex, closeModal, navigateImages]);

    // Abrir modal con imagen seleccionada
    const openModal = useCallback((src: string, index: number) => {
        setSelectedImage(src);
        setCurrentIndex(index);
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }, []);

    // Gestión de gestos táctiles
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        handleSwipe();
    };
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX.current - touchEndX.current;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0) {
            // Deslizar a la izquierda (siguiente)
            navigateImages(1);
        } else {
            // Deslizar a la derecha (anterior)
            navigateImages(-1);
        }
    };

    // Generar ángulo aleatorio para cada polaroid
    const getRandomRotation = (index: number) => {
        // Semilla basada en el índice para mantener consistencia
        const seed = index * 137.5;
        // Generar un ángulo entre -6 y 6 grados
        return ((seed % 12) - 6).toFixed(1);
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white mt-4">
            {/* Pantalla de carga con efecto moderno */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-gray-900">
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-300 border-b-transparent border-l-transparent rounded-full animate-spin animation-delay-150"></div>
                        <div className="absolute inset-4 border-4 border-t-transparent border-r-transparent border-b-blue-100 border-l-transparent rounded-full animate-spin animation-delay-300"></div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 relative inline-block">
                        <span className="relative z-10">Álbum de Fotos</span>
                        <span className="absolute -bottom-1 left-0 w-full h-3 bg-blue-200 dark:bg-blue-700 opacity-50 transform -rotate-1 rounded-lg"></span>
                    </h1>
                    <p className="text-lg max-w-2xl mx-auto opacity-80">Nuestra colección de momentos capturados en el taller de carpintería</p>
                </div>

                {/* Fondo de álbum de fotos */}
                <div className="relative bg-amber-50 dark:bg-gray-800 rounded-xl p-6 md:p-10 shadow-xl mb-16">
                    {/* Textura de papel mejorada - más artesanal */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIwLjUiIGZpbGw9IiNlZWVlZWUiPjwvY2lyY2xlPgo8Y2lyY2xlIGN4PSI1IiBjeT0iNSIgcj0iMC4zIiBmaWxsPSIjZjVmNWY1Ij48L2NpcmNsZT4KPGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMC40IiBmaWxsPSIjZjBmMGYwIj48L2NpcmNsZT4KPC9zdmc+')] opacity-50 dark:opacity-10 rounded-xl"></div>
                    
                    {/* Elementos decorativos artesanales */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iOCI+CjxwYXRoIGQ9Ik0wLDQgQzIwLDAsODAsMCwxMDAsNCIgc3Ryb2tlPSIjZDRhZjM3IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+Cjwvc3ZnPg==')] bg-repeat-x opacity-60"></div>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iOCI+CjxwYXRoIGQ9Ik0wLDQgQzIwLDgsODAsOCwxMDAsNCIgc3Ryb2tlPSIjZDRhZjM3IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L3BhdGg+Cjwvc3ZnPg==')] bg-repeat-x opacity-60"></div>

                    {/* Título del álbum con estilo artesanal y nostálgico */}
                    <div className="relative mb-10 text-center">
                        <div className="inline-block relative">
                            <h2 className="font-serif text-3xl px-8 py-3 bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 rounded-lg shadow-sm transform -rotate-1 border-2 border-amber-200 dark:border-amber-700/70">
                                Recuerdos de Carpintería
                            </h2>
                            {/* Elementos decorativos de madera */}
                            <div className="absolute -top-3 -left-4 w-8 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzk2NEIwMCIgcng9IjQiIHJ5PSI0Ij48L3JlY3Q+CjxwYXRoIGQ9Ik00LDQgTDI4LDQgTDI4LDI4IEw0LDI4IFoiIHN0cm9rZT0iI2M3OTM1YyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIj48L3BhdGg+CjxwYXRoIGQ9Ik04LDggTDI0LDggTDI0LDI0IEw4LDI0IFoiIHN0cm9rZT0iI2M3OTM1YyIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==')] rotate-12"></div>
                            <div className="absolute -bottom-3 -right-4 w-8 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzk2NEIwMCIgcng9IjQiIHJ5PSI0Ij48L3JlY3Q+CjxwYXRoIGQ9Ik00LDQgTDI4LDQgTDI4LDI4IEw0LDI4IFoiIHN0cm9rZT0iI2M3OTM1YyIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIj48L3BhdGg+CjxwYXRoIGQ9Ik04LDggTDI0LDggTDI0LDI0IEw4LDI0IFoiIHN0cm9rZT0iI2M3OTM1YyIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48L3BhdGg+Cjwvc3ZnPg==')] -rotate-12"></div>
                            
                            {/* Cinta decorativa */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSIyNCI+CjxyZWN0IHdpZHRoPSI4MCIgaGVpZ2h0PSIyNCIgZmlsbD0iI2Q5N3E0YSIgcng9IjIiIHJ5PSIyIj48L3JlY3Q+CjxwYXRoIGQ9Ik0xMCwxMiBMNzAsMTIiIHN0cm9rZT0iI2VhYTg3OCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDIiPjwvcGF0aD4KPC9zdmc+')] opacity-80"></div>
                        </div>
                        <p className="text-lg max-w-2xl mx-auto mt-4 italic text-amber-800 dark:text-amber-200 opacity-80 font-serif">
                            &ldquo;Cada pieza cuenta una historia familiar&rdquo;
                        </p>
                    </div>

                    {/* Galería estilo Polaroid */}
                    <div className="polaroid-container relative">
                        <style jsx>{`
                            .polaroid-container {
                                display: flex;
                                flex-wrap: wrap;
                                justify-content: center;
                                gap: 0;
                                padding: 1rem;
                                background: rgba(255, 248, 240, 0.5);
                                border-radius: 8px;
                                box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
                            }
                            
                            @media (min-width: 640px) {
                                .polaroid-container {
                                    padding: 2rem;
                                }
                            }
                            
                            .polaroid {
                                background: #fffaf5;
                                padding: 1rem 1rem 2.5rem;
                                box-shadow: 0 6px 15px rgba(0,0,0,0.15);
                                border-radius: 2px;
                                margin: -5px 5px 15px;
                                transition: all 0.35s ease;
                                position: relative;
                                z-index: 1;
                                max-width: 300px;
                                width: calc(100% - 10px);
                                border: 1px solid #f0e0d0;
                            }
                            
                            @media (min-width: 640px) {
                                .polaroid {
                                    width: calc(50% - 30px);
                                    margin: -10px 10px 20px;
                                }
                            }
                            
                            @media (min-width: 768px) {
                                .polaroid {
                                    width: calc(33.333% - 40px);
                                }
                            }
                            
                            @media (min-width: 1024px) {
                                .polaroid {
                                    width: calc(25% - 40px);
                                }
                            }
                            
                            .polaroid:hover {
                                transform: scale(1.05) !important;
                                z-index: 10;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                            }
                            
                            .polaroid-img-container {
                                overflow: hidden;
                                margin-bottom: 0.5rem;
                                background-color: #f0f0f0;
                                border: 1px solid #e0d0c0;
                            }
                            
                            .polaroid-img {
                                width: 100%;
                                height: auto;
                                aspect-ratio: 1 / 1;
                                object-fit: cover;
                                transition: transform 0.5s ease;
                                filter: sepia(10%);
                            }
                            
                            .polaroid:hover .polaroid-img {
                                transform: scale(1.1);
                                filter: sepia(0%);
                            }
                            
                            .polaroid-text {
                                font-family: 'Caveat', 'Satisfy', 'Kalam', cursive, system-ui;
                                text-align: center;
                                font-size: 1.1rem;
                                color: #5d4037;
                                line-height: 1.2;
                                margin-top: 0.5rem;
                            }
                            
                            .polaroid-date {
                                position: absolute;
                                bottom: 0.5rem;
                                right: 1rem;
                                font-size: 0.7rem;
                                color: #8d6e63;
                                font-family: 'Courier New', monospace;
                            }
                            
                            .polaroid-tape {
                                position: absolute;
                                width: 40px;
                                height: 15px;
                                background-color: rgba(255, 245, 230, 0.7);
                                top: -7px;
                                left: 50%;
                                transform: translateX(-50%) rotate(var(--tape-angle));
                                opacity: 0.8;
                                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                                border: 1px solid rgba(210, 180, 140, 0.3);
                            }
                            
                            .polaroid::after {
                                content: '';
                                position: absolute;
                                bottom: 0.8rem;
                                left: 1rem;
                                right: 1rem;
                                height: 1px;
                                background: linear-gradient(90deg, transparent, rgba(150, 120, 90, 0.2), transparent);
                            }
                            
                            .dark .polaroid {
                                background: #f8f5f0;
                                border-color: #d0c0b0;
                            }
                            
                            .dark .polaroid-text {
                                color: #5d4037;
                            }
                            
                            .dark .polaroid-date {
                                color: #8d6e63;
                            }
                            
                            /* Marcas de agua artesanales */
                            .polaroid::before {
                                content: '';
                                position: absolute;
                                bottom: 0.5rem;
                                left: 0.5rem;
                                width: 24px;
                                height: 24px;
                                background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+CjxwYXRoIGQ9Ik04LDEyIEwxMiw4IEwxNiwxMiBMMTIsMTYgWiIgc3Ryb2tlPSIjYzBhMDgwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgo8L3N2Zz4=');
                                opacity: 0.4;
                                transform: rotate(var(--stamp-angle));
                            }
                        `}</style>

                        {uniqueImages.map((src, index) => {
                            const rotation = getRandomRotation(index);
                            const tapeAngle = ((index * 31) % 20) - 10;
                            const stampAngle = ((index * 17) % 40) - 20;
                            const randomYear = 1980 + (index % 15);
                            const randomMonth = 1 + (index % 12);
                            const randomDay = 1 + (index % 28);
                            const dateStr = `${randomDay.toString().padStart(2, '0')}/${randomMonth.toString().padStart(2, '0')}/${randomYear}`;
                            
                            return (
                                <div
                                    key={index}
                                    className="polaroid"
                                    style={{ 
                                        transform: `rotate(${rotation}deg)`, 
                                        '--tape-angle': `${tapeAngle}deg`,
                                        '--stamp-angle': `${stampAngle}deg` 
                                    } as React.CSSProperties}
                                    onClick={() => openModal(src, index)}
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && openModal(src, index)}
                                    aria-label={`Ver imagen ${index + 1}`}
                                >
                                    <div className="polaroid-tape"></div>
                                    <div className="polaroid-img-container">
                                        <Image
                                            src={src}
                                            alt={`Imagen de carpintería ${index + 1}`}
                                            width={400}
                                            height={400}
                                            className="polaroid-img"
                                            loading={index < 4 ? "eager" : "lazy"}
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </div>
                                    <div className="polaroid-text">
                                        {polaroidTexts[index]}
                                    </div>
                                    <div className="polaroid-date">{dateStr}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Modal mejorado con navegación y efectos */}
                {selectedImage && (
                    <div
                        ref={modalRef}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Visor de imagen"
                    >
                        <div 
                            className="relative max-w-5xl w-full mx-auto rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Barra superior con controles */}
                            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
                                <span className="text-white text-lg font-medium">Imagen {currentIndex + 1} de {uniqueImages.length}</span>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Imagen principal */}
                            <div className="relative w-full h-[80vh] flex items-center justify-center">
                                <Image
                                    src={selectedImage}
                                    alt={`Imagen ${currentIndex + 1}`}
                                    width={1500}
                                    height={1000}
                                    className="max-w-full max-h-full object-contain"
                                    priority
                                />
                            </div>
                            
                            {/* Controles de navegación */}
                            <div className="absolute inset-y-0 left-0 flex items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImages(-1);
                                    }}
                                    className="p-2 m-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors transform hover:scale-110"
                                    aria-label="Imagen anterior"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigateImages(1);
                                    }}
                                    className="p-2 m-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors transform hover:scale-110"
                                    aria-label="Siguiente imagen"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Indicador de deslizar en móviles */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none md:hidden">
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full text-white/80 text-sm">
                                    Desliza para navegar
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
