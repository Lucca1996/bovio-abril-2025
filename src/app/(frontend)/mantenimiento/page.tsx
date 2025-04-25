"use client"

import { motion } from "framer-motion"
import { WhatsAppButton } from "../components/whatsapp-button"

export default function MaintenancePage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                {/* Icono de construcción */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <svg
                            className="w-full h-full text-yellow-600 dark:text-yellow-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                        </svg>
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <svg
                            className="w-16 h-16 text-gray-600 dark:text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Título y mensaje */}
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Sitio en Construcción
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Estamos trabajando para mejorar tu experiencia. Volveremos pronto.
                </p>

                {/* Información de contacto */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        ¿Necesitas ayuda?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
                    </p>
                    <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">
                            Email: info@sas.com
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Teléfono: +123 456 789
                        </p>
                    </div>
                    
                    <div className="mt-6">
                        <WhatsAppButton text="Contáctanos por WhatsApp" className="w-full justify-center" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}