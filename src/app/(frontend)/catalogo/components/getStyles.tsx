import config from '@/payload.config'; // Importamos la configuracion
import { getPayload } from 'payload'; // Se importa getPayload
import type { Style } from '@/payload-types'; // Importamos el tipo correcto


export const getStyles = async () => {
  try {
      const payloadConfig = await config; //Obtenemos la config
      const payload = await getPayload({ config: payloadConfig }); // Le pasamos la configuracion a getPayload
      const { docs: styles } = await payload.find({
        collection: 'style',
        depth: 1, // Ajustar la profundidad en 1 para que me traiga el dato de la imagen.
        limit: 10,
        sort: '-createdAt'
      })
      return styles as Style[]; // Retornamos las categorias sin hacer un casteo
    } catch (error) {
      console.error('Error fetching styles:', error);
      return [];
    }
};
