import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import bg from "../../assets/bg.jpg";
import Grid from "@mui/material/Grid";
import Navbar from "../Navbar/Navbar";

const styles = {
  card: {
    margin: "auto",
    width: "85%",
    height: "auto",
  },
};

const Header = () => {
  return (
    <div>
      <Container>
        <Card style={styles.card}>
          <Box sx={{ position: "relative" }}>
            <CardMedia component="img" image={bg} />
            <Grid container>
              <Grid item md={8}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  <Typography variant="h2">NEW COLLECTIONS</Typography>
                  <Typography variant="h5">
                    CHECK OUT ALL THE PRODUCTS
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </div>
  );
};

export default Header;
