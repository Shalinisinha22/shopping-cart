import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Product.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  addFavourites,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  search,
  viewItem,
} from "../redux/allAction";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Product(props) {
  const [products, setproduct] = useState([]);

  const navigate = useNavigate();

  const handleCart = async (item, id) => {
    await props.addCart(item, id);
  };

  const handleView = (item) => {
    navigate(`/product/${item.id}`);
    props.search("");

    props.viewItem(item);
  };

  const isItemInWishlist = (productId) => {
    return props.wishlist.some((item) => item.id === productId);
  };
 

  const loadProduct = async () => {
    const res = await axios.get("https://dummyjson.com/products");

    const data = res.data;
    // console.log(data)
    setproduct(data.products);

    let filterarr = [];

    if (props.value == "") {
      filterarr = data.products;
    } else {
      filterarr = products.filter((productObj) => {
        let title = productObj.title.toLocaleLowerCase();
        return title.includes(props.value.toLocaleLowerCase());
      });
    }

    setproduct(filterarr);
  };

  useEffect(() => {
    loadProduct();
  }, [props.value, props.wishlist, props.addwishlist]);

  return (
    <div className="products-cont">
      {products.length != 0 ? (
        products.map((product) => (
          <div key={product.id} className="product">
            <Card  className="product-card"style={{ width: "20rem", height: "32rem" }}>
              <img
                className="product-image"
                src={product.images[0]}
                alt={product.title}
              ></img>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                {/* <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginTop: "1rem" }}
                >
                  {product.description}
                </Typography> */}
                <Typography
                  variant="h6"
                  component="div"
                  color="subtitle"
                  style={{ marginTop: "1rem" }}
                >
                  Rs {product.price}
                </Typography>
              </CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button size="small" onClick={() => handleView(product)}>
                  View Item
                </Button>
                <Button
                  size="small"
                  onClick={() => handleCart(product, product.id)}
                >
                  Add to cart
                </Button>
              </CardActions>

            
                {isItemInWishlist(product.id) ? 
                  <a onClick={()=>props.removeFromWishlist(product.id)}> <FavoriteIcon className="icon" style={{color:"red",marginBottom:"1rem"}}></FavoriteIcon></a>
                    : 
                  <a
                    onClick={() => props.addToWishlist(product)}
                   
                  >
                    <FavoriteIcon className="icon" style={{color:"gray",marginBottom:"1rem"}}></FavoriteIcon>
                   
                  </a>
                }
             
            </Card>
          </div>
        ))
      ) : (
        <>
          <CircularProgress></CircularProgress>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    value: state.searchText,
    wishlist: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item, id) => dispatch(addToCart(item, id)),
    viewItem: (item) => dispatch(viewItem(item)),
    search: (value) => dispatch(search(value)),
    addToWishlist: (product) => dispatch(addToWishlist(product)),
    removeFromWishlist:(id)=>dispatch(removeFromWishlist(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
