"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { MenuList } from "./menu-list";
import { ItemsMenuMobile } from "./items-menu-mobile";
import { ToggleTheme } from "./toggle-theme";
import { IconButton } from "@/app/(frontend)/components/icon-button";
import { Customer } from "@/payload-types";
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useEffect, useState, useRef } from 'react';
import { useCartStore } from "@/store/useCartStore";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";
import Link from "next/link";

export const NAVBAR_HEIGHT = "4rem"; // 64px

export const Navbar = ({ user }: { user: Customer | null }) => {
    const router = useRouter();
    const { favoritesCount, setFavoritesCount } = useFavoriteStore();
    const { cartCount, setCartCount } = useCartStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [_, setIsLoaded] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);
    
    // Inicializar contadores
    useEffect(() => {
        setFavoritesCount(user?.favorites?.length || 0);
    }, [user?.favorites?.length, setFavoritesCount]);
    
    useEffect(() => {
        setCartCount(user?.cart?.length || 0);
    }, [user?.cart?.length, setCartCount]);
    
    // Efecto para detectar scroll y aplicar sombra
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        setIsLoaded(true);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/* Navbar principal con semántica adecuada */}
            <nav 
                ref={navbarRef}
                className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out
                    ${isScrolled ? 'shadow-md' : 'shadow-none'}
                    backdrop-blur-md bg-white/90 dark:bg-gray-900/90
                    border-b border-gray-200 dark:border-gray-800`}
                role="navigation"
                aria-label="Navegación principal"
            >
                <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
                    {/* Logo con animación de escala */}
                    <Link 
                        href="/"
                        className="text-2xl sm:text-3xl  transition-all duration-300 hover:scale-105 focus:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                        aria-label="Bovio SAS - Página de inicio"
                    >
                        Bovio
                        <span className="font-bold">SAS</span>
                    </Link>

                    {/* Menú de navegación desktop */}
                    <div className="items-center justify-between hidden lg:flex">
                        <MenuList />
                    </div>

                    {/* Controles de usuario y menú móvil */}
                    <div className="flex items-center gap-4">
                        {/* Menú móvil */}
                        <div className="flex lg:hidden">
                            <ItemsMenuMobile />
                        </div>

                        {/* Controles de usuario */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {user ? (
                                <div className="flex items-center gap-2 sm:gap-4">
                                    {/* Perfil de usuario */}
                                    <IconButton
                                        onClick={() => router.push("/dashboard")}
                                        icon={<User size={20} />}
                                        className="text-gray-600 hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                                        aria-label="Perfil de usuario"
                                    />
                                    
                                    {/* Favoritos */}
                                    <div className="relative">
                                        <IconButton
                                            onClick={() => router.push("/favorites")}
                                            icon={<Heart size={20} />}
                                            className="text-gray-600 hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                                            aria-label="Favoritos"
                                        />
                                        {favoritesCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-label={`${favoritesCount} productos en favoritos`}>
                                                {favoritesCount}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Carrito */}
                                    <div className="relative">
                                        <IconButton
                                            onClick={() => router.push("/cart")}
                                            icon={<ShoppingCart size={20} />}
                                            className="text-gray-600 hover:text-primary transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full"
                                            aria-label="Carrito de compras"
                                        />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" aria-label={`${cartCount} productos en el carrito`}>
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => router.push("/login")}
                                    className={`${navigationMenuTriggerStyle()} transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                                    aria-label="Iniciar sesión"
                                >
                                    Iniciar sesión
                                </button>
                            )}
                            <ToggleTheme />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
