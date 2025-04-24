"use server"

import { getPayload } from "payload";
import config from "@/payload.config";
import { headers as getHeaders } from 'next/headers.js'
import { Customer } from "@/payload-types";

export async function toggleCart(productId: number) {
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
        const currentCart = customer.cart || [];
        
        // Asegurarnos de que trabajamos con IDs
        const cartIds = currentCart.map(car => 
            typeof car === 'number' ? car : car.id
        );
        
        const isCart = cartIds.includes(productId);

        // Toggle cart usando solo IDs
        const updatedCart = isCart
            ? cartIds.filter(id => id !== productId)
            : [...cartIds, productId];

        // Actualizar usuario
        await payload.update({
            collection: 'customers',
            id: customer.id,
            data: {
                cart: updatedCart,
            },
        });

        return !isCart;
    } catch (error) {
        console.error('Error al modificar carrito:', error);
        throw error;
    }
} 