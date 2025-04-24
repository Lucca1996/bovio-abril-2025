import Image from 'next/image'

export default function Page() {
    return (
        <>
            <section className="" id="contact">
                <Image
                    src="https://c.wallhere.com/photos/6a/a7/photography_phone_box_depth_of_field_phone-78038.jpg!d"
                    alt="imagen portada ipv tucuman instituto provincial de vivienda"
                    width={1920}
                    height={384}
                    className="w-full h-96 object-cover mx-auto"
                    priority
                />

                <div className="max-w-screen-xl flex-wrap items-end justify-between mx-auto mt-20 mb-40 p-4">
                    <div className="mb-4">
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">

                            <h2 className="font-heading mb-4 font-bold tracking-tight  text-3xl sm:text-5xl">
                                Contacto
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-xl ">Su opinion es importante para nosotros
                            </p>
                        </div>
                    </div>
                    <div className="flex items-stretch justify-center">
                        <div className="grid md:grid-cols-2">
                            <div className="h-full pr-6">
                                <p className="mt-3 mb-12 text-lg ">
                                    En Bovio SAS
                                    nos interesamos por tu opinion y/o duda, por eso los invitamos
                                    a comunicarse mendiante este medio, o por <a className="text-blue-700 underline underline-offset-4" href="https://www.facebook.com/ipvtucuman"> Facebook</a>, <a className="text-[#CF2972] underline underline-offset-4" href="https://www.instagram.com/ipvtucuman/">Instagram</a>, <a className="underline underline-offset-4" href="https://twitter.com/ipvdutuc?lang=es">Twitter</a>, y <a className="text-[#29cf45] underline underline-offset-4" href="https://www.instagram.com/ipvtucuman/">Whatsapp</a>.
                                </p>
                                <ul className="mb-6 md:mb-0">
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-black  hover:bg-gray-700 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path
                                                    d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                                </path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 ">Donde estamos?
                                            </h3>
                                            <p className="">Avenida Siempre Viva 742</p>
                                            <p className="">San Miguel de Tucuman, Argentina</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-black  hover:bg-gray-700 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className="h-6 w-6">
                                                <path
                                                    d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                                </path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 ">Contacto
                                            </h3>
                                            <p className="">Telefono: +1 (123) 456-7890</p>
                                            <p className="">Mail: boviosas@gmail.com</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-black  hover:bg-gray-700 text-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 ">Horario de atencion</h3>
                                            <p className="">Lunes - Viernes: 08:00 - 17:00</p>
                                            <p className="">Sabados &amp; Domingos: 08:00 - 12:00</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="card h-fit max-w-6xl pl-5 md:pl-12 " id="form">
                                <h2 className="mb-4 text-2xl font-bold ">O dejanos un mensaje aqui:</h2>
                                <form id="contactForm">
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="name" autoComplete="given-name" placeholder="Tu nombre" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="name" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label><input type="email" id="email" autoComplete="email" placeholder="Tu E-mail" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="email" />
                                            </div>
                                            <div className="mx-0 mb-1 sm:mb-4">
                                                <label htmlFor="number" className="pb-1 text-xs uppercase tracking-wider"></label><input type="text" id="number" autoComplete="number" placeholder="Tu numero" className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0" name="number" />
                                            </div>
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label><textarea id="textarea" name="textarea" cols={30} rows={5} placeholder="Escribe tu mensaje aqui..." className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-full bg-black  hover:bg-gray-700 text-white font-extrabold px-6 py-3 font-xl rounded-md sm:mb-0">Enviar Mensaje</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}