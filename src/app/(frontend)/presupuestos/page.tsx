'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, MessageSquare, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';



export default function PresupuestosPage() {
  // Estado para el formulario detallado
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  

  
  // Función para enviar el formulario detallado
  const enviarFormularioDetallado = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre || !email || !descripcion) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Aquí iría la lógica para enviar el formulario al backend
    toast.success('¡Solicitud enviada! Te contactaremos pronto para concretar los detalles.');
    
    // Resetear formulario
    setNombre('');
    setEmail('');
    setTelefono('');
    setDescripcion('');
  };
  


  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Solicita tu Presupuesto de Carpintería
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Solicita una consulta personalizada para tu proyecto de carpintería. Te contactaremos para brindarte un presupuesto detallado.
          </p>
        </div>
          
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
          <CardContent className="pt-6">
            <div className="text-center mb-8">
              <MessageSquare className="mx-auto h-12 w-12 text-slate-600 dark:text-slate-400 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                Consulta Detallada
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Cuéntanos sobre tu proyecto y te contactaremos con un presupuesto personalizado
              </p>
            </div>
            
            <form onSubmit={enviarFormularioDetallado} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-base font-medium">
                    Nombre completo *
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre completo"
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-base font-medium">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Tu número de teléfono"
                    className="h-12"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion" className="text-base font-medium">
                  Descripción del proyecto *
                </Label>
                <Textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe tu proyecto: tipo de trabajo, materiales preferidos, medidas aproximadas, plazos, etc."
                  className="min-h-[120px] resize-none"
                  required
                />
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-900/20 p-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-1">
                      ¿Qué sucede después?
                    </h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Te contactaremos en menos de 24 horas</li>
                      <li>• Programaremos una visita técnica (si es necesario)</li>
                      <li>• Recibirás un presupuesto detallado y personalizado</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
              >
                <Send className="mr-2 h-4 w-4" />
                Enviar Solicitud
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-12">
          <div className="bg-slate-50 dark:bg-slate-900/20 p-6 rounded-lg">
            <FileText className="mx-auto h-8 w-8 text-slate-600 dark:text-slate-400 mb-3" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              ¿Necesitas ayuda adicional?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              También puedes contactarnos directamente para una consulta más personalizada
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="tel:+543816237710"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                📞 (381) 623-7710
              </Link>
              <Link 
                href="mailto:info@bovio.com"
                className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                ✉️ info@bovio.com
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}