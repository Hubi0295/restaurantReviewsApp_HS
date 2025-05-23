
import React, {useEffect, useState} from "react";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import RestaurantImage from "./RestaurantImage";
export default function Home() {
    const navigate = useNavigate();
    function showReviews(num:number){
        navigate("/restaurant/"+num);
    }
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3000/api/restaurants")
            .then((e)=>setRestaurants(e.data.restaurants))
            .catch((e)=>console.log(e));
    }, []);
    console.log(restaurants)
    return(
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">Lista recenzji danej restauracji</h1>
            <div className="flex flex-col p-5">
                <table className="w-full border border-amber-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-amber-500 hover:bg-amber-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Nazwa</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Adres</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Opis</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Typ kuchni</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Dostawa</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider border-b border-amber-300">Zdjęcie</th>
                    </tr>
                    </thead>
                    <tbody className="bg-green-50 divide-y divide-green-100 text-green-900">
                    {restaurants.map((r, index) => (
                        <tr key={r._id} className="hover:bg-green-100 transition duration-150 cursor-pointer" onClick={()=>showReviews(r._id)}>

                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{r.name}</td>
                            <td className="px-6 py-4">{r.address}</td>
                            <td className="px-6 py-4">{r.description}</td>
                            <td className="px-6 py-4">{r.type}</td>
                            <td className="px-6 py-4">{r.hasDelivery ? "Tak" : "Nie"}</td>
                            <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                <RestaurantImage src={`http://localhost:3000/uploads/${r.image}`} alt={r.name} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    )
}