import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';
import config from '@/payload.config';
import { Customer } from '@/payload-types';

export async function GET(req: NextRequest) {
  try {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const headers = req.headers;
    const { user } = await payload.auth({ headers });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }

    if (user.collection !== 'customers') {
      return NextResponse.json({ error: 'Usuario no autorizado' }, { status: 403 });
    }

    const customer = user as Customer;
    
    // Obtener los productos completos del carrito
    const cartProducts = [];
    
    if (customer.cart && customer.cart.length > 0) {
      // Filtrar solo los IDs
      const cartIds = customer.cart.map(item => 
        typeof item === 'number' ? item : item.id
      );
      
      // Buscar los productos completos
      for (const id of cartIds) {
        try {
          const product = await payload.findByID({
            collection: 'products',
            id: String(id),
          });
          
          if (product) {
            cartProducts.push(product);
          }
        } catch (error) {
          console.error(`Error al obtener producto ${id}:`, error);
        }
      }
    }

    return NextResponse.json({ products: cartProducts });
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}