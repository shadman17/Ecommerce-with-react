import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { grey } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const pages = [
    "Home",
    "Products",
    "Contact",
    "Cart",
    "Login",
    "Register",
    "Logout",
];

const Navbar = () => {
    const { user } = useSelector((store) => store.userStore);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("persist:userlogin");
        navigate('/signin')
        window.location.reload() 
    };

    const color = grey["A100"];
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <div>
            <AppBar position="static" sx={{ background: color }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            color="black"
                            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                        >
                            Fake Commerce
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon
                                    sx={{ flexGrow: 1, color: "black" }}
                                />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                <NavLink
                                    to="/"
                                    style={{ textDecoration: "none" }}
                                >
                                    <MenuItem
                                        key={pages[0]}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            color="black"
                                        >
                                            {pages[0]}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>

                                <NavLink
                                    to="/products"
                                    style={{ textDecoration: "none" }}
                                >
                                    <MenuItem
                                        key={pages[1]}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography
                                            textAlign="center"
                                            color="black"
                                        >
                                            {pages[1]}
                                        </Typography>
                                    </MenuItem>
                                </NavLink>

                                <MenuItem
                                    key={pages[2]}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography
                                        textAlign="center"
                                        color="black"
                                    >
                                        {pages[2]}
                                    </Typography>
                                </MenuItem>

                                {user.message === "Logged in Successfully" ? (
                                    <div>
                                        <NavLink
                                            to="/"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <MenuItem
                                                key={pages[3]}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography
                                                    textAlign="center"
                                                    color="black"
                                                >
                                                    {pages[3]}
                                                </Typography>
                                            </MenuItem>
                                        </NavLink>
                                        <NavLink
                                            to="/"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <MenuItem
                                                key={pages[6]}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography
                                                    textAlign="center"
                                                    color="black"
                                                >
                                                    {pages[6]}
                                                </Typography>
                                            </MenuItem>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div>
                                        <NavLink
                                            to="/signin"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <MenuItem
                                                key={pages[4]}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography
                                                    textAlign="center"
                                                    color="black"
                                                >
                                                    {pages[4]}
                                                </Typography>
                                            </MenuItem>
                                        </NavLink>

                                        <NavLink
                                            to="/signup"
                                            style={{ textDecoration: "none" }}
                                        >
                                            <MenuItem
                                                key={pages[5]}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Typography
                                                    textAlign="center"
                                                    color="black"
                                                >
                                                    {pages[5]}
                                                </Typography>
                                            </MenuItem>
                                        </NavLink>
                                    </div>
                                )}
                            </Menu>
                        </Box>
                        <Typography
                            color="black"
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            Fake Commerce
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <NavLink to="/" style={{ textDecoration: "none" }}>
                                <Button
                                    variant="outlined"
                                    key={pages[0]}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        mx: 1,
                                        my: 2,
                                        color: "black",
                                        display: "block",
                                        border: "2px solid black",
                                    }}
                                >
                                    {pages[0]}
                                </Button>
                            </NavLink>

                            <NavLink
                                to="/products"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    variant="outlined"
                                    key={pages[1]}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        mx: 1,
                                        color: "black",
                                        display: "block",
                                        border: "2px solid black",
                                    }}
                                >
                                    {pages[1]}
                                </Button>
                            </NavLink>

                            <Button
                                variant="outlined"
                                key={pages[2]}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    mx: 1,
                                    color: "black",
                                    display: "block",
                                    border: "2px solid black",
                                }}
                            >
                                {pages[2]}
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 0,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {user.message && user?.userInfo?.role === "user" ? (
                                <div>
                                    <NavLink
                                        to="/cart"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mx: 1,
                                                color: "black",
                                                border: "2px black solid",
                                            }}
                                            startIcon={
                                                <ShoppingCartCheckoutIcon />
                                            }
                                        >
                                            Cart
                                        </Button>
                                    </NavLink>

                                    <NavLink
                                        to="/profile"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mx: 1,
                                                color: "black",
                                                border: "2px black solid",
                                            }}
                                            startIcon={<LogoutIcon />}
                                        >
                                            Profile
                                        </Button>
                                    </NavLink>

                                    <Button
                                        onClick={handleLogout}
                                        variant="outlined"
                                        sx={{
                                            mx: 1,
                                            color: "black",
                                            border: "2px black solid",
                                        }}
                                        startIcon={<LogoutIcon />}
                                    >
                                        Logout
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <NavLink
                                        to="/signin"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mx: 1,
                                                color: "black",
                                                border: "2px black solid",
                                            }}
                                            startIcon={<LoginIcon />}
                                        >
                                            Login
                                        </Button>
                                    </NavLink>

                                    <NavLink
                                        to="/signup"
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                mx: 1,
                                                color: "black",
                                                border: "2px black solid",
                                            }}
                                            startIcon={<HowToRegIcon />}
                                        >
                                            Register
                                        </Button>
                                    </NavLink>
                                </div>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
};

export default Navbar;
