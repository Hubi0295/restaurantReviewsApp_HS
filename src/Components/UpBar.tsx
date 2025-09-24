import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useAuth} from "../AuthContext";
import { Toaster, toast } from 'react-hot-toast';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export default function UpBar(){
    const {username, setUsername} = useAuth();
    function logout(){
        axios.post(`${backendUrl}/auth/logout`,{},{
            withCredentials: true
        })
            .then(res => {
                toast.success("Wylogowano")
                setUsername(null)
            })
            .catch(err=>{toast.error(err.response.data.message)});
    }
    useEffect(() => {
        // @ts-ignore
        const fetchUser = async () => {
            try {
                const res = await fetch(`${backendUrl}/auth/me`, {
                    credentials: "include",
                });
                if (!res.ok) throw new Error("Nie zalogowany");
                const data = await res.json();
                setUsername(data.username);
            } catch {
                setUsername(null);
            }
        };
        fetchUser();
    }, [username]);
    return(
        <>
            <Toaster position="top-right"/>
            <div
                className="flex items-center justify-between bg-green-100 text-green-900 px-6 py-1 rounded-b-2xl shadow-md border-b border-green-300 h-30">
                <Link to="/">
                    <img src="/public/logo.webp" alt="Logo" className="h-25 rounded-xl w-auto"/>
                </Link>
                {username ?
                    <div className="flex gap-2">
                        <Link to="/myReviews">
                            <button
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                                Moje recenzje
                            </button>
                        </Link>
                        <Link to="/review">
                            <button
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                                Dodaj recenzje
                            </button>
                        </Link>
                        <Link to="/addRestaurant">
                            <button
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                                Dodaj Restauracje
                            </button>
                        </Link>
                        <button
                            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow"
                            onClick={logout}>
                            Wyloguj
                        </button>
                        <button
                            className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                            Witaj {username}
                        </button>
                    </div>
                    :
                    <div className="flex gap-4">
                        <Link to="/login">
                            <button
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button
                                className="bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-4 mr-10 cursor-pointer rounded-xl shadow">
                                Register
                            </button>
                        </Link>
                    </div>
                }
            </div>

        </>
    )
}