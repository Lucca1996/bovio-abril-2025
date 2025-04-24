import React from "react";


interface ProductStickerProps {
    category: string;
    style: string;
}

export const ProductSticker = (props: ProductStickerProps) => {
    const { category, style } = props;
    // Si no existe 'category' o 'category.categoryName', se utiliza un valor por defecto.
   

    return (
        <div className=" justify-items-center inline-flex sm:block">
            <p className="px-2 py-1 m-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit cursor-pointer">{category}</p>
            <p className="px-2 py-1 m-1 text-white bg-yellow-900 rounded-full cursor-pointer w-fit">{style}</p>
        </div>
    );
};
