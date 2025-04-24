import config from '@/payload.config'; // Importamos la configuracion
import { getPayload } from 'payload'; // Se importa getPayload
import type { Product } from '@/payload-types'; // Importamos el tipo correcto


export const getProducts = async () => {
  try {
      const payloadConfig = await config; //Obtenemos la config
      const payload = await getPayload({ config: payloadConfig }); // Le pasamos la configuracion a getPayload
      const { docs: products } = await payload.find({
        collection: 'products',
        depth: 1, // Ajustar la profundidad en 1 para que me traiga el dato de la imagen.
        limit: 10,
        sort: '-createdAt'
      })
      return products as Product[]; // Retornamos las categorias sin hacer un casteo
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
};