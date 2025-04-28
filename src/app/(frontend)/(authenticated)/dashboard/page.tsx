import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Image from 'next/image';
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'
import LogoutButton from '../components/logout';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingBag, Heart, Settings, User, Clock, MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function page() {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })
    
    // Obtener la imagen de perfil del usuario si existe
    let profileImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4yKnjT4EmZwDGMxrPtjt4xJChaDC79N-AzzfU0uKs8LHI43gM3imE2MA5M6WzttveH8&usqp=CAU"
    
    // Usar verificación segura de tipo con operador opcional y aserción de tipo
    if (user && 'perfil' in user && typeof user.perfil === 'string') {
        profileImage = user.perfil
    }
    
    // Obtener el nombre del usuario si existe
    let userName = user?.email?.split('@')[0] || 'Usuario';
    
    // Verificar si el usuario tiene un nombre personalizado
    if (user && 'nombre' in user && typeof user.nombre === 'string') {
        userName = user.nombre
    }

    return (
        <div>
            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Mi Dashboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Bienvenido a tu panel de control personal
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Panel lateral con información del usuario */}
                        <Card className="md:col-span-1 bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center space-y-4 mb-6">
                                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-primary/20">
                                        <Image 
                                            src={profileImage} 
                                            alt="imagen de perfil del usuario" 
                                            width={96}
                                            height={96}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {userName}
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            {user?.email}
                                        </p>
                                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-2 dark:bg-green-800 dark:text-green-100">
                                            Cliente Activo
                                        </span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <nav className="space-y-2">
                                    <Link href="/dashboard" className="flex items-center space-x-2 p-2 rounded-md bg-primary/10 text-primary font-medium">
                                        <User size={18} />
                                        <span>Perfil</span>
                                    </Link>
                                    <Link href="/favorites" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        <Heart size={18} />
                                        <span>Favoritos</span>
                                    </Link>
                                    <Link href="/cart" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                                        <ShoppingBag size={18} />
                                        <span>Carrito</span>
                                    </Link>
                                    <div className="pt-4">
                                        <LogoutButton />
                                    </div>
                                </nav>
                            </CardContent>
                        </Card>

                        {/* Panel principal con pestañas */}
                        <div className="md:col-span-3">
                            <Tabs defaultValue="profile" className="w-full">
                                <TabsList className="grid grid-cols-3 mb-6">
                                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                                    <TabsTrigger value="orders">Pedidos</TabsTrigger>
                                    <TabsTrigger value="addresses">Direcciones</TabsTrigger>
                                </TabsList>

                                <TabsContent value="profile">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Información Personal</CardTitle>
                                            <CardDescription>
                                                Gestiona tu información de perfil
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</h3>
                                                    <p className="mt-1 text-gray-900 dark:text-white">{userName || 'No especificado'}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                                                    <p className="mt-1 text-gray-900 dark:text-white">{user?.email}</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</h3>
                                                    <p className="mt-1 text-gray-900 dark:text-white">No especificado</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de registro</h3>
                                                    <p className="mt-1 text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="flex justify-end">
                                                <Button variant="outline" className="mr-2">
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Editar Perfil
                                                </Button>
                                                <Button>
                                                    Guardar Cambios
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="orders">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Historial de Pedidos</CardTitle>
                                            <CardDescription>
                                                Visualiza y gestiona tus pedidos anteriores
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center py-8">
                                                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No hay pedidos recientes</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Tus pedidos aparecerán aquí cuando realices una compra
                                                </p>
                                                <div className="mt-6">
                                                    <Link href="/catalogo">
                                                        <Button>Explorar Productos</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="addresses">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Mis Direcciones</CardTitle>
                                            <CardDescription>
                                                Gestiona tus direcciones de envío
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-center py-8">
                                                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No hay direcciones guardadas</h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Añade direcciones para agilizar tus compras
                                                </p>
                                                <div className="mt-6">
                                                    <Button variant="outline">
                                                        Añadir Nueva Dirección
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
