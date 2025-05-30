import React, { useEffect, useState } from "react";
import axios from "axios";
import RestaurantImage from "./RestaurantImage";
import Review from "./Review";

export default function MyReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/review", { withCredentials: true })
            .then((resp) => {
                setReviews(resp.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {reviews.map((review, index) =>
                <Review key={index} review={review} manage={true}/>
            )}
        </div>
    );
}
