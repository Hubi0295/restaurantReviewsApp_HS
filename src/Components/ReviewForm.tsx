import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ReviewForm() {
    const [restaurantName, setRestaurantName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [dishes, setDishes] = useState([""]);
    const [images, setImages] = useState([]);
    const [listNames, setListNames] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/listRestaurant")
            .then((e)=>{setListNames(e.data.restaurants)})
            .catch((e)=>console.log(e))
    }, []);
    function addDish(index,e){
        const current = [...dishes];
        current[index] = e
        setDishes(current)
    }
    function addImage(index,e){
        const current = [...images];
        current[index] = e
        setImages(current)
    }
    function addAnotherDish(){
        const temp = [...dishes]
        temp.push("");
        setDishes([...temp]);
        console.log(dishes);
    }
    function sendReview(e: React.FormEvent){
        e.preventDefault();
        const data =new FormData();
        data.append("restaurantName", restaurantName);
        data.append("review", review);
        data.append("rating",rating);
        dishes.forEach((dish)=>{
            data.append("dishes[]",dish);
        })
        images.forEach((image)=>{
            data.append("images[]",image);
        })
        console.log(data);
        axios.post("http://localhost:3000/api/review", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

    }
    return (
        <form
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
            onSubmit={sendReview}
        >
            <h2 className="text-2xl font-semibold text-center text-amber-700">Dodaj recenzję</h2>

            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Nazwa restauracji</label>
                <select name="name" id="name" onChange={(e) => setRestaurantName(e.target.value)}>
                    {listNames.map((r, k) => (
                        <option key={k} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>
            {dishes.map((x,y)=>(
                <div key={y} className="space-y-4 border-t pt-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Nazwa dania</label>

                        <input
                            onChange={(e) => addDish(y, e.target.value)}
                            type="text"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Zdjęcie dania</label>
                        <input
                            onChange={(e) => addImage(y, e.target.files[0])}
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
                onClick={() => addAnotherDish()}
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
                Dodaj recenzję
            </button>
        </form>
    );
}
