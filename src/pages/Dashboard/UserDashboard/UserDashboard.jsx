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
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getproductsList } from "../../../redux/action/productAction/productAction";
import { BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";

const UserDashboard = () => {
    const [deletedId, setDeletedId] = useState()
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.userStore);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `bearer ${user.userInfo.token}`,
                },
            };
            const response = await fetch(`${BASE_URL}/user/`, requestOptions);
            const result = await response.json();
            setUserList(result);
            console.log(result);
        };

        getUsers();
    }, [user.userInfo.token]);

    const deleteUser = (id) => {
        const deleteUsers = async () => {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${user.userInfo.token}`,
                },
            };

            await fetch(`${BASE_URL}/user/${id}`, requestOptions);
        };

        deleteUsers();
        window.location.reload()
    };

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

    const ShowUser = () => {
        return (
            <div>
                <Link
                    to={`/dashboard/createUser`}
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
                        Create A New User
                    </Button>
                </Link>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>User ID</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    <Link
                                        to={`/dashboard/editUser/${user._id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        {user._id}
                                    </Link>
                                </TableCell>

                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>

                                <TableCell>{user.phone}</TableCell>

                                <TableCell>
                                    <Button
                                        onClick={() => handleClickOpen(user._id)}
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
                    <DialogTitle>{"Remove User?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => deleteUser(deletedId)}>Yes</Button>
                        <Button onClick={handleClose} autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };

    return <div>{loading ? <Loading /> : <ShowUser />}</div>;
};

export default UserDashboard;
