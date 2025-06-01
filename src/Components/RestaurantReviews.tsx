import {useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Review from "./Review";
import ChartReviews from "./ChartReviews";

export default function RestaurantReviews(){
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const location = useLocation();
    const {name} = location.state;
    useEffect(() => {
        axios.get(`http://localhost:3000/api/restaurantReview/${id}`)
            .then((e)=>{console.log(e);setReviews(e.data.data)})
            .catch((e)=>console.log(e))
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {reviews.map((review, index) =>
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
