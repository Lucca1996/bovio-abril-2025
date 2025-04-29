'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
 import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, ChevronRight, Send, Calculator, MessageSquare, Clock, Ruler, FileText, Camera } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

// Tipos de proyectos disponibles para carpintería
const tiposProyecto = [
  { id: 'muebles', nombre: 'Muebles a Medida', precioBase: 1500, icono: '🪑' },
  { id: 'cocina', nombre: 'Cocinas Integrales', precioBase: 3000, icono: '🍳' },
  { id: 'armarios', nombre: 'Armarios y Vestidores', precioBase: 2500, icono: '👔' },
  { id: 'puertas', nombre: 'Puertas y Ventanas', precioBase: 1200, icono: '🚪' },
  { id: 'exterior', nombre: 'Carpintería Exterior', precioBase: 2000, icono: '🏡' },
  { id: 'restauracion', nombre: 'Restauración', precioBase: 800, icono: '🔨' },
  // Nuevos tipos de proyectos empresariales
  { id: 'lobby', nombre: 'Lobbies Corporativos', precioBase: 3500, icono: '🏢' },
  { id: 'oficinas', nombre: 'Mobiliario de Oficinas', precioBase: 2800, icono: '💼' },
  { id: 'salas', nombre: 'Salas de Reuniones', precioBase: 3200, icono: '🔊' },
  { id: 'recepciones', nombre: 'Recepciones', precioBase: 2600, icono: '📋' },
];

// Factores multiplicadores para complejidad
const factoresComplejidad = {
  baja: 1,
  media: 1.5,
  alta: 2.2,
};

// Factores multiplicadores para urgencia
const factoresUrgencia = {
  normal: 1,
  urgente: 1.3,
  inmediata: 1.6,
};

// Tipos de madera y sus factores
const tiposMadera = [
  { id: 'pino', nombre: 'Pino', factor: 1, descripcion: 'Económica y versátil' },
  { id: 'roble', nombre: 'Roble', factor: 1.8, descripcion: 'Resistente y duradera' },
  { id: 'nogal', nombre: 'Nogal', factor: 2.2, descripcion: 'Elegante y de alta calidad' },
  { id: 'cedro', nombre: 'Cedro', factor: 1.6, descripcion: 'Aromática y resistente a insectos' },
  { id: 'melamina', nombre: 'Melamina', factor: 0.8, descripcion: 'Práctica y económica' },
];

// Opciones de acabados y sus factores
const tiposAcabados = [
  { id: 'natural', nombre: 'Natural', factor: 1, descripcion: 'Sin tratamiento adicional' },
  { id: 'barniz', nombre: 'Barnizado', factor: 1.2, descripcion: 'Protección básica' },
  { id: 'lacado', nombre: 'Lacado', factor: 1.4, descripcion: 'Acabado brillante y duradero' },
  { id: 'tinte', nombre: 'Teñido', factor: 1.3, descripcion: 'Color personalizado' },
  { id: 'envejecido', nombre: 'Envejecido', factor: 1.5, descripcion: 'Aspecto vintage' },
];

// Opciones adicionales para proyectos (reemplaza la funcionalidad de subir imagen)
const opcionesAdicionales = [
  { id: 'ninguna', nombre: 'Sin opciones adicionales', factor: 1, descripcion: 'Proyecto básico' },
  { id: 'herrajes', nombre: 'Herrajes Premium', factor: 1.15, descripcion: 'Herrajes de alta calidad y durabilidad' },
  { id: 'iluminacion', nombre: 'Iluminación LED', factor: 1.2, descripcion: 'Sistema de iluminación integrado' },
  { id: 'personalizado', nombre: 'Diseño Personalizado', factor: 1.25, descripcion: 'Diseños exclusivos a medida' },
  { id: 'ecologico', nombre: 'Materiales Ecológicos', factor: 1.18, descripcion: 'Materiales sostenibles certificados' },
  { id: 'ignifugo', nombre: 'Tratamiento Ignífugo', factor: 1.3, descripcion: 'Protección contra incendios' },
];

