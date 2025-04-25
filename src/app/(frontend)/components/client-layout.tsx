// src/app/(frontend)/components/client-layout.tsx
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { WhatsAppChat } from "./whatsapp-chat"

interface ClientLayoutProps {
    children: React.ReactNode
}

export const ClientLayout = ({ children }: ClientLayoutProps) => {
    const pathname = usePathname()
    const [isExiting, setIsExiting] = useState(false)
    const [currentPath, setCurrentPath] = useState(pathname)

    useEffect(() => {
        if (!isExiting) {
            setCurrentPath(pathname) // Actualizar la ruta después del fade out
        }
    }, [pathname, isExiting])

    return (
        <main className="flex-grow pt-16">
            <AnimatePresence mode="wait" onExitComplete={() => setIsExiting(false)}>
                <motion.div
                    key={currentPath}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                    }}
                    className="min-h-[calc(100vh-4rem)]"
                    onAnimationStart={() => setIsExiting(true)}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
            
            {/* Botón flotante de WhatsApp con diálogo */}
            <WhatsAppChat floating={true} />
        </main>
    )
}
