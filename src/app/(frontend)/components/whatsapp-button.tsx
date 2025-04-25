"use client"

import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

interface WhatsAppButtonProps {
  floating?: boolean
  text?: string
  className?: string
}

export const WhatsAppButton = ({
  floating = false,
  text = "Chatea con nosotros por WhatsApp",
  className = ""
}: WhatsAppButtonProps) => {
  // Número de WhatsApp con formato internacional para Argentina
  const phoneNumber = "5493816237710"
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  if (floating) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 ${className}`}
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp className="text-white text-3xl" />
        </a>
      </motion.div>
    )
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2  bg-slate-900 text-white rounded-full shadow-md hover:bg-green-600 transition-colors duration-300 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaWhatsapp className="text-xl" />
      <span>{text}</span>
    </motion.a>
  )
}