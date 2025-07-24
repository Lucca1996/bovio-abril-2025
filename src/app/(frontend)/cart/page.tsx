'use client'

import { FeaturedProducts } from "../components/featured-products";
import { CartClient } from "./components/cart-client";

export default function CartPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center my-10">
                <h1 className="text-3xl mt-9 font-bold text-gray-900 dark:text-white">
                    Carrito de compras
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                    Revisa los productos que has agregado a tu carrito
                </p>
            </div>
            
            <CartClient />
            
            <div className="mt-16">
                <FeaturedProducts products={[]} />
            </div>
        </main>
    );
}