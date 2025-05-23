import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function RestaurantReviews(){
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/api/restaurantReview/${id}`)
            .then((e)=>console.log(e.data))
            .catch((e)=>console.log(e))
    }, []);
    return(
        <>
            <h1>Lista recenzji danej restauracji</h1>
            <p>Recenzja 1 restauracji nr {id}</p>
            <p>Recenzja 2 restauracji nr {id}</p>
            <p>Recenzja 3 restauracji nr {id}</p>

        </>
    )
}