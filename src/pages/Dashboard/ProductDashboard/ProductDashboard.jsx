import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getproductsList } from "../../../redux/action/productAction/productAction";
import { BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";
// import Dashboard from "../Dashboard";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const ProductDashboard = () => {
    const [deletedId, setDeletedId] = useState()
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.userStore);

    const [loading, setLoading] = useState(false);
    const { products } = useSelector((store) => store.productsList);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            dispatch(getproductsList());
            setLoading(false);
        };

        getProducts();
    }, [dispatch]);

    const deleteProduct = (id) => {
        const deleteProducts = async () => {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },

            };

            await fetch(`${BASE_URL}/products/${id}`, requestOptions)
                .then((res) => res.json())
                .then((res) => console.log(res));

            window.location.reload()
        };

        deleteProducts();

    }

    const handleClickOpen = (id) => {
        setDeletedId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Loading = () => {
        <h1>Loading....</h1>;
    };

    const ShowProduct = () => {
        return (
            <div>
                <Link
                    to={`/dashboard/createProduct`}
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
                        Create A New Product
                    </Button>
                </Link>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell>
                                    <Link
                                        to={`/dashboard/editProduct/${product._id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {product._id}
                                    </Link>
                                </TableCell>

                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.category.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.description}</TableCell>

                                <TableCell>
                                    <Button onClick={()=>handleClickOpen(product._id)}
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
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                // TransitionComponent={Transition}
                >
                    <DialogTitle>{"Remove Product?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>deleteProduct(deletedId)}>Yes</Button>
                        <Button onClick={handleClose} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    return <div>{loading ? <Loading /> : <ShowProduct />}</div>;
};

export default ProductDashboard;
