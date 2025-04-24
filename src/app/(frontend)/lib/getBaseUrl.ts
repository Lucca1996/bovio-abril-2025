export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // En el navegador
    return window.location.origin
  }

  if (process.env.VERCEL_URL) {
    // En producción en Vercel
    return `https://bovio-sas-gray.vercel.app`
  }

  // En desarrollo local
  return 'http://localhost:3000'
}
