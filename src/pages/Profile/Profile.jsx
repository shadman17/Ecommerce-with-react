import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../../utils/api";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
    const { user } = useSelector((store) => store.userStore);
    const [profileInfo, setProfileInfo] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const response = await getUserDetails(user);
            setProfileInfo(response);
        };

        getUser();
    }, [user]);

    return (
        <div>
        <Navbar/>
            <div className="container my-5 py-3">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column  justify-content-center mx-auto product">
                        <h4 className=" fw-bold">
                            Username: {profileInfo.username}
                        </h4>
                        <h4 className=" fw-bold">Email: {profileInfo.email}</h4>
                        <h4 className=" fw-bold">
                            Phone Number: {profileInfo.phone}
                        </h4>
                        <h4 className=" fw-bold">
                            Address: {`${profileInfo?.address?.number}, ${profileInfo?.address?.street} ${profileInfo?.address?.city}`}
                        </h4>

                        <button
                            onClick={() => navigate("/update-profile")}
                            className="btn btn-outline-dark dark mt-2"
                        >
                            <p className="fw-bold m-0">UPDATE PROFILE</p>
                        </button>

                       
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
