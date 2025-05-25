import {useEffect, useState} from "react";
import axios from "axios";

export default function MyReviews(){
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3000/api/review",{withCredentials: true})
            .then((resp)=>{setReviews(resp.data.data)})
            .catch((err)=>{console.log(err)});
    }, []);
    return(
        <>
        <h1>Lista moich recenzji</h1>
        {reviews.map((x,y)=>(
            console.log(x)
        ))}
        </>
    )
}