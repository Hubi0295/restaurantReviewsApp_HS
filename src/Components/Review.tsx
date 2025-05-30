import RestaurantImage from "./RestaurantImage";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import axios from "axios";
import { Toaster, toast } from 'react-hot-toast';
export default function Review({ review, key, manage }) {
    const navigate = useNavigate();
    function handleEdit(){
        navigate("/editReview",{state: review})
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function handleDelete(){
        axios.delete(`http://localhost:3000/api/review/${review.id}`)
            .then((res) => {
                toast.success(res.data.message);
                sleep(1000);
                window.location.reload();
            })
            .catch((err)=>{
                toast.error(err.response?.data?.message || "Błąd usuwania");
            })
    }

    useEffect(() => {
        console.log(review);
    }, [review]);
    return (
        <div key={key}>
            <Toaster position="top-right"/>
            <div className="grid grid-cols-2 gap-4 items-start bg-green-50 border border-amber-300 rounded-xl shadow-md p-6 space-y-4 hover:bg-green-100 transition duration-200">
                <div>
                    <div className="text-lg font-semibold text-green-900">Użytkownik: {review.user}</div>
                    <div className="text-green-800">
                        Restauracja: <span className="font-medium">{review.restaurant}</span>
                    </div>
                    <div className="text-green-700 text-sm">
                        Data: {new Date(review.date).toLocaleDateString()}
                    </div>
                    <div className="text-green-900">
                        Ocena: <span className="font-bold text-amber-600">{review.rating}/10</span>
                    </div>
                    <div className="text-green-900">
                        Recenzja: <p className="italic text-green-800">{review.review}</p>
                    </div>

                    {review.dishes.length > 0 && (
                        <div>
                            <div className="font-semibold text-green-900">Zamówione dania:</div>
                            <ul className="list-disc list-inside text-green-800">
                                {review.dishes.map((dish, idx) => (
                                    <li key={idx}>{dish}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {review.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                            {review.images.map((img, idx) => (
                                <RestaurantImage
                                    key={idx}
                                    src={`http://localhost:3000/uploads/reviews/${img}`}
                                    alt={img}
                                    className="rounded-lg border border-amber-200"
                                />
                            ))}
                        </div>
                    )}
                </div>
                {manage &&
                    <div className="space-y-2 grid grid-row-2 gap-4">
                        <div>
                        <button onClick={()=>handleEdit()} className="cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">Edytuj</button>
                        </div>
                        <div>
                        <button onClick={()=>handleDelete()} className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Usuń</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
