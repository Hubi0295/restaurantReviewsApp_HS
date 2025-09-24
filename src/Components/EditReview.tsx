import { useLocation, useNavigate } from "react-router-dom";

// @ts-ignore
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
type DishImage = File | string;

interface Restaurant {
    name: string;
}

interface LocationState {
    restaurant: string;
    review: string;
    rating: string;
    dishes: string[];
    images: DishImage[];
}

export default function EditReview(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as LocationState;

    const [restaurantName, setRestaurantName] = useState(state.restaurant);
    const [review, setReview] = useState(state.review);
    const [rating, setRating] = useState(state.rating);
    const [dishes, setDishes] = useState<string[]>(state.dishes);
    const [images, setImages] = useState<DishImage[]>(state.images);
    const [listNames, setListNames] = useState<Restaurant[]>([]);

    useEffect(() => {
        axios
            .get<{ restaurants: Restaurant[] }>(`${backendUrl}/api/listRestaurant`)
            .then((res) => setListNames(res.data.restaurants))
            .catch((err) => console.error("Błąd pobierania restauracji:", err));
    }, []);

    function addDish(index: number, value: string) {
        const current = [...dishes];
        current[index] = value;
        setDishes(current);
    }

    function addImage(index: number, file: DishImage) {
        const current = [...images];
        current[index] = file;
        setImages(current);
    }

    function addAnotherDish() {
        setDishes([...dishes, ""]);
        setImages([...images, ""]);
    }

    async function sendReview(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData();
        data.append("restaurantName", restaurantName);
        data.append("review", review);
        data.append("rating", rating);

        dishes.forEach((dish) => data.append("dishes[]", dish));
        images.forEach((img) => {
            if (typeof img !== "string") {
                data.append("images[]", img);
            }
        });

        try {
            const resp = await axios.put(`${backendUrl}/api/review`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(resp.data.message);
            setTimeout(() => navigate("/myReviews"), 1000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Wystąpił błąd przy edycji recenzji");
        }
    }

    return (
        <>
            <Toaster position="top-right" />
            <form
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
                onSubmit={sendReview}
            >
                <h2 className="text-2xl font-semibold text-center text-amber-700">Edytuj recenzję</h2>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Nazwa restauracji</label>
                    <select
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2"
                    >
                        {listNames.map((r, k) => (
                            <option key={k} value={r.name}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </div>

                {dishes.map((dish, idx) => (
                    <div key={idx} className="space-y-4 border-t pt-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Nazwa dania</label>
                            <input
                                type="text"
                                value={dish}
                                onChange={(e) => addDish(idx, e.target.value)}
                                required
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">Zdjęcie dania</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => addImage(idx, e.target.files?.[0] || "")}
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {typeof images[idx] === "string" && images[idx] && (
                                <img
                                    src={`${backendUrl}/uploads/reviews/${images[idx]}`}
                                    alt="Podgląd"
                                    className="mt-2 max-w-xs rounded-md"
                                />
                            )}
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addAnotherDish}
                    className="bg-amber-100 text-amber-700 font-medium py-2 px-4 rounded-lg hover:bg-amber-200 transition-colors duration-200"
                >
                    Dodaj kolejne danie
                </button>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Recenzja</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows={4}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Ocena (1-10)</label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Edytuj recenzję
                </button>
            </form>
        </>
    );
}
