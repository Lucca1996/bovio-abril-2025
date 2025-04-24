import { getPayload } from 'payload'
import config from '@/payload.config'
import { mapPayloadProductToProductType } from '../utils/product-mapper'

export const getProduct = async (slug: string) => {
  try {
    const payload = await getPayload({ config: await config })
    const { docs: products } = await payload.find({
      collection: 'products',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
    })

    if (!products[0]) return null

    const product = products[0]
    return mapPayloadProductToProductType(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}
