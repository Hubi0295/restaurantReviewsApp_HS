
import './App.css'
import UpBar from "./Components/UpBar";
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/Home";
import React from "react";
import MyReviews from "./Components/MyReviews";
import ReviewForm from "./Components/ReviewForm";
import RestaurantForm from "./Components/RestaurantForm";
import RestaurantReviews from "./Components/RestaurantReviews";
import { Toaster, toast } from 'react-hot-toast';
import EditReview from "./Components/EditReview";


function App() {

    return (
        <Router>
        <>
            <UpBar/>
                <Routes>
                    <Route path="/login" element={<Login/>} ></Route>
                    <Route path="/register" element={<Register/>} ></Route>
                    <Route path="/" element={<Home/>} ></Route>
                    <Route path="/myReviews" element={<MyReviews/>} ></Route>
                    <Route path="/review" element={<ReviewForm/>} ></Route>
                    <Route path="/editReview" element={<EditReview/>} ></Route>
                    <Route path="/addRestaurant" element={<RestaurantForm/>} ></Route>
                    <Route path="/restaurant/:id" element={<RestaurantReviews/>} ></Route>
                </Routes>
        </>
        </Router>
    )
}
export default App;
