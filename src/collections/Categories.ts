import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories', // El slug es cómo se accederá a la colección en la API y en el panel de administración.
  admin: {
    useAsTitle: 'name', // El campo que se usará como título en el panel de administración.
  },
  access: {
    read: () => true, // Todos pueden leer las categorías.
    create: () => true, // Todos pueden crear categorias.
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name', // Nombre de la categoría
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Asegúrate de que sea único
    },
    {
      name: 'description', // Descripción de la categoría
      type: 'textarea',
    },
    {
      name: 'image', //imagen de categoria
      type: "text",
    }
    // Aquí puedes añadir más campos, como una imagen o un campo de referencia para subcategorías.
  ],
}
