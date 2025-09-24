import {useLocation, useParams} from "react-router-dom";
// @ts-ignore
import React, {useEffect, useState} from "react";
import axios from "axios";
import Review from "./Review";
import ChartReviews from "./ChartReviews";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
interface ReviewType {
    _id: string;
    userId: string;
    restaurantId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

interface LocationState {
    name: string;
}
export default function RestaurantReviews(){
    const { id } = useParams<{id: string}>();
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const location = useLocation();
    const {name} = location.state as LocationState;
    useEffect(() => {
        axios.get(`${backendUrl}/api/restaurantReview/${id}`)
            .then((e)=>{console.log(e);setReviews(e.data.data)})
            .catch((e)=>console.log(e))
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {reviews.map((review, index) =>
                    // @ts-ignore
                    <Review key={index} review={review} manage={false}/>
                )}
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-4 text-center">Rozkład ocen restauracji {name}</h1>
                <ChartReviews restaurantId={id} isMy="false"/>
            </div>
        </>
    );
}
