import { FeaturedProducts } from "../../components/featured-products";
import { getProducts } from "../../components/getProducts";
import { getUser } from "../actions/getUser";
import { CartClient } from "./components/cart-client";
import { Product } from "@/payload-types";

export default async function CartPage() {
    const user = await getUser();
    const products = await getProducts();
    
    // Extraer IDs de favoritos y carrito
    const favoriteIds = user?.favorites?.map(fav => 
        typeof fav === 'number' ? fav : fav.id
    ) || [];
    
    const cartIds = user?.cart?.map(car => 
        typeof car === 'number' ? car : car.id
    ) || [];
    
    // Filtrar solo los productos completos del carrito
    const cartProducts = (user?.cart || []).filter((car): car is Product => 
        typeof car !== 'number' && car !== null
    );

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center my-10">
                <h1 className="text-3xl mt-9 font-bold text-gray-900 dark:text-white">
                    Carrito de compras
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Compra, elimina o accede a tus artículos del carrito
                </p>
            </div>

            <CartClient initialCart={cartProducts} cartIds={cartIds} />
            <FeaturedProducts products={products} initialFavorites={favoriteIds} initialCart={cartIds} />
        </main>
    );
}
