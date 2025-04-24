'use client';

import { useRouter } from "next/navigation";
import { useState, FormEvent, ReactElement } from "react";
import Link from "next/link";
import { signup, SignupResponse } from "../actions/signup";
import SubmitButton from "../../components/SubmitButton";

export default function SignupForm(): ReactElement {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsPending(true);
    setError(null);  // Reset error state

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

    const result: SignupResponse = await signup({ email, password });
    setIsPending(false);

    console.log(result);

    if (result.success) {
      // Redirect manually after successful login
      router.push("/dashboard");
    } else {
      // Display the error message
      setError(result.error || "Login failed");
    }
  }

  return ( 
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <h2 className="text-3xl mb-7">
                    Bovio
                    <span className="font-bold">SAS</span>
                </h2>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Cree una nueva cuenta
                        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="confirmPassword">Repetir Contraseña</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="accept-terms"
                                            aria-describedby="accept-terms"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="accept-terms" className="text-gray-500 dark:text-gray-300">Acepto los <a href="#terms" className="text-primary-600 hover:underline dark:text-primary-500">términos y condiciones</a></label>
                                    </div>
                                </div>
                            </div>
          {error && <div className="text-red-500">{error}</div>}

          <SubmitButton loading={isPending} text="Sign Up" />
        </form>
        
        </div>
        <p className="my-4 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-black hover:text-headBlue-400">
            Sign In
          </Link>
        </p>
      </div>
      
    </div>
  </section>
  );
}