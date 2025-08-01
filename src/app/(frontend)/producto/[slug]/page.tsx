"use client"

import { notFound } from 'next/navigation';
import { useEffect, useState, useRef, useMemo } from 'react';
import { ProductType } from '../../types/product';
import { useParams } from 'next/navigation';
import { SkeletonProduct } from './components/skeleton-product';
import { Gallery } from './components/gallery';
import { TechnicalDetails } from './components/technical-details';
import { FinishCustomizer } from './components/finish-customizer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, ChevronRight, MessageSquare } from 'lucide-react';
import { useHydratedFavoriteStore } from '@/store/useFavoriteStore';
import { formatPrice } from '../../lib/formatPrice';
import { getImageUrl } from '../../lib/getImageUrl';
import { toast } from 'sonner';
import { getUser } from '../../(authenticated)/actions/getUser';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore'; // Importar el store global

export const dynamic = 'force-dynamic';


export default function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [_isFavorite, setIsFavorite] = useState(false);
    const [_isCart, setIsCart] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
        const [selectedFinishInfo, setSelectedFinishInfo] = useState<string>('');
    const mainRef = useRef<HTMLElement>(null);
    
    // Usar los stores globales
    const { addItem: addToCart, removeItem: removeFromCart, items: cartItems } = useCartStore();
    const { toggleItem: toggleFavoriteItem, isFavorite: checkIsFavorite } = useHydratedFavoriteStore();
    
    // Estados derivados de los stores
    const isFavoriteFromStore = checkIsFavorite(product?.id.toString() || '');
    const isInCartFromStore = cartItems.some(item => item.id === product?.id.toString());

    // Efecto combinado para cargar producto y datos de usuario
    useEffect(() => {
        const fetchProductAndUserData = async () => {
            if (typeof slug !== 'string') return;
            
            try {
                setIsLoading(true);
                const response = await fetch(`/api/products/${slug}`);
                if (!response.ok) {
                    notFound();
                }
                
                const fetchedProduct = await response.json();
                
                // Transformación simplificada de datos
                setProduct(fetchedProduct);
                
                // Cargar datos de usuario en la misma operación
                const user = await getUser();
                if (user) {
                    setIsFavorite(user.favorites?.some(fav => 
                        typeof fav === 'object' && fav.id === fetchedProduct.id) || false);
                    setIsCart(user.cart?.some(item => 
                        typeof item === 'object' && item.id === fetchedProduct.id) || false);
                }
            } catch (_error) {
                notFound();
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductAndUserData();
    }, [slug]);

    // Control de scroll optimizado con throttling
    useEffect(() => {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking && mainRef.current) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const scrollHeight = (mainRef.current?.scrollHeight ?? 0) - window.innerHeight;
                    const progress = Math.min(scrollTop / scrollHeight, 1);
                    setScrollProgress(progress);
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Manejadores de eventos memoizados
    const handleFavoriteClick = () => {
        if (!product) return;
        const imageUrl = product.gallery && product.gallery[0] && product.gallery[0].image ? getImageUrl(product.gallery[0].image) : undefined;
        const favoriteItem = {
            id: product.id.toString(),
            name: product.title,
            price: product.price,
            image: imageUrl
        };
        
        toggleFavoriteItem(favoriteItem);
        toast.success(isFavoriteFromStore ? 'Producto eliminado de favoritos' : 'Producto agregado a favoritos');
    };

    const handleCartClick = () => {
        if (!product) return;
        const imageUrl = product.gallery && product.gallery[0] && product.gallery[0].image ? getImageUrl(product.gallery[0].image) : undefined;
        const cartItem = {
            id: product.id.toString(),
            name: product.title,
            price: product.price,
            image: imageUrl
        };
        
        if (isInCartFromStore) {
            removeFromCart(product.id.toString());
            toast.success('Producto eliminado del carrito');
        } else {
            addToCart(cartItem);
            toast.success('Producto agregado al carrito');
        }
    };

    // Animaciones memoizadas
    const fadeInUpVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    }), []);

    if (isLoading) {
        return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
                <SkeletonProduct />
            </main>
        );
    }

    if (!product) {
        notFound();
    }

    return (
        <main ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 relative">
            {/* Barra de navegación y progreso */}
            <div className="fixed top-16 left-0 right-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex items-center text-sm">
                        <Link href="/" className="text-gray-500 hover:text-primary transition-colors duration-300">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <Link href="/productos" className="text-gray-500 hover:text-primary transition-colors duration-300">
                            Productos
                        </Link>
                        <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                        <span className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[150px] sm:max-w-xs">
                            {product.title}
                        </span>
                    </div>
                    <div className="h-0.5 w-full bg-gray-100 dark:bg-gray-800 mt-2">
                        <div 
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${scrollProgress * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                {/* Columna izquierda: Galería e información técnica */}
                <motion.div 
                    className="space-y-12"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUpVariants}
                >
                    {product.gallery && product.gallery.length > 0 ? (
                        <Gallery images={product.gallery} />
                    ) : (
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">No hay imágenes disponibles</p>
                        </div>
                    )}
                </motion.div>

                {/* Columna derecha: Información del producto y acciones */}
                <div className="relative">
                    <div 
                        className="lg:sticky lg:top-32 space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="overflow-hidden">
                                <motion.h1 
                                    className="text-3xl md:text-4xl font-bold"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                >
                                    {product.title}
                                </motion.h1>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                {product.description}
                            </p>
                            
                            {/* Precio del producto */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Precio Estimado:</span>
                                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                            
                        </motion.div>

                        {product.finishes && product.finishes.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                            >
                                <FinishCustomizer
                                    finishes={product.finishes}
                                    basePrice={product.price}
                                    onFinishChange={(finish) => setSelectedFinishInfo(`Acabado seleccionado: ${finish.type}`)}
                                />
                            </motion.div>
                        )}
                        <div className="flex flex-col gap-4 my-8">
                            <Button
                                size="lg"
                                className="w-full py-6 text-base transition-all duration-300 hover:scale-105 hover:shadow-md bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => window.open(`https://wa.me/+5493816237710?text=Hola, estoy interesado en el producto: ${product.title}${selectedFinishInfo ? `. ${selectedFinishInfo}` : ''}`, '_blank')}
                            >
                                <MessageSquare className="w-5 h-5 mr-2" />
                                Consultar por WhatsApp
                            </Button>
                            <div className="flex items-center gap-4">
                                <Button
                                    size="lg"
                                    className="flex-1 py-6 text-base transition-all duration-300 hover:scale-105 hover:shadow-md"
                                    onClick={handleCartClick}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {isInCartFromStore ? 'Eliminar del carrito' : 'Agregar al carrito'}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={handleFavoriteClick}
                                    className={`py-6 transition-all duration-300 hover:scale-105 ${isFavoriteFromStore ? "text-red-500 border-red-200 hover:border-red-300 hover:bg-red-50" : ""}`}
                                    aria-label={isFavoriteFromStore ? "Eliminar de favoritos" : "Agregar a favoritos"}
                                >
                                    <Heart className={`w-5 h-5 ${isFavoriteFromStore ? "fill-current" : ""}`} />
                                </Button>
                            </div>
                        </div>
                        {/* Información adicional */}
                        <motion.div 
                            className="grid grid-cols-2 gap-4 mt-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <div className="p-5 border rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-all duration-300 hover:scale-105">
                                <h3 className="font-semibold mb-2">Garantía</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                   Todos nuestros productos incluyen garantia minima de 1 año
                                </p>
                            </div>
                            <div className="p-5 border rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:shadow-md transition-all duration-300 hover:scale-105">
                                <h3 className="font-semibold mb-2">Envío seguro</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Seguimiento por ubicacion en tiempo real una vez que sale de nuestra fabrica
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Detalles técnicos (movidos fuera de la columna izquierda) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-16"
            >
                <TechnicalDetails
                    specs={product.technicalSpecs}
                    process={product.manufacturingProcess}
                    certifications={product.certifications}
                />
            </motion.div>
        </main>
    );
}