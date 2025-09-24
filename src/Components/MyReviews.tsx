// @ts-ignore
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import RestaurantImage from "./RestaurantImage";
import Review from "./Review";
import ChartReviews from "./ChartReviews";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface ReviewType {
    _id: string;
    restaurantName: string;
    review: string;
    rating: number;
    dishes: string[];
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export default function MyReviews(): JSX.Element {
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get<{ data: ReviewType[] }>(`${backendUrl}/api/review`, {
                withCredentials: true,
            })
            .then((resp) => {
                setReviews(resp.data.data);
            })
            .catch((err) => {
                console.error("Błąd podczas pobierania recenzji:", err);
            })
    }, []);

    return (
        <>
            {loading ? (
                <p className="text-center mt-6 text-gray-600">Ładowanie recenzji...</p>
            ) : reviews.length === 0 ? (
                <p className="text-center mt-6 text-gray-500">Brak recenzji do wyświetlenia.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {reviews.map((review) => (
                        // @ts-ignore
                        <Review key={review._id} review={review} manage={true} />
                    ))}
                </div>
            )}

            <div className="mt-10">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Wykres moich średnich ocen restauracji
                </h1>
                <ChartReviews restaurantId="none" isMy="true" />
            </div>
        </>
    );
}
