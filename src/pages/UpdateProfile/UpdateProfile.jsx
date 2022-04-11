import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { BASE_URL, getUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/action/userAction/userAction";
import Navbar from "../../components/Navbar/Navbar";

const UpdateProfile = () => {
    const { user } = useSelector((store) => store.userStore);
    const [ profileInfo , setProfileInfo] = useState({})
    const navigate = useNavigate()

    useEffect(()=>{
        // const getUserDetails = async () => {
        //     const response = await getUser(user)
        //     setProfileInfo(response)
        // }

        // getUserDetails()
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const setUserDetails = async () => {
            const item = [data.get("email"), data.get("username"), data.get("password"), data.get("number"), data.get("street"), data.get("city"), data.get("phone")];

            const requestOptions = {
                method: "PATCH",
                headers: { "Content-Type": "application/json", "Authorization": `bearer ${user.userInfo.token}` },
                body: JSON.stringify({
                    email: item[0],
                    username: item[1],
                    password: item[2],
                    address : {
                        number: parseInt(item[3]),
                        street : item[4],
                        city: item[5],
                    },
                    phone: item[6]
                }),
            };

            const response = await fetch(`${BASE_URL}/my-detail`, requestOptions)
            const result = await response.json()
            console.log(result)
            navigate("/profile")
        };

        setUserDetails();
    };

    useEffect (()=>{

    }, []) 

    return (
        <div>
            <Navbar />

            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Update Profile
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="number"
                            label="House No"
                            name="number"
                            autoComplete="number"

                        />

                        <TextField
                            margin="normal"
                            fullWidth
                            id="street"
                            label="Street No"
                            name="street"
                            autoComplete="street"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoComplete="city"
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#000" }}
                        >
                            Update
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default UpdateProfile;
