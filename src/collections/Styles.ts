import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'

import { slugField } from '@/fields/slug'

export const Styles: CollectionConfig = {
  slug: 'style',
  access: {
   
    read: anyone,
    
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
        name: 'imgUrl',
        type: 'text',
        required: false,
      },
      ...slugField(),
  ],
}
