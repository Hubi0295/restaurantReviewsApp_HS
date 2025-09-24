
// @ts-ignore
import React, {FormEvent} from "react";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../AuthContext";
import { Toaster, toast } from 'react-hot-toast';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface LoginResponse {
    message: string;
    username: string;
}
export default function Login() {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const navigate = useNavigate();
    const {username,setUsername} = useAuth();
    function sleep(ms: number): Promise<void> {
        // @ts-ignore
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const resp = await axios.post<LoginResponse>(`${backendUrl}/auth/login`, {
                email,
                password
            }, {
                withCredentials: true
            });
            toast.success(resp.data.message);
            setUsername(resp.data.username);
            await sleep(1000);
            console.log("Zalogowano");
            navigate("/");
        } catch (err) {
            const axiosMessage = err as AxiosError<{message?: string}>
            const errorMessage = axiosMessage.response?.data?.message || "Błąd logowania";
            toast.error(errorMessage);
        }
    }
    return(
        <>
            <Toaster position="top-right"/>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
            >
                <h2 className="text-2xl font-semibold text-center text-amber-700">Zaloguj się</h2>

                <div className="flex flex-col">
                    <label htmlFor="Providedemail" className="text-sm font-medium text-gray-700 mb-1">
                        Podaj email
                    </label>
                    <input
                        type="email"
                        id="Providedemail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twój email"
                    />
                    <p id="emailProblem"></p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="Providedpassword" className="text-sm font-medium text-gray-700 mb-1">
                        Podaj hasło
                    </label>
                    <input
                        type="password"
                        id="Providedpassword"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Twoje hasło"
                    />
                    <p id="passwordProblem"></p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                    Zaloguj
                </button>
            </form>

        </>
    )
}