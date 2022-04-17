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


const CreateProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [baseImage, setBaseImage] = useState("");

    const { user } = useSelector((store) => store.userStore);

    const navigate = useNavigate();

    useEffect(() => {}, []);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
    };

    const handleSubmit = () => {
        const createProducts = async (
            title,
            category,
            price,
            description,
            stock,
            user
        ) => {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: parseInt(price),
                    description: description,
                    stock: parseInt(stock),
                    category: {
                        _id: category,
                    },
                    image: `${BASE_URL}${baseImage}`,
                }),
            };

            await fetch(`${BASE_URL}/products`, requestOptions)
                .then((res) => res.json())
                // .then((res) => console.log(res));
        };

        createProducts(title, category, price, description, stock, user);
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
                            Create A New Product
                        </Typography>
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={title || ""}
                            label="Product Title"
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                        />
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={category || ""}
                            label="Category ID"
                            onChange={(e) => setCategory(e.target.value)}
                            size="small"
                        />
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={price || ""}
                            label="Product Price"
                            onChange={(e) => setPrice(e.target.value)}
                            size="small"
                        />
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={description || ""}
                            label="Product Description"
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
                        />
                        <TextField
                            sx={{
                                mb: 3,
                            }}
                            value={stock || ""}
                            label="Product Stock"
                            onChange={(e) => setStock(e.target.value)}
                            size="small"
                        />
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={handleImage} />
                        </Button>
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

export default CreateProduct;
