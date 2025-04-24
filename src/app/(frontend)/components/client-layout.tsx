// src/app/(frontend)/components/client-layout.tsx
"use client"

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

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
        <AnimatePresence mode="wait" onExitComplete={() => setIsExiting(false)}>
            <motion.div
                key={currentPath}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }} // Duración de la animación
                onAnimationStart={() => setIsExiting(true)} // Inicia el fade out
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}