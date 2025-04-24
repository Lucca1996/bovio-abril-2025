import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Image from 'next/image';
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers.js'
import LogoutButton from '../components/logout';

export const dynamic = 'force-dynamic';

export default async function page() {

    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })


    return  <div>
            <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Perfil de Usuario
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">
                                Gestiona tu información personal
                            </p>
                        </div>

                        <Separator className="my-6" />

                        <div className="space-y-6">
                            {/* Información del Usuario */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="text-xl font-bold text-primary">
                                            <Image 
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI4yKnjT4EmZwDGMxrPtjt4xJChaDC79N-AzzfU0uKs8LHI43gM3imE2MA5M6WzttveH8&usqp=CAU" 
                                                alt="imagen generica de usuario" 
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            {user?.email}
                                        </h2>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {user?.email}
                                        </p>
                                </div>
                                    </div>
                                            <Separator className="my-6" />
                                        <div className='flex items-center space-x-4'>
                                        <Button
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Historial de compras
                                    </Button>
                                    
                                        </div>
                            </div>

                            <Separator className="my-6" />

                            {/* Acciones */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Acciones de cuenta
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Configuración
                                    </Button>
                                    <LogoutButton/>
                                    
                                </div>
                            <Separator className="my-6" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
        </div>
    
}
