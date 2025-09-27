// @ts-ignore
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface Restaurant {
    name: string;
}

export default function ReviewForm() {
    const [restaurantName, setRestaurantName] = useState<string>("");
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [dishes, setDishes] = useState<string[]>([""]);
    const [images, setImages] = useState<(File | null)[]>([]);
    const [listNames, setListNames] = useState<Restaurant[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${backendUrl}/api/listRestaurant`)
            .then((res) => setListNames(res.data.restaurants))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (listNames.length > 0 && !restaurantName) {
            setRestaurantName(listNames[0].name);
        }
    }, [listNames, restaurantName]);

    function sleep(ms: number) {
        // @ts-ignore
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function addDish(index: number, value: string) {
        const current = [...dishes];
        current[index] = value;
        setDishes(current);
    }

    function addImage(index: number, file: File | null) {
        const current = [...images];
        current[index] = file;
        setImages(current);
    }

    function addAnotherDish() {
        setDishes((prev) => [...prev, ""]);
        setImages((prev) => [...prev, null]);
    }

    async function sendReview(e: React.FormEvent) {
        e.preventDefault();
        const data = new FormData();
        data.append("restaurantName", restaurantName);
        data.append("review", review);
        data.append("rating", rating);

        dishes.forEach((dish) => {
            if (dish) data.append("dishes[]", dish);
        });

        images.forEach((image) => {
            if (image) data.append("images", image);
        });

        try {
            const resp = await axios.post(`${backendUrl}/api/review`, data, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success(resp.data.message);
            await sleep(1000);
            navigate("/myReviews");
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Błąd logowania");
        }
    }

    return (
        <>
            <Toaster position="top-right" />
            <form
                className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
                onSubmit={sendReview}
            >
                <h2 className="text-2xl font-semibold text-center text-amber-700">
                    Dodaj recenzję
                </h2>

                <div className="flex flex-col">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium text-gray-700 mb-1"
                    >
                        Nazwa restauracji
                    </label>
                    {listNames.length > 0 ? (
                        <select
                            name="name"
                            id="name"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            {listNames.map((r, k) => (
                                <option key={k} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>Ładowanie restauracji...</p>
                    )}
                </div>

                {dishes.map((_, idx) => (
                    <div key={idx} className="space-y-4 border-t pt-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Nazwa dania
                            </label>

                            <input
                                onChange={(e) => addDish(idx, e.target.value)}
                                type="text"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700 mb-1">
                                Zdjęcie dania
                            </label>
                            <input
                                onChange={(e) => addImage(idx, e.target.files?.[0] || null)}
                                type="file"
                                accept="image/*"
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                required
                            />
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
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Recenzja
                    </label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        rows={4}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                        Ocena (1-10)
                    </label>
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
                    className="w-full cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Dodaj recenzję
                </button>
            </form>
        </>
    );
}
