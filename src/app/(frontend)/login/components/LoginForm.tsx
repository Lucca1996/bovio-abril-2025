"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {FormEvent, ReactElement, useState} from 'react';
import SubmitButton from "../../components/SubmitButton";
import { login, LoginResponse } from "../actions/login";

export default function LoginForm(): ReactElement {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const router = useRouter();

    async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    setIsPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result: LoginResponse = await login({email, password})

    setIsPending(false)

    if (result.success) {
        router.push("/dashboard")
    } else {
        setError(result.error || "Error");
    }
    }
    return <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h2 className="text-3xl mb-7">
                    Bovio<span className="font-bold">SAS</span>
                </h2>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Ingrese con su cuenta
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Correo electrónico
                                </label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="nombre@correo.com"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contraseña
                                </label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700"
                                />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <SubmitButton loading={isPending} text="Iniciar Sesion"/>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿No tienes una cuenta?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-primary hover:underline"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        
}