// Tipos de espacios (para proyectos empresariales)
const tiposEspacio = [
  { id: 'pequeno', nombre: 'Pequeño', factor: 1, descripcion: 'Hasta 50m²' },
  { id: 'mediano', nombre: 'Mediano', factor: 1.3, descripcion: '50-150m²' },
  { id: 'grande', nombre: 'Grande', factor: 1.6, descripcion: '150-300m²' },
  { id: 'muy_grande', nombre: 'Muy Grande', factor: 2, descripcion: 'Más de 300m²' },
];

export default function PresupuestosPage() {
  // Estado para el formulario rápido
  const [tipoProyecto, setTipoProyecto] = useState<string>('');
  const [complejidad, setComplejidad] = useState<string>('media');
  const [urgencia, setUrgencia] = useState<string>('normal');
  const [tipoMadera, setTipoMadera] = useState<string>('pino');
  const [tipoAcabado, setTipoAcabado] = useState<string>('natural');
  const [metrosCuadrados, setMetrosCuadrados] = useState<number>(5);
  const [imagenReferencia, setImagenReferencia] = useState<File | null>(null);
  
  // Agregar estados faltantes
  const [opcionAdicional, setOpcionAdicional] = useState<string>('ninguna');
  const [tipoEspacio, _setTipoEspacio] = useState<string>('pequeno');
  const [esProyectoEmpresarial, setEsProyectoEmpresarial] = useState<boolean>(false);
  
  // Estado para el formulario detallado
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  
  // Estado para mostrar el resultado del presupuesto
  const [presupuesto, setPresupuesto] = useState<number | null>(null);
  const [tiempoEstimado, setTiempoEstimado] = useState<string>('');
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  
  // Estado para el paso actual del wizard
  const [pasoActual, setPasoActual] = useState<number>(1);
  
  // Función para calcular el presupuesto aproximado
  const calcularPresupuesto = () => {
    const proyectoSeleccionado = tiposProyecto.find(p => p.id === tipoProyecto);
    const maderaSeleccionada = tiposMadera.find(m => m.id === tipoMadera);
    const acabadoSeleccionado = tiposAcabados.find(a => a.id === tipoAcabado);
    const opcionSeleccionada = opcionesAdicionales.find(o => o.id === opcionAdicional);
    
    if (!proyectoSeleccionado || !maderaSeleccionada || !acabadoSeleccionado || !opcionSeleccionada) {
      toast.error('Por favor completa todas las selecciones necesarias');
      return;
    }
    
    let precioBase = proyectoSeleccionado.precioBase;
    const factorComplejidad = factoresComplejidad[complejidad as keyof typeof factoresComplejidad];
    const factorUrgencia = factoresUrgencia[urgencia as keyof typeof factoresUrgencia];
    const factorMadera = maderaSeleccionada.factor;
    const factorAcabado = acabadoSeleccionado.factor;
    const factorOpcion = opcionSeleccionada.factor;
    
    // Aplicar factor de tipo de espacio para proyectos empresariales
    let factorEspacio = 1;
    if (esProyectoEmpresarial) {
      const espacioSeleccionado = tiposEspacio.find(e => e.id === tipoEspacio);
      if (espacioSeleccionado) {
        factorEspacio = espacioSeleccionado.factor;
      }
      
      // Incrementar precio base para proyectos empresariales
      precioBase *= 1.2;
    }
    
    // El precio se calcula por metro cuadrado con todos los factores
    const total = Math.round(precioBase * factorComplejidad * factorUrgencia * factorMadera * factorAcabado * factorOpcion * factorEspacio * metrosCuadrados);
    
    // Calcular tiempo estimado
    let tiempo = '';
    if (urgencia === 'inmediata') {
      tiempo = '1-2 semanas';
    } else if (urgencia === 'urgente') {
      tiempo = '2-3 semanas';
    } else {
      if (complejidad === 'alta') {
        tiempo = '4-6 semanas';
      } else if (complejidad === 'media') {
        tiempo = '3-4 semanas';
      } else {
        tiempo = '2-3 semanas';
      }
    }
    
    // Ajustar tiempo si hay acabado especial
    if (tipoAcabado !== 'natural' && tipoAcabado !== 'barniz') {
      // Añadir tiempo adicional para acabados más complejos
      const tiempoPartes = tiempo.split('-');
      const minSemanas = parseInt(tiempoPartes[0]) + 1;
      const maxSemanas = parseInt(tiempoPartes[1]) + 1;
      tiempo = `${minSemanas}-${maxSemanas} semanas`;
    }
    
    // Ajustar tiempo para proyectos empresariales
    if (esProyectoEmpresarial) {
      const tiempoPartes = tiempo.split('-');
      const minSemanas = parseInt(tiempoPartes[0]) + 2;
      const maxSemanas = parseInt(tiempoPartes[1]) + 3;
      tiempo = `${minSemanas}-${maxSemanas} semanas`;
    }
    
    setPresupuesto(total);
    setTiempoEstimado(tiempo);
    setMostrarResultado(true);
  };
  
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
  
  // Función para avanzar al siguiente paso
  const siguientePaso = () => {
    if (pasoActual === 1 && !tipoProyecto) {
      toast.error('Por favor selecciona un tipo de proyecto');
      return;
    }
    
    if (pasoActual === 2 && !tipoMadera) {
      toast.error('Por favor selecciona un material');
      return;
    }
    
    if (pasoActual === 3 && !tipoAcabado) {
      toast.error('Por favor selecciona un tipo de acabado');
      return;
    }
    
    if (pasoActual < 4) {
      setPasoActual(pasoActual + 1);
    } else {
      calcularPresupuesto();
    }
  };
  
  // Función para retroceder al paso anterior
  const pasoAnterior = () => {
    if (pasoActual > 1) {
      setPasoActual(pasoActual - 1);
    }
  };
  
  // Manejar carga de imagen
  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenReferencia(e.target.files[0]);
      toast.success('Imagen de referencia cargada correctamente');
    }
  };
  
  // Generar enlace de WhatsApp
  const generarEnlaceWhatsApp = () => {
    const proyectoSeleccionado = tiposProyecto.find(p => p.id === tipoProyecto);
    const maderaSeleccionada = tiposMadera.find(m => m.id === tipoMadera);
    const acabadoSeleccionado = tiposAcabados.find(a => a.id === tipoAcabado);
    const opcionSeleccionada = opcionesAdicionales.find(o => o.id === opcionAdicional);
    
    let mensaje = `Hola, estoy interesado en un presupuesto para ${proyectoSeleccionado?.nombre || 'un proyecto de carpintería'}. `;
    
    if (esProyectoEmpresarial) {
      const espacioSeleccionado = tiposEspacio.find(e => e.id === tipoEspacio);
      mensaje += `Proyecto empresarial. Nivel de personalización: ${espacioSeleccionado?.nombre || 'No especificado'}. `;
    }
    
    mensaje += `Material: ${maderaSeleccionada?.nombre || 'a definir'}. Acabado: ${acabadoSeleccionado?.nombre || 'a definir'}. `;
    mensaje += `Complejidad: ${complejidad}. Urgencia: ${urgencia}. Metros cuadrados aproximados: ${metrosCuadrados}. `;
    mensaje += `Opciones adicionales: ${opcionSeleccionada?.nombre || 'Ninguna'}.`;
    
    return `https://wa.me/3816237710?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Solicita tu Presupuesto de Carpintería
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Obtén un presupuesto aproximado en segundos o solicita una consulta personalizada para proyectos más complejos.
          </p>
        </div>
        
        <Tabs defaultValue="rapido" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="rapido" className="text-base">
              <Calculator className="mr-2 h-4 w-4" />
              Presupuesto Rápido
            </TabsTrigger>
            <TabsTrigger value="detallado" className="text-base">
              <MessageSquare className="mr-2 h-4 w-4" />
              Consulta Detallada
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="rapido">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="pt-6">
                {!mostrarResultado && (
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      {[1, 2, 3, 4].map((paso) => (
                        <div key={paso} className="text-center">
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 transition-all duration-300 ${
                              pasoActual === paso 
                                ? 'bg-slate-600 text-white scale-110 shadow-md' 
                                : pasoActual > paso 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {pasoActual > paso ? <Check className="h-4 w-4" /> : paso}
                          </div>
                          <p className={`text-xs ${pasoActual === paso ? 'text-slate-700 dark:text-slate-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                            {paso === 1 ? 'Proyecto' : paso === 2 ? 'Material' : paso === 3 ? 'Detalles' : 'Medidas'}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-600 dark:bg-slate-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(pasoActual / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                {!mostrarResultado ? (
                  <div className="space-y-6">
                    {/* Selector de tipo de proyecto (residencial o empresarial) */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-center mb-4">Tipo de proyecto</h3>
                      <RadioGroup 
                        value={esProyectoEmpresarial ? "empresarial" : "residencial"} 
                        onValueChange={(value) => setEsProyectoEmpresarial(value === "empresarial")}
                        className="flex justify-center space-x-8 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="residencial" id="tipo-residencial" />
                          <Label htmlFor="tipo-residencial">Residencial</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="empresarial" id="tipo-empresarial" />
                          <Label htmlFor="tipo-empresarial">Empresarial</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    {pasoActual === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-center mb-6">¿Qué tipo de trabajo necesitas?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {tiposProyecto
                            .filter(tipo => esProyectoEmpresarial ? 
                              ['lobby', 'oficinas', 'salas', 'recepciones'].includes(tipo.id) : 
                              !['lobby', 'oficinas', 'salas', 'recepciones'].includes(tipo.id))
                            .map((tipo) => (
                              <div 
                                key={tipo.id}
                                onClick={() => setTipoProyecto(tipo.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 ${
                                  tipoProyecto === tipo.id 
                                    ? 'border-slate-600 bg-slate-50 dark:bg-slate-900/20 shadow-md scale-105' 
                                    : 'border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <div className="text-3xl mb-2">{tipo.icono}</div>
                                <h4 className="font-medium">{tipo.nombre}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  Desde ${tipo.precioBase}/m²
                                </p>
                              </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Paso 2: Material */}
                    {pasoActual === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-center mb-6">Selecciona el material</h3>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tiposMadera.map((madera) => (
                              <div 
                                key={madera.id}
                                onClick={() => setTipoMadera(madera.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 group ${
                                  tipoMadera === madera.id 
                                    ? 'border-slate-600 bg-slate-50 dark:bg-slate-700/30 shadow-md' 
                                    : 'border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <h4 className="font-medium">{madera.nombre}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  {madera.descripcion}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6">
                            <Label className="text-base">Nivel de complejidad</Label>
                            <RadioGroup 
                              value={complejidad} 
                              onValueChange={setComplejidad}
                              className="flex space-x-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="baja" id="complejidad-baja" />
                                <Label htmlFor="complejidad-baja">Básica</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="media" id="complejidad-media" />
                                <Label htmlFor="complejidad-media">Estándar</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="alta" id="complejidad-alta" />
                                <Label htmlFor="complejidad-alta">Premium</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          <div>
                            <Label className="text-base">Urgencia del trabajo</Label>
                            <RadioGroup 
                              value={urgencia} 
                              onValueChange={setUrgencia}
                              className="flex space-x-4 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="normal" id="urgencia-normal" />
                                <Label htmlFor="urgencia-normal">Normal</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="urgente" id="urgencia-urgente" />
                                <Label htmlFor="urgencia-urgente">Prioritario</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="inmediata" id="urgencia-inmediata" />
                                <Label htmlFor="urgencia-inmediata">Urgente</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Paso 3: Acabados y opciones adicionales */}
                    {pasoActual === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-center mb-6">Acabados y opciones adicionales</h3>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {tiposAcabados.map((acabado) => (
                              <div 
                                key={acabado.id}
                                onClick={() => setTipoAcabado(acabado.id)}
                                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-105 ${
                                  tipoAcabado === acabado.id 
                                    ? 'border-slate-600 bg-slate-50 dark:bg-slate-900/20 shadow-md' 
                                    : 'border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium">{acabado.nombre}</h4>
                                  {tipoAcabado === acabado.id && (
                                    <div className="bg-slate-600 text-white rounded-full p-1">
                                      <Check className="h-3 w-3" />
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                  {acabado.descripcion}
                                </p>
                                <div className="mt-2 h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-slate-600 rounded-full transition-all duration-300"
                                    style={{ width: `${acabado.factor * 60}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-8">
                            <h4 className="text-lg font-medium mb-4">Opciones adicionales</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {opcionesAdicionales.map((opcion) => (
                                <div 
                                  key={opcion.id}
                                  onClick={() => setOpcionAdicional(opcion.id)}
                                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                                    opcionAdicional === opcion.id 
                                      ? 'border-slate-600 bg-slate-50 dark:bg-slate-700/30 shadow-md' 
                                      : 'border-slate-200 dark:border-slate-700'
                                  }`}
                                >
                                  <h4 className="font-medium">{opcion.nombre}</h4>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {opcion.descripcion}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Paso 4: Dimensiones y detalles finales */}
                    {/* Paso 4: Medidas */}
                    {pasoActual === 4 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <h3 className="text-xl font-semibold text-center mb-6">Dimensiones aproximadas</h3>
                        
                        <div className="space-y-8">
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl">
                            <Label className="text-base mb-6 block">Metros cuadrados aproximados: <span className="font-bold text-slate-600">{metrosCuadrados} m²</span></Label>
                            
                            <div className="py-4">
                              <Slider
                                value={[metrosCuadrados]}
                                min={1}
                                max={100}
                                step={1}
                                onValueChange={(value) => setMetrosCuadrados(value[0])}
                                className="my-4"
                              />
                              
                              <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                                <span>1 m²</span>
                                <span>50 m²</span>
                                <span>100 m²</span>
                              </div>
                            </div>
                            
                            <div className="mt-6 bg-slate-50 dark:bg-slate-900/10 p-4 rounded-lg border border-slate-100 dark:border-slate-900/20">
                              <p className="text-sm text-slate-800 dark:text-slate-400">
                                <span className="font-medium">Rango de precio estimado:</span> $
                                {Math.round(
                                  metrosCuadrados * 
                                  (tiposProyecto.find(p => p.id === tipoProyecto)?.precioBase || 0) * 
                                  factoresComplejidad[complejidad as keyof typeof factoresComplejidad] * 
                                  (tiposMadera.find(m => m.id === tipoMadera)?.factor || 1) * 0.8
                                ).toLocaleString()} - $
                                {Math.round(
                                  metrosCuadrados * 
                                  (tiposProyecto.find(p => p.id === tipoProyecto)?.precioBase || 0) * 
                                  factoresComplejidad[complejidad as keyof typeof factoresComplejidad] * 
                                  (tiposMadera.find(m => m.id === tipoMadera)?.factor || 1) * 1.2
                                ).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                            <p>En el siguiente paso obtendrás un presupuesto estimado basado en tus selecciones.</p>
                            <p>Recuerda que este es un cálculo aproximado y puede variar según los detalles específicos del proyecto.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                 
                    
                    {/* Botones de navegación - MANTENER SOLO ESTE CONJUNTO DE BOTONES */}
                    {!mostrarResultado && (
                      <div className="flex justify-between mt-8">
                        <Button
                          onClick={pasoAnterior}
                          variant="outline"
                          disabled={pasoActual === 1}
                          className={`transition-all duration-300 ${pasoActual === 1 ? 'opacity-0' : 'opacity-100'}`}
                        >
                          <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
                          <span className="mr-2">Anterior</span>
                        </Button>
                        
                        <Button 
                          onClick={siguientePaso}
                          className="bg-slate-600 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105"
                        >
                          {pasoActual < 4 ? (
                            <>
                              <span className="mr-2">Siguiente</span>
                              <ChevronRight className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              <span className="mr-2">Calcular</span>
                              <Calculator className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                    
                   
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-center py-6"
                  >
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Tu Presupuesto Estimado</h3>
                      <p className="text-slate-600 dark:text-slate-400">Basado en la información proporcionada</p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900/20 rounded-xl p-6 mb-6 transform transition-all duration-500 hover:shadow-lg">
                      <div className="text-4xl font-bold text-slate-800 dark:text-slate-400 mb-2">
                        ${presupuesto?.toLocaleString()}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">Precio estimado total</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4 text-left">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Tiempo estimado</p>
                          <p className="font-medium flex items-center justify-center md:justify-start">
                            <Clock className="h-4 w-4 mr-1 text-slate-600" /> {tiempoEstimado}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Superficie</p>
                          <p className="font-medium flex items-center justify-center md:justify-start">
                            <Ruler className="h-4 w-4 mr-1 text-slate-600" /> {metrosCuadrados} m²
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Este es un presupuesto aproximado. Para un presupuesto detallado, contáctanos.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button 
                          onClick={() => {
                            setMostrarResultado(false);
                            setPasoActual(1);
                          }}
                          variant="outline"
                          className="group"
                        >
                          <span className="transform transition-transform group-hover:-translate-x-1">←</span>
                          <span className="ml-2">Volver a empezar</span>
                        </Button>
                        
                        <Button asChild className="bg-green-600 hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                          <Link href={generarEnlaceWhatsApp()} target="_blank">
                            <span className="mr-2">Contactar por WhatsApp</span>
                            <Send className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detallado">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] perspective-1000">
              <CardContent className="pt-6">
                <form onSubmit={enviarFormularioDetallado} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nombre" className="text-base">Nombre completo</Label>
                        <Input 
                          id="nombre" 
                          value={nombre} 
                          onChange={(e) => setNombre(e.target.value)} 
                          placeholder="Tu nombre" 
                          required 
                          className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-base">Correo electrónico</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          placeholder="tu@email.com" 
                          required 
                          className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="telefono" className="text-base">Teléfono (opcional)</Label>
                        <Input 
                          id="telefono" 
                          value={telefono} 
                          onChange={(e) => setTelefono(e.target.value)} 
                          placeholder="Tu número de teléfono" 
                          className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="descripcion" className="text-base">Descripción del proyecto</Label>
                      <Textarea 
                        id="descripcion" 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        placeholder="Describe tu proyecto, incluyendo tipo de mueble, materiales preferidos, dimensiones aproximadas, etc." 
                        required 
                        className="mt-1 min-h-[150px] transition-all duration-300 focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="relative">
                      <Label htmlFor="imagen" className="text-base">Imagen de referencia (opcional)</Label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg transition-all duration-300 hover:border-slate-500 group">
                        <div className="space-y-2 text-center">
                          <Camera className="mx-auto h-12 w-12 text-slate-400 group-hover:text-slate-500 transition-all duration-300" />
                          <div className="flex text-sm text-slate-600 dark:text-slate-400">
                            <label htmlFor="imagen" className="relative cursor-pointer rounded-md font-medium text-slate-600 hover:text-slate-500 focus-within:outline-none">
                              <span>Sube una imagen</span>
                              <Input 
                                id="imagen" 
                                type="file" 
                                accept="image/*" 
                                className="sr-only" 
                                onChange={handleImagenChange} 
                              />
                            </label>
                            <p className="pl-1">o arrastra y suelta</p>
                          </div>
                          <p className="text-xs text-slate-500">PNG, JPG, GIF hasta 10MB</p>
                          {imagenReferencia && (
                            <p className="text-xs text-green-600 font-medium flex items-center justify-center">
                              <Check className="h-3 w-3 mr-1" /> {imagenReferencia.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      className="bg-slate-600 hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 px-8 py-2 h-auto text-base"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Solicitar presupuesto detallado
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}