import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Tipo } from '@/payload-types'

export const getTipo = async () => {
  try {
      const payloadConfig = await config; //Obtenemos la config
      const payload = await getPayload({ config: payloadConfig }); // Le pasamos la configuracion a getPayload
      const { docs: tipo } = await payload.find({
        collection: 'tipo',
        depth: 1, // Ajustar la profundidad en 1 para que me traiga el dato de la imagen.
        limit: 10,
        sort: '-createdAt'
      })
      return tipo as Tipo[]; // Retornamos las categorias sin hacer un casteo
    } catch (error) {
      console.error('Error fetching tipo:', error);
      return [];
    }
};