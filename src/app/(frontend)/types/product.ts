export interface ProductType {
  id: number
  title: string
  description: string
  price: number
  gallery: {
    id: string
    image: string
    alt: string
    tags?: {
      id: string
      tag: string
      position: number[]
    }[]
  }[]
  technicalSpecs: {
    id: string
    title: string
    value: string
    unit: string
  }[]
  manufacturingProcess: {
    id: string
    step: number
    title: string
    description: string
    image: string | null
  }[]
  certifications: {
    id: string
    type: string
    description: string
  }[]
  finishes: {
    id: string
    type: string
    priceMultiplier: number
    image: string
  }[]
  category: {
    id: number
    name: string
  }
  style: {
    id: number
    title: string
  }
  isFeatured: boolean
  isActive: boolean
  stock: number
  
  publishedAt: string
  slug: string
  slugLock: boolean
  updatedAt: string
  createdAt: string
}
