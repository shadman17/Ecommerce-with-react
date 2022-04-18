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

    const handleProducts = (bool) => {
        setproductClicked(bool)
        setcategoryClicked(!bool)
        setuserClicked(!bool)
        setorderClicked(!bool)

    }

    const handleCategories = (bool) => {
        setproductClicked(!bool)
        setcategoryClicked(bool)
        setuserClicked(!bool)
        setorderClicked(!bool)
    }

    const handleUsers =  (bool) => {
        setproductClicked(!bool)
        setcategoryClicked(!bool)
        setuserClicked(bool)
        setorderClicked(!bool)
    }

    const handleOrders =  (bool) =>{
        setproductClicked(!bool)
        setcategoryClicked(!bool)
        setuserClicked(!bool)
        setorderClicked(bool)
    }


    return (
        <div>
            <ListItemButton onClick={()=>handleProducts(true)}>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
            </ListItemButton>

            <ListItemButton onClick={()=>handleCategories(true)}>
                <ListItemIcon>
                    <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Categories" />
            </ListItemButton>

            <ListItemButton onClick={()=>handleUsers(true)}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>

            <ListItemButton onClick={()=>handleOrders(true)}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>
        </div>
    );
};

export default ListItems;
