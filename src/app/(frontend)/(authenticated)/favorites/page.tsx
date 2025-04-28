import { getUser } from "../actions/getUser";
import { FavoritesClient } from "./components/favorites-client";
import { Product } from "@/payload-types";

export default async function page() {
    const user = await getUser();

    // Filtrar solo los favoritos que son objetos Product completos
    const favoriteProducts = (user?.favorites || []).filter((fav): fav is Product => 
        typeof fav !== 'number' && fav !== null
    );

    // Obtener los IDs de productos en el carrito
    const cartIds = user?.cart?.map(item => 
        typeof item === 'number' ? item : item.id
    ) || [];

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

            <FavoritesClient initialFavorites={favoriteProducts} cartIds={cartIds} />
        </main>
    );
}
