import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BASE_URL,  } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";

const UpdateProfile = () => {
    const { user } = useSelector((store) => store.userStore);
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [number,setNumber] = useState("")
    const [street,setStreet] = useState("")
    const [city,setCity] = useState("")
    const [phone,setPhone] = useState("")


    useEffect(() => {
        const getUserDetails = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
            };

            const response = await fetch(
                `${BASE_URL}/my-detail`,
                requestOptions
            );
            const result = await response.json();
            setEmail(result.email)
            setUsername(result.username)
            setNumber(result.address.number)
            setStreet(result.address.street)
            setCity(result.address.city)
            setPhone(result.phone)

        };

        getUserDetails()

    }, [user.userInfo.token]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const setUserDetails = async () => {
            

            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    address: {
                        number: parseInt(number),
                        street: street,
                        city: city,
                    },
                    phone: phone,
                }),
            };

            const response = await fetch(
                `${BASE_URL}/my-detail`,
                requestOptions
            );
            await response.json();
            navigate("/profile");
        };

        setUserDetails();
    };

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
                        value = {email || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField 
                        value = {username || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            onChange={(e)=>setUsername(e.target.value)}
                            name="username"
                        />
                        <TextField
                        value = {password || ""}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            id="password"
                        />

                        <TextField
                        value = {number || ""}
                            margin="normal"
                            fullWidth
                            id="number"
                            label="House No"
                            onChange={(e)=>setNumber(e.target.value)}
                            name="number"
                        />

                        <TextField
                        value = {street || ""}
                            margin="normal"
                            fullWidth
                            id="street"
                            onChange={(e)=>setStreet(e.target.value)}
                            label="Street No"
                            name="street"
                        />
                        <TextField
                        value = {city || ""}

                            margin="normal"
                            fullWidth
                            id="city"
                            onChange={(e)=>setCity(e.target.value)}
                            label="City"
                            name="city"
                        />
                        <TextField
                        value = {phone || ""}

                            margin="normal"
                            fullWidth
                            id="phone"
                            onChange={(e)=>setPhone(e.target.value)}
                            label="Phone Number"
                            name="phone"
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
