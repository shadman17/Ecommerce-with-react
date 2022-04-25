import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";
// import Dashboard from "../Dashboard";


const OrderDashboard = () => {
    const [deletedId, setDeletedId] = useState()
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const { user } = useSelector((store) => store.userStore);
    // const dispatch = useDispatch();

    useEffect(() => {

        const getOrder = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    Authorization: `bearer ${user.userInfo.token}`,
                },
            };
            const response = await fetch(`${BASE_URL}/order`, requestOptions)
            const result = await response.json()
            console.log(result)
            setOrders(result)
        }

        getOrder()

    }, []);


    const ShowOrder = () => {
        return (
            <div>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>User Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total Orders</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order?.userId?.email}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order?.products?.length}</TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>
        );
    };

    return <div> <ShowOrder /></div>;
};

export default OrderDashboard;
