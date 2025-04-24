import { getBaseUrl } from './getBaseUrl'

export const getImageUrl = (imagePath: string): string => {
  const baseUrl = getBaseUrl()
  // Si la imagen ya es una URL completa, la devolvemos tal cual
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  // Si la imagen es una ruta relativa, la unimos con la base URL
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
}
