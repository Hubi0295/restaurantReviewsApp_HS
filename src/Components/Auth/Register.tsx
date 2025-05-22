
import React from "react";
import axios from "axios";

export default function Register() {
    const [firstName,setFirstName] = React.useState<string>("");
    const [lastName,setLastName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [repeatPassword, setRepeatPassword] = React.useState<string>("");
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:3000/auth/register',{
            firstName: firstName,
            lastName:lastName,
            email: email,
            password: password
        })
            .then((resp)=>console.log(resp))
            .catch((err)=>console.log(err))
    }
    return(
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-5 mt-10"
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
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Zarejestruj
                </button>
            </form>

        </>
    )
}