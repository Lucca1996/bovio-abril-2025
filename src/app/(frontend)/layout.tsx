// c:\Users\User\Desktop\lucca\payload-sas\src\app\(frontend)\layout.tsx
import React from 'react'
import './styles.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getUser } from './(authenticated)/actions/getUser'
import { Toaster } from 'sonner'
import { ClientLayout } from './components/client-layout' // Import ClientLayout
import { ThemeProvider } from '@/components/theme-provider'

export const metadata = {
  title: 'SAS - Sistema de Administración de Servicios',
  description: 'Sistema de Administración de Servicios',
}

export const dynamic = 'force-dynamic';

export default async function FrontendLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getUser();

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
                        <Navbar user={user} />
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
