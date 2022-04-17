import React, { useState, useEffect } from "react";
import { useSelector,  } from "react-redux";

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


const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [baseImage, setBaseImage] = useState("");

    const { user } = useSelector((store) => store.userStore);

    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/${id}`);
                const data = await res.json();
                setProduct(data);
                setTitle(product.title);
                setCategory(product?.category?._id);
                setPrice(product.price);
                setDescription(product.description);
                setStock(product.stock);

            } catch (error) {
                console.log(error);
            }
        };

        getProducts();
    }, [
        id,
        product?.category?._id,
        product.description,
        product.price,
        product.stock,
        product.title,
        product.image,
    ]);

    const handleImage = async (e) => {
        try {
            const file = e.target.files[0];
            const base64 = await convertBase64(file);
            setBaseImage(base64);
        } catch (e) {
            // setBaseImage(base64);
        }
    };

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

    const handleSubmit = () => {
        const editProducts = async (
            title,
            category,
            price,
            description,
            stock,
            user
        ) => {
            const requestOptions = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
                body: JSON.stringify({
                    title: title,
                    price: parseInt(price),
                    description: description,
                    stock: parseInt(stock),
                    category_id: category,
                    // image: `${BASE_URL}${baseImage}`,
                }),
            };

            await fetch(`${BASE_URL}/products/${id}`, requestOptions)
                .then((res) => res.json())
                // .then((res) => console.log(res));
        };

        editProducts(title, category, price, description, stock, user);
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
                            Update Product
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
                        {/*<Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={handleImage} />
                        </Button>*/}
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

export default EditProduct;
