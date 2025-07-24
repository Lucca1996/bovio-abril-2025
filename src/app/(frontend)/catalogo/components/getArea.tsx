import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Area } from '@/payload-types'

export const getArea = async () => {
  try {
      const payloadConfig = await config; //Obtenemos la config
      const payload = await getPayload({ config: payloadConfig }); // Le pasamos la configuracion a getPayload
      const { docs: area } = await payload.find({
        collection: 'area',
        depth: 1, // Ajustar la profundidad en 1 para que me traiga el dato de la imagen.
        limit: 10,
        sort: '-createdAt'
      })
      return area as Area[]; // Retornamos las categorias sin hacer un casteo
    } catch (error) {
      console.error('Error fetching area:', error);
      return [];
    }
};