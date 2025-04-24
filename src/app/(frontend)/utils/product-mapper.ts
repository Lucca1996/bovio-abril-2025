import { Product } from '@/payload-types'
import type { ProductType } from '@/app/(frontend)/types/product'

export const mapPayloadProductToProductType = (product: Product): ProductType => {
  return {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    gallery:
      product.gallery?.map((item) => ({
        id: item.id || '',
        image: item.image ? (typeof item.image === 'string' ? item.image : '') : '',
        alt: item.alt,
      })) || [],
    technicalSpecs:
      product.technicalSpecs?.map((spec) => ({
        id: spec.id || '',
        title: spec.title,
        value: spec.value,
        unit: spec.unit || '',
      })) || [],
    manufacturingProcess:
      product.manufacturingProcess?.map((process) => ({
        id: process.id || '',
        step: process.step,
        title: process.title,
        description: process.description,
        image: process.image ? (typeof process.image === 'string' ? process.image : null) : null,
      })) || [],
    certifications:
      product.certifications?.map((cert) => ({
        id: cert.id || '',
        type: cert.type,
        description: cert.description,
      })) || [],
    finishes:
      product.finishes?.map((finish) => ({
        id: finish.id || '',
        type: finish.type,
        priceMultiplier: finish.priceMultiplier,
        image: finish.image ? (typeof finish.image === 'string' ? finish.image : '') : '',
      })) || [],
    category: {
      id: typeof product.category === 'object' ? product.category.id : product.category,
      name: typeof product.category === 'object' ? product.category.name : '',
    },
    style: {
      id: typeof product.style === 'object' ? product.style.id : product.style,
      title: typeof product.style === 'object' ? product.style.title : '',
    },
    isFeatured: product.isFeatured || false,
    isActive: product.isActive || false,
    stock: product.stock,
    warranty: product.warranty,
    publishedAt: product.publishedAt || '',
    slug: product.slug || '',
    slugLock: product.slugLock || false,
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
  }
}
