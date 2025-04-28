"use client";

import { ProductCard } from "@/app/(frontend)/components/shared/product-card";
import { ProductType } from "@/app/(frontend)/types/product";
import { Product } from "@/payload-types";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface FavoritesClientProps {
    initialFavorites: Product[];
    cartIds?: number[];
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({ 
    initialFavorites,
    cartIds = []
}) => {
    const [favorites, setFavorites] = useState<Product[]>(initialFavorites);

    const handleRemoveFavorite = (productId: number) => {
        setFavorites(currentFavorites => 
            currentFavorites.filter(product => product.id !== productId)
        );
    };

    return (
        <>
            <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10">
                {favorites.length === 0 ? (
                    <p className="text-center col-span-3">No tienes productos favoritos</p>
                ) : (
                    favorites.map((product) => (
                        <div className="p-1 md:basis-1/2 lg:basis-1/3 group" key={product.id}>
                            <ProductCard 
                                {...product as unknown as ProductType} 
                                initialIsFavorite={true}
                                initialIsCart={cartIds.includes(product.id)}
                                onFavoriteRemoved={() => handleRemoveFavorite(product.id)}
                            />
                        </div>
                    ))
                )}
            </div>
            <Separator className="my-6" />
        </>
    );
};