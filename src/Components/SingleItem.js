import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import "./SingleItem.css";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { addToCart } from "../redux/allAction";
import { Link } from "react-router-dom";

// const Img = styled('img')({
//   marginBottom: '1rem',
//   display: 'block',
//   width: '30rem',
//   height: "20rem",
// });

function SingleItem({ product, addItem }) {
  return (
    <Paper
      className="single-cont"
      sx={{
        p: 2,

        maxWidth: "40rem",
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        height: "auto",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item>
          <ButtonBase sx={{ width: 128, height: "auto" }}>
            <img className="img" alt="complex" src={product.images[0]} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {product.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {product.brand}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Rs {product.price}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => addItem(product, product.id)}
              >
                Add To Cart
              </Button>
            </Grid>
            <Grid item>
              {/* <Button size="small" variant="contained" color="error">
            Delete
        </Button> */}
              <Link to="/">
                {" "}
                <Button
                  size="small"
                  style={{ marginLeft: "1rem" }}
                  variant="contained"
                >
                  Back
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
const mapStateToProps = (state) => {
  return {
    product: state.currItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item, id) => dispatch(addToCart(item, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);
