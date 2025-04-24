"use client";

import Link from 'next/link';
import React, { memo } from 'react';
import Image from 'next/image';
import type { Category } from '@/payload-types';

interface Props {
    categories: Category[]
}

const CategoryCard = memo(({ category }: { category: Category }) => (
    <Link 
        href={`/catalogo?category=${category.id}`}
        className='relative flex aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 transition-transform duration-300 hover:scale-105'
    >
        {category.image && (
            <Image 
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 270px"
                className='object-cover'
                priority={false}
                quality={85}
            />
        )}
        <p className='absolute bottom-5 w-full py-2 text-lg font-bold text-center text-white backdrop-blur-lg bg-black/30'>
            {category.name}
        </p>
    </Link>
));

CategoryCard.displayName = 'CategoryCard';

export const ChooseCategory: React.FC<Props> = ({ categories }) => {
    return (
        <section className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <h2 className='px-6 pb-4 text-3xl font-bold sm:pb-8'>
                Encontrá lo que estabas buscando:
            </h2>
            <div className='grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 sm:px-0'>
                {categories?.length > 0 ? (
                    categories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))
                ) : (
                    <p className='text-gray-500'>No se encontraron categorías.</p>
                )}
            </div>
        </section>
    );
};
