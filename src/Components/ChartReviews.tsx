import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartReviews({ restaurantId, isMy }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/reviewsForChart?id=${restaurantId}&my=${isMy}`, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res.data.message);
                setReviews(res.data.message);
            })
            .catch((err) => console.log(err));
    }, [restaurantId, isMy]);

    // Sprawdzenie: czy mamy tylko {rating}, czy {restaurant, rating}
    const isRatingOnly = reviews.length > 0 && reviews[0].rating && !reviews[0].restaurant;

    let chartData = {};
    let chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
    };

    if (isRatingOnly) {
        // Zlicz liczbę ocen od 1 do 10
        const counts = Array(10).fill(0);
        reviews.forEach(({ rating }) => {
            if (rating >= 1 && rating <= 10) {
                counts[rating - 1]++;
            }
        });

        chartData = {
            labels: Array.from({ length: 10 }, (_, i) => (i + 1).toString()),
            datasets: [{
                label: "Liczba ocen",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.7)",
            }]
        };
    } else if (reviews.length > 0 && reviews[0].restaurant) {
        // Grupowanie ocen wg restauracji
        const grouped = {};
        reviews.forEach(({ restaurant, rating }) => {
            if (!grouped[restaurant]) grouped[restaurant] = [];
            grouped[restaurant].push(rating);
        });

        const labels = Object.keys(grouped);
        const avgRatings = labels.map(r => {
            const sum = grouped[r].reduce((acc, curr) => acc + curr, 0);
            return (sum / grouped[r].length).toFixed(2);
        });

        chartData = {
            labels,
            datasets: [{
                label: "Średnia ocena",
                data: avgRatings,
                backgroundColor: "rgba(153, 102, 255, 0.7)",
            }]
        };
    }

    return (
        <>
            <div className="text-lg font-semibold h-screen">
                {reviews.length === 0 ? (
                    <p>Brak danych do wyświetlenia.</p>
                ) : (
                    <Bar data={chartData} options={chartOptions}/>
                )}
            </div>
        </>
    );
}
