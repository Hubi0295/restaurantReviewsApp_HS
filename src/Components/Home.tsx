
import React, {useState} from "react";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    function handleClick(num:number){
        navigate("/restaurant/"+num);
    }
    return(
        <>
            <h1>Lista recenzji danej restauracji</h1>
            <div onClick={()=>handleClick(1)}>
                <p>Restauracja 1</p>
            </div>
            <div onClick={()=>handleClick(2)}>
                <p>Restauracja 2</p>
            </div>
            <div onClick={()=>handleClick(3)}>
                <p>Restauracja 3</p>
            </div>
        </>
    )
}