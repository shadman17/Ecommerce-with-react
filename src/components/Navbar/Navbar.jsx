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
import { PagesRounded } from "@mui/icons-material";

const pages = ["Home", "Products", "Contact", "Cart", "Login", "Register"];

const Navbar = () => {
  const color = grey["A100"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ flexGrow: 1, color: "black" }} />
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
                <MenuItem key={pages[0]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[0]}
                  </Typography>
                </MenuItem>

                <MenuItem key={pages[1]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[1]}
                  </Typography>
                </MenuItem>

                <MenuItem key={pages[2]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[2]}
                  </Typography>
                </MenuItem>

                <MenuItem key={pages[3]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[3]}
                  </Typography>
                </MenuItem>

                <MenuItem key={pages[4]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[4]}
                  </Typography>
                </MenuItem>

                <MenuItem key={pages[5]} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    {pages[5]}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              color="black"
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Fake Commerce
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                variant="outlined"
                sx={{ mx: 1, color: "black", border: "2px black solid" }}
                startIcon={<ShoppingCartCheckoutIcon />}
              >
                Cart
              </Button>

              <Button
                variant="outlined"
                sx={{ mx: 1, color: "black", border: "2px black solid" }}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{ mx: 1, color: "black", border: "2px black solid" }}
                startIcon={<HowToRegIcon />}
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
