import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../redux/action/productDetailAction/productDetailAction";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { BASE_URL, setCart } from "../../utils/api";
import "./SelectedProduct.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SelectedProduct = () => {
    // const cartItem = useSelector((store) => store.cart);
    const { product } = useSelector((store) => store.product);

    const [cardBtn, setCartBtn] = useState("ADD TO CART");

    const { user } = useSelector((store) => store.userStore);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            dispatch(getProductDetail(id));
        };

        getProduct();
    }, [id, dispatch]);

    const addToCart = (product) => {
        if (user.message && user.message === "Logged in Successfully") {
            if (cardBtn === "ADD TO CART") {
                setCart(product._id, user);
                setCartBtn("PRODUCT ADDED TO CART");
            }
        } else {
            navigate("/signin");
        }
    };

    const handleCart = () => {
        navigate("/cart");
    };

    const Loading = () => {
        return (
            <div>
                <Grid container>
                    <Grid md={4} item>
                        <Skeleton
                            variant="rectangular"
                            width={400}
                            height={400}
                        />
                    </Grid>
                    <Grid md={1} item></Grid>
                    <Grid md={7} item>
                        <Stack spacing={1}>
                            <Skeleton
                                variant="rectangular"
                                width={400}
                                height={40}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={(400 * 12) / 7}
                                height={114}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={200}
                                height={50}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={100}
                                height={50}
                            />
                            <Skeleton
                                variant="rectangular"
                                width={(400 * 12) / 7}
                                height={114}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <div>
                <div className="container my-5 py-3">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center mx-auto product">
                            <div className="pt-3">
                                <img
                                    src={`${BASE_URL}${product.image}`}
                                    alt={product.title}
                                    height="400px"
                                />
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <h1 className="display-5 fw-bold">
                                {product.title}
                            </h1>
                            <hr />
                            <h2 className="my-2">${product.price}</h2>
                            <p className="lead ">{product.description}</p>

                            <div className="row">
                                <div className="col-md-6">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="btn btn-outline-dark dark"
                                    >
                                        <p className="fw-bold m-0">{cardBtn}</p>
                                    </button>
                                </div>
                                <div className="col-md-4">
                                    <button
                                        onClick={handleCart}
                                        className="btn btn-outline-dark dark"
                                    >
                                        <p className="fw-bold m-0">
                                            GO TO CART
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            {Object.keys(product).length === 0 ? <Loading /> : <ShowProduct />}
        </div>
    );
};

export default SelectedProduct;
