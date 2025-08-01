'use client'

import { FavoritesClient } from "./components/favorites-client";

export default function FavoritesPage() {

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center my-10">
                <h1 className="text-3xl mt-9 font-bold text-gray-900 dark:text-white">
                    Artículos favoritos
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Elimina o accede a tus artículos favoritos
                </p>
            </div>

            <FavoritesClient />
        </main>
    );
}