// c:\Users\User\Desktop\lucca\payload-sas\src\app\(frontend)\layout.tsx
import React from 'react'
import './styles.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Toaster } from 'sonner'
import { ClientLayout } from './components/client-layout' // Import ClientLayout
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
    title: 'SAS - Sistema de Administración de Servicios',
    description: 'Sistema de Administración de Servicios',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/favicon-16x16.png', sizes: '16x16' },
        { url: '/favicon-32x32.png', sizes: '32x32' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
  }

export const dynamic = 'force-dynamic';

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        {/* Usar ClientLayout para manejar las animaciones */}
                        <ClientLayout>
                            {children}
                        </ClientLayout>
                        <Footer />
                        <Toaster position="top-center" />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
