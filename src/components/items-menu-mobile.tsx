"use client"

import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from 'react';
import { usePathname } from "next/navigation";

export const ItemsMenuMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { href: "/", label: "Inicio" },
        { href: "/catalogo", label: "Catálogo" },
        { href: "/galeria", label: "Galería" },
        { href: "/contacto", label: "Contacto" },
    ];

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Menú"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-2 z-50">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-2 text-sm ${
                                pathname === item.href
                                    ? 'bg-gray-100 dark:bg-gray-800 text-primary'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
