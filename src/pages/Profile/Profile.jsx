import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, } from "react-redux";
import { BASE_URL, getUserDetails } from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";
import { Grid, Skeleton } from "@mui/material";

const Profile = () => {
    const { user } = useSelector((store) => store.userStore);
    const [profileInfo, setProfileInfo] = useState("");
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const response = await getUserDetails(user);
            setProfileInfo(response);
        };

        const getOrder = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${user.userInfo.token}`,
                    },
                };

                const response = await fetch(
                    `${BASE_URL}/order/my-order`,
                    requestOptions
                );
                const data = await response.json();
                console.log(data);
                setItems(data);
            } catch (e) {
                console.log(e);
            }
        };

        getUser();
        getOrder();
    }, [user]);

    const Loading = () => {
        return (
            <div>
                <Grid container>
                    <Grid md={6} item>
                        <Skeleton
                            variant="rectangular"
                            width={400}
                            height={400}
                        />
                    </Grid>
                    
                </Grid>
            </div>
        );
    };

    const ShowCart = () => {
        return (
            <div>
                {items.map((orders) =>
                    orders.products.map((order) => {
                        return (
                            <div
                                className="px-4 my-5 bg-light rounded-3"
                                key={order.productId._id}
                            >
                                <div className="container py-4">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <img
                                                src={`${BASE_URL}${order.productId.image}`}
                                                alt={order.productId.title}
                                                height="100px"
                                                width="80px"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <h5>
                                                {order.productId.title.slice(
                                                    0,
                                                    20
                                                ) + "....."}
                                            </h5>
                                            <p className="lead fw-bold">
                                                {`${order.quantity} x $${order.productId.price} `}
                                            </p>
                                        </div>
                                        <div className="col-md-4"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        );
    };

    const ShowProfile = () => {
        return (
            <div>
                <h4 className=" fw-bold">Username: {profileInfo.username}</h4>
                <h4 className=" fw-bold">Email: {profileInfo.email}</h4>
                <h4 className=" fw-bold">Phone Number: {profileInfo.phone}</h4>
                <h4 className=" fw-bold">
                    Address:{" "}
                    {`${profileInfo?.address?.number}, ${profileInfo?.address?.street} ${profileInfo?.address?.city}`}
                </h4>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="container my-5 py-3">
                <div className="row">
                    <div className="col-md-6  flex-column  justify-content-center mx-auto product">
                        <h1>Profile Information</h1>
                        <br />
                        {
                            profileInfo ? <ShowProfile /> : <Loading/>
                        }
                        

                        <button
                            onClick={() => navigate("/update-profile")}
                            className="btn btn-outline-dark dark mt-2"
                        >
                            <p className="fw-bold m-0">UPDATE PROFILE</p>
                        </button>
                    </div>
                    <div className="col-md-6 flex-column justify-content-center">
                        <h1>Order History</h1>

                        {
                            items.length !== 0 ? <ShowCart /> : <div><br/><Loading/></div>
                        }
                        <button
                            onClick={() => navigate("/checkout")}
                            className="btn btn-outline-dark dark mt-2"
                        >
                            <p className="fw-bold m-0">PROCEED TO CHECKOUT</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
