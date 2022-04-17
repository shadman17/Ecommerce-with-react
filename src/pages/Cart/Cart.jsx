import { Grid, Skeleton, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { BASE_URL, getCart, checkout } from "../../utils/api";

const Cart = () => {
    const { user } = useSelector((store) => store.userStore);
    const [items, setItems] = useState({});
    const [updateValue, setUpdateValue] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const getCartItems = async () => {
            const response = await getCart(user);
            console.log(response);
            setItems(response);
        };

        getCartItems();
    }, [user, updateValue]);

    const checkoutCart = async (user) => {
        await checkout(user);
        navigate("/profile");
    };


    const addOne = async (item, user) => {
        
        setUpdateValue(!updateValue)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${user.userInfo.token}`,
            },
            body: JSON.stringify({
                product: {
                    id: item.productId._id,
                    quantity: item.quantity+1,
                },
            }),
        };
        await fetch(`${BASE_URL}/cart`, requestOptions)
            .then(res=>res.json())
            .then(res=>console.log(res));               
        
    };


    const deleteOne = async (item, user) => {
        setUpdateValue(!updateValue)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${user.userInfo.token}`,
            },
            body: JSON.stringify({
                product: {
                    id: item.productId._id,
                    quantity: item.quantity-1,
                },
            }),
        };
        await fetch(`${BASE_URL}/cart`, requestOptions)
 
    };

    const deleteall = async (item, user) => {

        setUpdateValue(!updateValue)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${user.userInfo.token}`,
            },
            body: JSON.stringify({
                product: {
                    id: item.productId._id,
                    quantity: 0
                },
            }),
        };
        await fetch(`${BASE_URL}/cart`, requestOptions)
            .then(res=>res.json())
            .then(res=>console.log(res));   
    };

    const Loading = () => {
        return (
            <div>
                <Container sx={{ mt: 5 }}>
                    <Grid container justifyContent={"center"} spacing={1}>
                        <Grid md={12} item>
                            <Skeleton variant="rectangular" height={360} />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    };

    const ShowCart = () => {
        return (
            <div>
                {items.products ? (
                    <div>
                        <div>
                            {items.products.map((cartItem) => {
                                return (
                                    <div
                                        className="px-4 my-5 bg-light rounded-3"
                                        key={cartItem.productId._id}
                                    >
                                        <div className="container py-4">
                                            <div className="row justify-content-center">
                                                <div className="col-md-4">
                                                    <img
                                                        src={`${BASE_URL}${cartItem.productId.image}`}
                                                        alt={
                                                            cartItem.productId
                                                                .title
                                                        }
                                                        height="100px"
                                                        width="80px"
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <h5>
                                                        {cartItem.productId.title.slice(
                                                            0,
                                                            20
                                                        ) + "....."}
                                                    </h5>
                                                    <p className="lead fw-bold">
                                                        {`${cartItem.quantity} x $${cartItem.productId.price} `}
                                                    </p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button
                                                        onClick={() => addOne(cartItem, user)}
                                                        className="btn btn-success mx-4"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => deleteOne(cartItem, user)}
                                                        className="btn btn-dark px-3"
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        onClick={() => deleteall(cartItem, user)}
                                                        className="btn btn-danger mx-4"
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}{" "}
                        </div>
                        <div>
                            <ShowButton />
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
        );
    };

    const EmptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>Your Cart is Empty</h3>
                    </div>
                </div>
            </div>
        );
    };

    const ShowButton = () => {
        return (
            <div className="row justify-content-center">
                <button
                    onClick={() => checkoutCart(user)}
                    className="btn btn-outline-dark my-dark w-25 mb-5"
                >
                    <p className="fw-bold m-0">PLACE ORDER</p>
                </button>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    {Object.keys(items).length ? <ShowCart /> : <Loading />}
                </div>
            </div>
        </div>
    );
};

export default Cart;
