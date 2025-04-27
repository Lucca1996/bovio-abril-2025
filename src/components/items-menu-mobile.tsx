"use client"

import { Menu, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect } from 'react';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ItemsMenuMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const pathname = usePathname();
    const menuRef = useRef<HTMLDivElement>(null);
    
    // Cerrar menú al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    
    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setIsOpen(false);
        setOpenSubmenu(null);
    }, [pathname]);

    // Menú con submenús
    const menuItems = [
        { href: "/", label: "Inicio" },
        { 
            label: "Equipamento", 
            submenu: [
                { href: "/jobs", label: "Trabajos" },
                { href: "/ourclients", label: "Nuestros clientes" },
                { href: "/presupuestos", label: "Presupuestos" }
            ]
        },
        { 
            label: "Productos", 
            submenu: [
                { href: "/medida", label: "A medida" },
                { href: "/catalogo", label: "Por catálogo" }
            ]
        },
        { href: "/galeria", label: "Galería" },
        { href: "/about", label: "Sobre nosotros" },
        { href: "/contacto", label: "Contacto" },
    ];
    
    // Determinar si una ruta está activa
    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    // Manejar clic en elemento con submenú
    const handleSubmenuToggle = (label: string) => {
        setOpenSubmenu(openSubmenu === label ? null : label);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div 
                id="mobile-menu"
                className={cn(
                    "fixed top-16 right-4 w-64 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 transition-all duration-300 ease-in-out transform origin-top-right",
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                )}
                aria-hidden={!isOpen}
            >
                {menuItems.map((item) => (
                    <div key={item.href || item.label}>
                        {item.submenu ? (
                            <div>
                                <button
                                    onClick={() => handleSubmenuToggle(item.label)}
                                    className={cn(
                                        "flex items-center justify-between w-full px-4 py-3 text-sm transition-colors duration-300",
                                        pathname.includes(item.label.toLowerCase())
                                            ? 'bg-gray-100 dark:bg-gray-800 text-primary font-medium border-l-2 border-primary'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                                    )}
                                    aria-expanded={openSubmenu === item.label}
                                >
                                    <span>{item.label}</span>
                                    <ChevronRight 
                                        size={16} 
                                        className={cn(
                                            "transition-transform duration-200",
                                            openSubmenu === item.label ? "rotate-90" : ""
                                        )} 
                                    />
                                </button>
                                
                                <div 
                                    className={cn(
                                        "pl-4 overflow-hidden transition-all duration-300 ease-in-out",
                                        openSubmenu === item.label 
                                            ? "max-h-40 opacity-100" 
                                            : "max-h-0 opacity-0"
                                    )}
                                >
                                    {item.submenu.map((subItem) => (
                                        <Link
                                            key={subItem.href}
                                            href={subItem.href}
                                            className={cn(
                                                "block px-4 py-2 text-sm transition-colors duration-300 border-l",
                                                isActive(subItem.href)
                                                    ? 'border-primary text-primary font-medium'
                                                    : 'border-transparent hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-600 dark:text-gray-400'
                                            )}
                                            tabIndex={isOpen ? 0 : -1}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={item.href || "#"}
                                className={cn(
                                    "block px-4 py-3 text-sm transition-colors duration-300",
                                    isActive(item.href || "")
                                        ? 'bg-gray-100 dark:bg-gray-800 text-primary font-medium border-l-2 border-primary'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                                )}
                                tabIndex={isOpen ? 0 : -1}
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
