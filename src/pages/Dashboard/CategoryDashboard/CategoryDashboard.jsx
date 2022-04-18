import React, { useState, useEffect } from "react";
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesList } from "../../../redux/action/categoryAction/categoryAction"

import { BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";
// import Dashboard from "../Dashboard";

const CategoryDashboard = () => {
    const { user } = useSelector((store) => store.userStore);

    const [loading, setLoading] = useState(false);
    const { categories } = useSelector((store) => store.categoriesList);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            dispatch(getCategoriesList());
            setLoading(false);
        };

        getCategories();
    }, [dispatch]);

    const deleteCategory = (id) => {
        const deleteCategories = async () => {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },

            };

            await fetch(`${BASE_URL}/category/${id}`, requestOptions)
                .then((res) => res.json())
                .then((res) => console.log(res));

            window.location.reload()
        };

        deleteCategories();

    }

    const Loading = () => {
        <h1>Loading....</h1>;
    };

    const ShowCategory = () => {
        return (
            <div>
                <Link
                    to={`/dashboard/createCategory`}
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "#000",
                            width: "200px",
                        }}
                    >
                        Create A New Category
                    </Button>
                </Link>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Category ID</TableCell>
                            <TableCell>Category Name</TableCell>
                            <TableCell>Category Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>
                                    <Link
                                        to={`/dashboard/editCategory/${category._id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {category._id}
                                    </Link>
                                </TableCell>

                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() => deleteCategory(category._id)}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{
                                            mt: 3,
                                            mb: 2,
                                            backgroundColor: "#000",
                                        }}
                                    >
                                        DELETE
                                    </Button>{" "}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return <div>{loading ? <Loading /> : <ShowCategory />}</div>;
};

export default CategoryDashboard;
