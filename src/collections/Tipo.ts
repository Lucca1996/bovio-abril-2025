import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const Tipo: CollectionConfig = {
  slug: 'tipo',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'imgUrl',
      type: 'text',
    },
    ...slugField(),
  ],
}