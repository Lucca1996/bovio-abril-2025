"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { MenuList } from "./menu-list";
import { ItemsMenuMobile } from "./items-menu-mobile";
import { ToggleTheme } from "./toggle-theme";
import { IconButton } from "@/app/(frontend)/components/icon-button";
import { Customer } from "@/payload-types";
import { useFavoriteStore } from '@/store/useFavoriteStore';
import { useEffect } from 'react';
import { useCartStore } from "@/store/useCartStore";
import { navigationMenuTriggerStyle } from "./ui/navigation-menu";

export const NAVBAR_HEIGHT = "4rem"; // 64px

export const Navbar = ({ user }: { user: Customer | null }) => {
    const router = useRouter();
    const { favoritesCount, setFavoritesCount } = useFavoriteStore();
    const { cartCount, setCartCount } = useCartStore();
    
    useEffect(() => {
        // Inicializar el contador con los favoritos del usuario
        setFavoritesCount(user?.favorites?.length || 0);
    }, [user?.favorites?.length, setFavoritesCount]); // Add setFavoritesCount to dependencies
    useEffect(() => {
        // Inicializar el contador con los favoritos del usuario
        setCartCount(user?.cart?.length || 0);
    }, [user?.cart?.length, setCartCount]); // Add setCartCount to dependencies

    return (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 z-50 border-b h-[4rem]">
            <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
                <h1 
                    className="text-2xl sm:text-3xl cursor-pointer" 
                    onClick={() => router.push("/")}
                >
                    Bovio
                    <span className="font-bold">SAS</span>
                </h1>

                <div className="items-center justify-between hidden sm:flex">
                    <MenuList />
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex sm:hidden">
                        <ItemsMenuMobile />
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        {user ? (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <IconButton
                                    onClick={() => router.push("/dashboard")}
                                    icon={<User size={20} />}
                                    className="text-gray-600 hover:text-primary"
                                />
                                <div className="relative">
                                    <IconButton
                                        onClick={() => router.push("/favorites")}
                                        icon={<Heart size={20} />}
                                        className="text-gray-600 hover:text-primary"
                                    />
                                    {favoritesCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {favoritesCount}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <IconButton
                                        onClick={() => router.push("/cart")}
                                        icon={<ShoppingCart size={20} />}
                                        className="text-gray-600 hover:text-primary"
                                    />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={() => router.push("/login")}
                                className={navigationMenuTriggerStyle()}
                            >
                                Iniciar sesión
                            </button>
                        )}
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </div>
    );
};
