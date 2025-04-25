import React from "react";

interface ProductStickerProps {
    category: string;
    style: string;
}

export const ProductSticker = (props: ProductStickerProps) => {
    const { category, style } = props;

    return (
        <div className="flex flex-col sm:flex-row gap-1 items-end">
            <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit cursor-pointer hover:bg-gray-800 transition-colors">{category}</p>
            <p className="px-2 py-1 text-xs text-white bg-yellow-900 rounded-full cursor-pointer w-fit hover:bg-yellow-800 transition-colors">{style}</p>
        </div>
    );
};
