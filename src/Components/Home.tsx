import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RestaurantImage from "./RestaurantImage";
import ChartReviews from "./ChartReviews";

export default function Home() {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);

    // Filtry
    const [filterName, setFilterName] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterDelivery, setFilterDelivery] = useState("");

    function showReviews(id,name) {
        navigate("/restaurant/" + id,{state: {name:name}});
    }

    useEffect(() => {
        const params = {};
        if (filterName) params.name = filterName;
        if (filterType) params.type = filterType;
        if (filterDelivery) params.hasDelivery = filterDelivery;

        axios.get("http://localhost:3000/api/restaurants", { params })
            .then((e) => setRestaurants(e.data.restaurants))
            .catch((e) => console.log(e));
    }, [filterName, filterType, filterDelivery]);

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 text-center">Lista Restauracji</h1>

            <div className="flex flex-col p-5">
                <table className="w-full border border-amber-300 rounded-lg overflow-hidden shadow-md">
                    <thead className="bg-amber-500 text-white">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nazwa</th>
                        <th className="px-6 py-3">Adres</th>
                        <th className="px-6 py-3">Opis</th>
                        <th className="px-6 py-3">Typ kuchni</th>
                        <th className="px-6 py-3">Dostawa</th>
                        <th className="px-6 py-3">Zdjęcie</th>
                    </tr>
                    <tr className="bg-amber-100 text-black">
                        <th></th>
                        <th className="px-6 py-2">
                            <input
                                type="text"
                                placeholder="Filtruj po nazwie"
                                value={filterName}
                                onChange={e => setFilterName(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                        </th>
                        <th></th>
                        <th></th>
                        <th className="px-6 py-2">
                            <input
                                type="text"
                                placeholder="Typ kuchni"
                                value={filterType}
                                onChange={e => setFilterType(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1"
                            />
                        </th>
                        <th className="px-6 py-2">
                            <select
                                value={filterDelivery}
                                onChange={e => setFilterDelivery(e.target.value)}
                                className="w-full border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="">Wszystkie</option>
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody className="bg-green-50 divide-y divide-green-100 text-green-900">
                    {restaurants.map((r, index) => (
                        <tr key={r._id} className="hover:bg-green-100 cursor-pointer"
                            onClick={() => showReviews(r._id, r.name)}>
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{r.name}</td>
                            <td className="px-6 py-4">{r.address}</td>
                            <td className="px-6 py-4">{r.description}</td>
                            <td className="px-6 py-4">{r.type}</td>
                            <td className="px-6 py-4">{r.hasDelivery ? "Tak" : "Nie"}</td>
                            <td className="px-6 py-4" onClick={e => e.stopPropagation()}>
                                <RestaurantImage src={`http://localhost:3000/uploads/restaurants/${r.image}`}
                                                 alt={r.name}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <h1 className="text-2xl font-bold mb-4 text-center">Wykres średnich ocen wszystkich restauracji</h1>
                <ChartReviews restaurantId="none" isMy="false"/>
            </div>
        </>
    );
}
