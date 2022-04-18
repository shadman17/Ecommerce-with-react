import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../redux/action/userAction/userAction";
import Navbar from "../../components/Navbar/Navbar";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            FakeCommerce {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function SignIn() {
    const [userMessage, setUserMessage] = useState("");
    const { user } = useSelector((store) => store.userStore);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.message) {
            setUserMessage("");
        } else if (user.message === "Logged in Successfully") {
            if (user.userInfo.role === "user") {
                navigate("/");
            } else {
                navigate("/dashboard");
            }
        } else {
            setUserMessage("Please Enter Correct Username or password");
        }
    }, [user.message, navigate, user?.userInfo?.role]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const getUser = async () => {
            const item = [data.get("email"), data.get("password")];

            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: item[0],
                    password: item[1],
                }),
            };

            const response = await fetch(`${BASE_URL}/signin`, requestOptions);
            const result = await response.json();
            dispatch(userLogin(result));
            // navigate("/")
        };

        getUser();
    };

    return (
        <div>
            <Navbar />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {userMessage ? userMessage : null}

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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: "#000" }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to={`/signup`}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </div>
    );
}
