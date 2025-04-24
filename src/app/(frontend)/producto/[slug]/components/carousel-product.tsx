import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';

interface CarouselProductProps {
    images: {

        id: number;
        url: string;

    }[];
}


export const CarouselProduct = (props: CarouselProductProps) => {
    const { images } = props;
    console.log(images)
    return (
        <div className="sm:px-16">
            <Carousel>
                <CarouselContent>
                    {images.map((image) => (
                        <CarouselItem key={image.id}>
                            <Image
                                src={image.url}
                                alt="Image Product"
                                width={800}
                                height={600}
                                className="rounded-lg object-cover w-full h-full"
                                priority
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
