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
    ],
}