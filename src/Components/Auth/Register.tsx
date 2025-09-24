
// @ts-ignore
import React, {FormEvent} from "react";
import axios, {AxiosError} from "axios";

import { Toaster, toast } from 'react-hot-toast';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface registerResponse {
    message: string;
}
export default function Register() {
    const [firstName,setFirstName] = React.useState<string>("");
    const [lastName,setLastName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [repeatPassword, setRepeatPassword] = React.useState<string>("");

    // @ts-ignore
    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(password !== repeatPassword){
            toast.error("Haslo i powtorz haslo powinno byc takie samo");
            return;
        }
        await axios.post<registerResponse>(`${backendUrl}/auth/register`,{
            firstName,
            lastName,
            email,
            password
        })
            .then((resp)=>{
                toast.success(resp.data.message);
            })
            .catch((err)=>{
                const axiosError = err as AxiosError<{ message?: string }>;
                toast.error(axiosError.response?.data?.message || "Błąd rejestracji");
            })
    }
    return(
        <>
            <Toaster position="top-right" />
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-5 mt-2"
            >
                <h2 className="text-2xl font-semibold text-center text-amber-700">Zarejestruj się</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Imię</label>
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twoje imię"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Nazwisko</label>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twoje nazwisko"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twój email"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Hasło</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twoje hasło"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Powtórz hasło</label>
                    <input
                        type="password"
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        value={repeatPassword}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Powtórz hasło"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                    Zarejestruj
                </button>
            </form>

        </>
    )
}