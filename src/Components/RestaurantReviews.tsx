import {useParams} from "react-router-dom";

export default function RestaurantReviews(){
    const { id } = useParams();
    return(
        <>
            <h1>Lista recenzji danej restauracji</h1>
            <p>Recenzja 1 restauracji nr {id}</p>
            <p>Recenzja 2 restauracji nr {id}</p>
            <p>Recenzja 3 restauracji nr {id}</p>

        </>
    )
}