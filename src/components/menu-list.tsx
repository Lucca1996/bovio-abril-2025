"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "A medida",
        href: "/medida",
        description:
            "Realizamos encargos personalizados que se ajustan a tus necesidades.",
    },
    {
        title: "Por catalogo",
        href: "/catalogo",
        description:
            "Disfruta de nuestra variedad de diseños con la mejor calidad de nuestra marca.",
    },
]

export function MenuList() {
    const pathname = usePathname();
    const [_, setIsMenuOpen] = React.useState(false);
    
    // Retraso para evitar triggers accidentales
    const handleMenuOpen = (open: boolean) => {
        if (open) {
            const timer = setTimeout(() => {
                setIsMenuOpen(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsMenuOpen(false);
        }
    };
    
    // Rutas principales para destacar la activa - Reordenadas según solicitud
    const mainRoutes = [
        { path: "/", label: "Inicio" },
        { path: "/galeria", label: "Galeria" },
        { path: "/about", label: "Sobre nosotros" },
        { path: "/contacto", label: "Contacto" },
    ];
    
    // Determinar si una ruta está activa
    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === path;
        }
        return pathname.startsWith(path);
    };

    return (
        <NavigationMenu className="max-w-none">
            <NavigationMenuList className="space-x-1">
                {/* Inicio - Primer elemento */}
                <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref prefetch>
                        <NavigationMenuLink 
                            className={cn(
                                navigationMenuTriggerStyle(),
                                "relative px-4 py-2 transition-all duration-300 ease-in-out",
                                isActive("/") && "text-primary font-medium"
                            )}
                        >
                            Inicio
                            {isActive("/") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-in-out" />
                            )}
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                
                {/* Equipamiento - Segundo elemento */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger 
                        onMouseEnter={() => handleMenuOpen(true)}
                        onMouseLeave={() => handleMenuOpen(false)}
                        className={cn(
                            "transition-all duration-300 ease-in-out",
                            pathname.startsWith("/equipamento") && "text-primary font-medium"
                        )}
                    >
                        Equipamento
                    </NavigationMenuTrigger>
                    <NavigationMenuContent 
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                        className="animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                    >
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all duration-300 hover:bg-muted"
                                        href="/"
                                    >
                                        <div className="mb-2 text-lg font-medium">
                                            Equipamiento
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            En Bovio SA. Destacan nuestros trabajos para empresas, locales, hospitales.
                                            Conoce más aquí:
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem key="trabajos" href="/mantenimiento" title="Trabajos">
                                Aquí se pueden apreciar referencias reales de nuestros trabajos realizados.
                            </ListItem>
                            <ListItem key="clientes" href="/mantenimiento" title="Nuestros clientes">
                                Forma parte de nuestra familia con clientes como:
                            </ListItem>
                            <ListItem key="presupuestos" href="/mantenimiento" title="Presupuestos">
                                Pide tu presupuesto y/o asesoramiento aquí.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Productos - Tercer elemento */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger 
                        onMouseEnter={() => handleMenuOpen(true)}
                        onMouseLeave={() => handleMenuOpen(false)}
                        className={cn(
                            "transition-all duration-300 ease-in-out",
                            pathname.startsWith("/productos") && "text-primary font-medium"
                        )}
                    >
                        Productos
                    </NavigationMenuTrigger>
                    <NavigationMenuContent 
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                        className="animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                    >
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Resto de elementos del menú */}
                {mainRoutes.slice(1).map((route) => (
                    <NavigationMenuItem key={route.path}>
                        <Link href={route.path} legacyBehavior passHref prefetch>
                            <NavigationMenuLink 
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "relative px-4 py-2 transition-all duration-300 ease-in-out",
                                    isActive(route.path) && "text-primary font-medium"
                                )}
                            >
                                {route.label}
                                {isActive(route.path) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ease-in-out" />
                                )}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
