import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";

const ListItems = ({setproductClicked, setcategoryClicked, setuserClicked, setorderClicked}) => {

    const navigate = useNavigate()

    const handleProducts = () => {
        setproductClicked(true)
        setcategoryClicked(false)
        setuserClicked(false)
        setorderClicked(false)

    }

    const handleCategories = () => {
        setproductClicked(false)
        setcategoryClicked(true)
        setuserClicked(false)
        setorderClicked(false)
    }

    const handleUsers =  () => {
        setproductClicked(false)
        setcategoryClicked(false)
        setuserClicked(true)
        setorderClicked(false)
    }

    const handleOrders =  () =>{
        setproductClicked(false)
        setcategoryClicked(false)
        setuserClicked(false)
        setorderClicked(true)
    }


    return (
        <div>
            <ListItemButton onClick={handleProducts}>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>

            <ListItemButton onClick={handleProducts}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItemButton>

            <ListItemButton onClick={handleProducts}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton onClick={handleProducts}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </div>
    );
};

export default ListItems;
