import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    TextField,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/api";

const EditUser = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [number, setNumber] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");

    const { user } = useSelector((store) => store.userStore);

    const { id } = useParams();
    const navigate = useNavigate();

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
                `${BASE_URL}/user/${id}`,
                requestOptions
            );
            const result = await response.json();
            console.log(result)
            setEmail(result.email);
            setUsername(result.username);
            setPhone(result.phone);
            setNumber(result.address.number);
            setStreet(result.address.street);
            setCity(result.address.city);
            setZipcode(result.address.zipcode);
    
        };

        getUserDetails();
    }, [id, user.userInfo.token]);

    const handleSubmit = () => {
        const createUsers = async (
            email,
            username,
            password,
            phone,
            number,
            street,
            city,
            zipcode,
            user
        ) => {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    phone: phone,
                    address: {
                        number: parseInt(number),
                        street: street,
                        city: city,
                        zipcode: zipcode,
                    },
                }),
            };

            await fetch(`${BASE_URL}/user`, requestOptions);
        };

        createUsers(
            email,
            username,
            password,
            phone,
            number,
            street,
            city,
            zipcode,
            user
        );
        navigate("/dashboard");
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                            }}
                        >
                            Create A New User
                        </Typography>
                        <TextField
                            value={email || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            value={username || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                        />
                        <TextField
                            value={password || ""}
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                        />
                        <TextField
                            value={phone || ""}
                            margin="normal"
                            required
                            fullWidth
                            name="phone"
                            label="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                            id="phone"
                        />

                        <TextField
                            value={number || ""}
                            margin="normal"
                            fullWidth
                            id="number"
                            label="House No"
                            onChange={(e) => setNumber(e.target.value)}
                            name="number"
                        />

                        <TextField
                            value={street || ""}
                            margin="normal"
                            fullWidth
                            id="street"
                            onChange={(e) => setStreet(e.target.value)}
                            label="Street No"
                            name="street"
                        />
                        <TextField
                            value={city || ""}
                            margin="normal"
                            fullWidth
                            id="city"
                            onChange={(e) => setCity(e.target.value)}
                            label="City"
                            name="city"
                        />
                        <TextField
                            value={zipcode || ""}
                            margin="normal"
                            fullWidth
                            id="zipcode"
                            onChange={(e) => setZipcode(e.target.value)}
                            label="Zipcode"
                            name="zipcode"
                        />

                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: "#000",
                            }}
                        >
                            Update
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={3}></Grid>
            </Grid>
        </Container>
    );
};

export default EditUser;
