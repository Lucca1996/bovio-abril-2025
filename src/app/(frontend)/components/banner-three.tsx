import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export const BannerThree = () => {
    return (
        <div className="p-5 sm:p-20 text-center">
            <h2 className="uppercase font-black text-xl text-primary">Consigue hasta un -25%</h2>
            <h3>-25% en tu proximo producto al gastar $ 350.000</h3>
            <div className="max-w-md mx-auto sm:flex justify-center gap-8 mt-5">
                <Link href="#" className={buttonVariants()}>Comprar</Link>
                <Link href="#" className={buttonVariants({ variant: "outline" })}>Mas informacion</Link>
            </div>
        </div>
    )
}
