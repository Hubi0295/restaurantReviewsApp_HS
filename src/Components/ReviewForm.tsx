import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ReviewForm() {
    const [restaurantName, setRestaurantName] = useState("");
    const [dishes, setDishes] = useState([{ name: "", image: null as File | null }]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [listNames, setListNames] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/listRestaurant")
            .then((e)=>{console.log(e.data.restaurants);setListNames(e.data.restaurants)})
            .catch((e)=>console.log(e))
    }, []);

    const handleDishChange = (index: number, field: "name" | "image", value: string | File) => {
        const newDishes = [...dishes];
        if (field === "image" && value instanceof File) {
            newDishes[index].image = value;
        } else {
            newDishes[index].name = value as string;
        }
        setDishes(newDishes);
    };

    const addDishField = () => {
        setDishes([...dishes, { name: "", image: null }]);
    };

    async function handleSubmit  (e: React.FormEvent) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("restaurantName", restaurantName);
        formData.append("review", review);
        formData.append("rating", rating);

        dishes.forEach((dish) => {
            formData.append("dishNames[]", dish.name);
            if (dish.image) {
                formData.append("dishImages", dish.image);
            }
        });
        try {
            const response = await fetch("http://localhost:3000/api/review", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Recenzja dodana pomyślnie!");
                setRestaurantName("");
                setDishes([{ name: "", image: null }]);
                setReview("");
                setRating("");
            } else {
                alert("Wystąpił błąd przy dodawaniu recenzji.");
            }
        } catch (error) {
            console.error("Błąd:", error);
            alert("Nie udało się połączyć z serwerem.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
        >
            <h2 className="text-2xl font-semibold text-center text-amber-700">Dodaj recenzję</h2>

            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Nazwa restauracji</label>
                <select name="name" id="name" onChange={(e)=>setRestaurantName(e.target.value)}>
                    {listNames.map((r, k) => (
                        <option key={k} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>

            </div>

            {dishes.map((dish, index) => (
                <div key={index} className="space-y-4 border-t pt-4">
                <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Nazwa dania</label>
                        <input
                            type="text"
                            value={dish.name}
                            onChange={(e) => handleDishChange(index, "name", e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Zdjęcie dania</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                handleDishChange(index, "image", e.target.files?.[0] || null)
                            }
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addDishField}
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
                <label className="text-sm font-medium text-gray-700 mb-1">Ocena (1-5)</label>
                <input
                    type="number"
                    min={1}
                    max={5}
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
                Dodaj recenzję
            </button>
        </form>
    );
}
