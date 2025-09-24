// @ts-ignore
import React, {JSX, useEffect, useState} from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Typy
interface Props {
    restaurantId: string;
    isMy: string;
}

type ReviewRatingOnly = {
    rating: number;
};

type ReviewWithRestaurant = {
    restaurant: string;
    rating: number;
};

type Review = ReviewRatingOnly | ReviewWithRestaurant;

export default function ChartReviews({ restaurantId, isMy }: Props): JSX.Element {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        axios
            .get<{ message: Review[] }>(
                `${backendUrl}/api/reviewsForChart?id=${restaurantId}&my=${isMy}`,
                { withCredentials: true }
            )
            .then((res) => {
                console.log(res.data.message);
                setReviews(res.data.message);
            })
            .catch((err) => console.error("Błąd pobierania danych:", err));
    }, [restaurantId, isMy]);

    // Czy mamy tylko rating (np. dla pojedynczego użytkownika)
    const isRatingOnly =
        reviews.length > 0 &&
        "rating" in reviews[0] &&
        !("restaurant" in reviews[0]);

    let chartData = {};
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    };

    if (isRatingOnly) {
        // @ts-ignore
        const counts = Array<number>(10).fill(0);
        (reviews as ReviewRatingOnly[]).forEach(({ rating }) => {
            if (rating >= 1 && rating <= 10) {
                counts[rating - 1]++;
            }
        });

        chartData = {
            // @ts-ignore
            labels: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
            datasets: [
                {
                    label: "Liczba ocen",
                    data: counts,
                    backgroundColor: "rgba(75, 192, 192, 0.7)",
                },
            ],
        };
    } else if (
        reviews.length > 0 &&
        "restaurant" in reviews[0]
    ) {
        const grouped: Record<string, number[]> = {};
        (reviews as ReviewWithRestaurant[]).forEach(({ restaurant, rating }) => {
            if (!grouped[restaurant]) grouped[restaurant] = [];
            grouped[restaurant].push(rating);
        });

        const labels = Object.keys(grouped);
        const avgRatings = labels.map((r) => {
            const sum = grouped[r].reduce((acc, curr) => acc + curr, 0);
            return parseFloat((sum / grouped[r].length).toFixed(2));
        });

        chartData = {
            labels,
            datasets: [
                {
                    label: "Średnia ocena",
                    data: avgRatings,
                    backgroundColor: "rgba(153, 102, 255, 0.7)",
                },
            ],
        };
    }

    return (
        <div className="text-lg font-semibold h-screen">
            {reviews.length === 0 ? (
                <p>Brak danych do wyświetlenia.</p>
            ) : (
                // @ts-ignore
                <Bar data={chartData} options={chartOptions} />
            )}
        </div>
    );
}
