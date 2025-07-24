"use client";

import { ProductCard } from "@/app/(frontend)/components/shared/product-card";
 import { ProductType } from "@/app/(frontend)/types/product";
import { useHydratedFavoriteStore } from "@/store/useFavoriteStore";
import { useCartStore } from "@/store/useCartStore";
import { Separator } from "@/components/ui/separator";

export const FavoritesClient: React.FC = () => {
    const { items: favoriteItems } = useHydratedFavoriteStore();
    const { items: cartItems } = useCartStore();
    
    // Obtener IDs de productos en el carrito
    const cartIds = cartItems.map(item => item.id);

    return (
        <>
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                {favoriteItems.length === 0 ? (
                    <p className="text-center col-span-3">No tienes productos favoritos</p>
                ) : (
                    favoriteItems.map((item) => {
                        // Convertir el item del store al formato ProductType
                        const productData: Partial<ProductType> = {
                            id: parseInt(item.id),
                            title: item.name,
                            price: item.price,
                            gallery: item.image ? [{ id: item.id.toString(), image: item.image, alt: item.name }] : [],
                            slug: `producto-${item.id}`,
                            category: { id: 1, name: 'Categoría' },
                            description: '',
                            // Remove _status field since it's not defined in ProductType
                            style: { id: 1, title: 'Default' }
                        };
                        
                        return (
                            <div className="p-1 md:basis-1/2 lg:basis-1/3 group" key={item.id}>
                                <ProductCard {...productData as ProductType}
                                    {...productData}
                                    initialIsFavorite={true}
                                    initialIsCart={cartIds.includes(item.id)}
                                />
                            </div>
                        );
                    })
                )}
            </div>
            <Separator className="my-6" />
        </>
    );
};