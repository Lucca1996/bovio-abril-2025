"use server"

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from 'next/headers.js'
import { Customer } from "@/payload-types";

export async function toggleFavorite(productId: number) {
    try {
        const headers = await getHeaders()
        const payload = await getPayload({ config: await config });
        const { user } = await payload.auth({ headers })

        if (!user) {
            throw new Error("Usuario no autenticado");
        }

        if (user.collection !== 'customers') {
            throw new Error("Usuario no autorizado");
        }

        const customer = user as Customer;
        const currentFavorites = customer.favorites || [];
        
        // Asegurarnos de que trabajamos con IDs
        const favoriteIds = currentFavorites.map(fav => 
            typeof fav === 'number' ? fav : fav.id
        );
        
        const isFavorite = favoriteIds.includes(productId);

        // Toggle favorito usando solo IDs
        const updatedFavorites = isFavorite
            ? favoriteIds.filter(id => id !== productId)
            : [...favoriteIds, productId];

        // Actualizar usuario
        await payload.update({
            collection: 'customers',
            id: customer.id,
            data: {
                favorites: updatedFavorites,
            },
        });

        return !isFavorite;
    } catch (error) {
        console.error('Error al modificar favoritos:', error);
        throw error;
    }
} 