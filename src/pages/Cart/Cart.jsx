import { Grid, Skeleton, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { BASE_URL, getCart, checkout } from "../../utils/api";


const Cart = () => {
    const { user } = useSelector((store) => store.userStore);
    const [items, setItems] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const getCartItems = async () => {
            const response = await getCart(user);
            setItems(response);
        };

        getCartItems();
    }, [user]);


    const checkoutCart = async (user) => {
        const v = await checkout(user)
        console.log(v)
        navigate("/checkout")
    }

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
                                                        $
                                                        {
                                                            cartItem.productId
                                                                .price
                                                        }
                                                    </p>
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
            <div>
                <button onClick = {()=>checkoutCart(user)} className="btn btn-outline-dark my-dark w-25 mb-5">
                    <p className="fw-bold m-0">PROCEED TO CHECKOUT</p>
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
