import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";

export default function EditReview(){
    const location = useLocation()
    const navigate = useNavigate();
    const [restaurantName, setRestaurantName] = useState(location.state.restaurant);
    const [review, setReview] = useState(location.state.review);
    const [rating, setRating] = useState(location.state.rating);
    const [dishes, setDishes] = useState(location.state.dishes);
    const [images, setImages] = useState(location.state.images);
    const [listNames, setListNames] = useState([]);
    useEffect(() => {
        console.log(location.state);
        axios.get("http://localhost:3000/api/listRestaurant")
            .then((e)=>{setListNames(e.data.restaurants)})
            .catch((e)=>console.log(e))
    }, []);
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
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
        axios.put("http://localhost:3000/api/review", data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((resp)=>{
                toast.success(resp.data.message);
                sleep(1000);
                navigate("/myReviews");
            })
            .catch((err)=>toast.error(err.response?.data?.message || "Błąd logowania"));


    }
    return (
        <>
        <Toaster position={"top-right"}/>
        <form
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md mx-auto space-y-6 mt-10"
            onSubmit={sendReview}
        >
            <h2 className="text-2xl font-semibold text-center text-amber-700">Dodaj recenzję</h2>

            <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Nazwa restauracji</label>
                <select name="name" id="name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)}>
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
                            value={dishes[y]}
                            required/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Zdjęcie dania</label>
                        <input
                            onChange={(e) => addImage(y, e.target.files[0])}
                            type="file"
                            accept="image/*"
                            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <p>Zapisane w bazie:</p>
                        {typeof images[y] === "string" && (
                            <img
                                src={`http://localhost:3000/uploads/reviews/${images[y]}`}
                                alt="Podgląd"
                                className="mt-2 max-w-x
                                s rounded-md"
                            />
                        )}
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
                className="w-full cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Edytuj recenzję
            </button>
        </form>
        </>
    );
}