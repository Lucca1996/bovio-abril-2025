"use client"

import { useState } from "react"
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface WhatsAppChatProps {
  phoneNumber?: string
  buttonText?: string
  className?: string
  floating?: boolean
}

export const WhatsAppChat = ({
  phoneNumber = "5493816237710",
  buttonText = "Chatea con nosotros",
  className = "",
  floating = false
}: WhatsAppChatProps) => {
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSendMessage = () => {
    if (!message.trim()) return
    
    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message)
    
    // Abrir WhatsApp en una nueva pestaña con el mensaje predefinido
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
    
    // Cerrar el diálogo y limpiar el mensaje
    setIsOpen(false)
    setMessage("")
  }

  const ChatButton = () => {
    if (floating) {
      return (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button 
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full  bg-slate-900 hover:bg-green-600 flex items-center justify-center shadow-lg"
          >
            <FaWhatsapp className="text-white text-3xl" />
          </Button>
        </motion.div>
      )
    }
    
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white ${className}`}
      >
        <FaWhatsapp className="text-xl" />
        <span>{buttonText}</span>
      </Button>
    )
  }

  return (
    <>
      <ChatButton />
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FaWhatsapp className="text-green-500" />
              <span>Enviar mensaje por WhatsApp</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-2">
              Escribe tu mensaje y te responderemos lo antes posible:
            </p>
            
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hola, me gustaría obtener más información sobre..."
              className="min-h-[120px] mb-4"
            />
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
              >
                <span>Enviar</span>
                <FaPaperPlane />
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            Al enviar, serás redirigido a WhatsApp para continuar la conversación
          </p>
        </DialogContent>
      </Dialog>
    </>
  )
}