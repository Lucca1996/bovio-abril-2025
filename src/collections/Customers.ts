import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
    slug: 'customers',
    admin: {
        useAsTitle: 'email',
    },
    access: {
        create: () => true,
    },
    auth: true,
    fields: [
        {
            name: 'favorites',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            label: 'Favorites',
          },
       {
            name: 'cart',
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
            label: 'Cart',
          }, 
          {
            name: 'perfil',
            type: 'text',
            hasMany: false,
            label: 'imagen de perfil',
          }, 
          {
            name: 'direcciones',
            type: 'text',
            hasMany: true,
            label: 'direcciones',
          }, 
          {
            name: 'nombre',
            type: 'text',
            hasMany: false,
            label: 'nombre completo',
          }, 
          {
            name: 'telefono',
            type: 'text',
            hasMany: false,
            label: 'telefono',
          }, 
    ],
}