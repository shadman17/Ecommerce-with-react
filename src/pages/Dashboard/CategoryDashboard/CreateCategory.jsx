import React, { useState, useEffect } from "react";
import { useSelector, useDisptch } from "react-redux";

import {
    TextField,
    Container,
    Grid,
    Paper,
    Typography,
    Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/api";


const CreateCategory= () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useSelector((store) => store.userStore);

    const navigate = useNavigate();

    useEffect(() => {}, []);

    const handleSubmit = () => {
        const createCategories= async (
            name,
            description,
            user
        ) => {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                }),
            };

            await fetch(`${BASE_URL}/category`, requestOptions)
                .then((res) => res.json())
                .then((res) => console.log(res));
        };

        createCategories(name, description, user);
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
                            Create A New Category
                        </Typography>
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={name || ""}
                            label="Category Name"
                            onChange={(e) => setName(e.target.value)}
                            size="small"
                        />

                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={description || ""}
                            label="Category Description"
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
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
                            Create
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={3}></Grid>
            </Grid>
        </Container>
    );
};

export default CreateCategory;
