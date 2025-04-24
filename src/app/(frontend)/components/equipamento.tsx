import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"


export const Equipamento = () => {
    return (
        <div className='max-w-6xl py-4 mx-auto sm:py-16 sm:px-24'>
            <h3 className='px-6 pb-4 text-3xl sm:pb-8'>Equipamiento empresarial</h3>
            <div className="p-5 sm:p-20 text-center">
                <h2 className="uppercase font-black text-xl text-primary">En Bovio SAS pensamos en el futuro de tu negocio</h2>
            </div>
            <div >
                <div>
                    <div className="sm:flex justify-items-center">

                        <p className="text-lg text-gray-700 leading-relaxed mt-4 mb-8 px-4 md:px-8 dark:text-white">Entendemos que cada negocio tiene necesidades únicas. Por eso, ofrecemos soluciones de carpintería personalizadas que se adaptan
                            perfectamente a los requerimientos de tu empresa. Desde mobiliario a medida hasta proyectos de gran escala, trabajamos estrechamente
                            contigo para crear espacios funcionales y estéticamente atractivos. Con un enfoque en la calidad, la durabilidad y el diseño innovador,
                            nos comprometemos a ser tu aliado para llevar el futuro de tu negocio al siguiente nivel. Confía en nosotros para transformar tus ideas en realidades tangibles.
                        </p>
                        <Image 
                            src="https://res.cloudinary.com/dncvxpgj1/image/upload/v1736386356/imagen-de-servicio-1.jpg"
                            alt="Servicio empresarial"
                            width={270}
                            height={270}
                            className="transition duration-300 ease-in-out rounded-lg hover:scale-110" />
                    </div>
                    <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-14">
                        <Link href="#" className={buttonVariants()}>Comprar</Link>
                        <Link href="#" className={buttonVariants({ variant: "outline" })}>Mas informacion</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
