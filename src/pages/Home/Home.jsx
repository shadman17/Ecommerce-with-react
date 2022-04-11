import React, { useState } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Products from "../Products/Products";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <Products />
        </div>
    );
};

export default Home;
