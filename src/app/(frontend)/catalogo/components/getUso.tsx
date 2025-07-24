import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Uso } from '@/payload-types'

export const getUso = async () => {
  try {
      const payloadConfig = await config; //Obtenemos la config
      const payload = await getPayload({ config: payloadConfig }); // Le pasamos la configuracion a getPayload
      const { docs: uso } = await payload.find({
        collection: 'uso',
        depth: 1, // Ajustar la profundidad en 1 para que me traiga el dato de la imagen.
        limit: 10,
        sort: '-createdAt'
      })
      return uso as Uso[]; // Retornamos las categorias sin hacer un casteo
    } catch (error) {
      console.error('Error fetching uso:', error);
      return [];
    }
};