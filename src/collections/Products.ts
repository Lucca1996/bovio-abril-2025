import type { CollectionConfig } from 'payload'


import { slugField } from '@/fields/slug'

import { anyone } from '../access/anyone'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: anyone,
    create: anyone,
    update: anyone,
    delete: anyone,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'text',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ]
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'technicalSpecs',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'unit',
          type: 'text',
        }
      ]
    },
    {
      name: 'manufacturingProcess',
      type: 'array',
      fields: [
        {
          name: 'step',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'text',
          required: false,
        }
      ]
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'FSC', value: 'fsc' },
            { label: 'ECO', value: 'eco' },
            { label: 'PEFC', value: 'pefc' }
          ],
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        }
      ]
    },
    {
      name: 'finishes',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
        },
        {
          name: 'priceMultiplier',
          type: 'number',
          required: true,
        },
        {
          name: 'image',
          type: 'text',
        }
      ]
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      type: 'relationship',
      relationTo: 'categories', // "pages" is the slug of an existing collection
      name: 'category',
      required: true,
      
    },
    {
      type: 'relationship',
      relationTo: 'style', // "pages" is the slug of an existing collection
      name: 'style',
      required: true,
      
    },
    
    {
      name: 'isFeatured', // required
      type: 'checkbox', // required
      label: 'Colocar en carousel principal',
      defaultValue: false,
    },
    {
      name: 'isActive', // required
      type: 'checkbox', // required
      label: 'Producto disponible',
      defaultValue: true,
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'warranty',
      type: 'group',
      fields: [
        {
          name: 'years',
          type: 'number',
          required: true,
          defaultValue: 10,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    ...slugField(),
  ],
  endpoints: [
    {
      path: '/:slug',
      method: 'get',
      handler: async (req) => {
        const { routeParams } = req;
        
        // Verificamos que routeParams no sea undefined y que contenga slug
        if (!routeParams || typeof routeParams.slug !== 'string') {
          return Response.json({ error: 'Slug no válido' }, { status: 400 });
        }

        const { slug } = routeParams; // Ahora podemos acceder a slug de forma segura
        const product = await req.payload.find({
          collection: 'products',
          where: {
            slug: {
              equals: slug,
            },
          },
        });

        if (!product.docs.length) {
          return Response.json({ error: 'Producto no encontrado' }, { status: 404 });
        }

        return Response.json(product.docs[0]);
      },
    },
  ],
}
