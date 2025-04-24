"use client"

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductType } from '../../types/product';
import { useParams } from 'next/navigation';
import { SkeletonProduct } from './components/skeleton-product';
import { Gallery } from './components/gallery';
import { TechnicalDetails } from './components/technical-details';
import { FinishCustomizer } from './components/finish-customizer';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { toggleFavorite } from '../../actions/favoriteActions';
import { toggleCart } from '../../actions/cartActions';
import { toast } from 'sonner';
import { getUser } from '../../(authenticated)/actions/getUser';

export const dynamic = 'force-dynamic';

interface GalleryItem {
    image: string | null;
    alt?: string;
}

interface ManufacturingProcessItem {
    image: string | null;
    title?: string;
    description?: string;
}

interface FinishItem {
    image: string | null;
    title?: string;
    price?: number;
}

export default function ProductPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isCart, setIsCart] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (typeof slug === 'string') {
                try {
                    const response = await fetch(`/api/products/${slug}`);
                    if (!response.ok) {
                        notFound();
                    }
                    const fetchedProduct = await response.json();
                    console.log('Producto recibido:', fetchedProduct);
                    
                    const transformedProduct = {
                        ...fetchedProduct,
                        gallery: fetchedProduct.gallery?.map((item: GalleryItem) => {
                            console.log('Imagen de galería:', item);
                            return {
                                ...item,
                                image: item.image ? `${item.image}` : null
                            };
                        }) || [],
                        manufacturingProcess: fetchedProduct.manufacturingProcess?.map((item: ManufacturingProcessItem) => {
                            console.log('Imagen de proceso:', item);
                            return {
                                ...item,
                                image: item.image ? `{item.image}` : null
                            };
                        }) || [],
                        finishes: fetchedProduct.finishes?.map((item: FinishItem) => {
                            console.log('Imagen de acabado:', item);
                            return {
                                ...item,
                                image: item.image ? `${item.image}` : null
                            };
                        }) || []
                    };
                    
                    console.log('Producto transformado:', transformedProduct);
                    setProduct(transformedProduct);
                } catch (_error) {
                    console.error('Error al cargar el producto:', _error);
                    notFound();
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProduct();
    }, [slug]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            if (user && product) {
                setIsFavorite(user.favorites?.some((fav) => typeof fav === 'object' && fav.id === product.id) || false);
                setIsCart(user.cart?.some((item) => typeof item === 'object' && item.id === product.id) || false);
            }
        };

        fetchUser();
    }, [product]);

    const handleFavoriteClick = async () => {
        if (!product) return;
        try {
            await toggleFavorite(product.id);
            setIsFavorite(!isFavorite);
            toast.success(isFavorite ? 'Producto eliminado de favoritos' : 'Producto agregado a favoritos');
        } catch (_error) {
            toast.error('Error al actualizar favoritos');
        }
    };

    const handleCartClick = async () => {
        if (!product) return;
        try {
            await toggleCart(product.id);
            setIsCart(!isCart);
            toast.success(isCart ? 'Producto eliminado del carrito' : 'Producto agregado al carrito');
        } catch (_error) {
            toast.error('Error al actualizar el carrito');
        }
    };

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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Sección izquierda */}
                <div className="space-y-8">
                    {product.gallery && product.gallery.length > 0 ? (
                        <Gallery images={product.gallery} />
                    ) : (
                        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">No hay imágenes disponibles</p>
                        </div>
                    )}
                    <TechnicalDetails
                        specs={product.technicalSpecs}
                        process={product.manufacturingProcess}
                        certifications={product.certifications}
                    />
                </div>

                {/* Sección derecha */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex items-center gap-4 mb-6">
                            <Button
                                size="lg"
                                className="flex-1"
                                onClick={handleCartClick}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" />
                                {isCart ? 'Eliminar del carrito' : 'Agregar al carrito'}
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={handleFavoriteClick}
                                className={isFavorite ? "text-red-500" : ""}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                            </Button>
                        </div>
                    </div>

                    {product.finishes && product.finishes.length > 0 && (
                        <FinishCustomizer
                            finishes={product.finishes}
                            basePrice={product.price}
                        />
                    )}

                    {/* Garantía y envío */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Garantía</h3>
                            <p className="text-sm text-gray-600">
                                {product.warranty.years} años de garantía
                            </p>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Envío seguro</h3>
                            <p className="text-sm text-gray-600">
                                Tracking 3D incluido
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

