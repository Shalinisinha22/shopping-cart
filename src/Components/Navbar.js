import * as React from "react";
import { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.css";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../redux/allAction";
import Checkbox from "@mui/material/Checkbox";

import Badge from "@mui/material/Badge";

import IconButton from "@mui/material/IconButton";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  [theme.breakpoints.only("xs")]: {
    marginLeft: theme.spacing(2),
    width: "7.5rem",
    marginRight: "1rem",
    marginLeft: "0",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#576574",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function Navbar({ cart = [], searchBar, value }) {
  const [cartItem, setCartItem] = useState(0);
  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
    searchBar("");
  };

  useEffect(() => {
    let qty = 0;

    cart.map((item) => {
      qty += Number(item.qty);
    });
    setCartItem(qty);
  }, [cart, cartItem, value]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{ backgroundColor: "#f9ca24", color: "#ecf0f1", width: "100%" }}
      >
        <Toolbar>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              outline: "none",
              color: "#ecf0f1",
            }}
          >
            <Typography
              variant="h6"
              Wrap
              component="div"
              sx={{
                display: { xs: "inline", sm: "block" },
                fontSize: { xs: "0.85rem", sm: "2rem" },
                marginRight: { xs: "0.8rem" },
              }}
            >
              ShoppingApp
            </Typography>
          </Link>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={value}
              onChange={(e) => searchBar(e.target.value)}
              spellCheck="false"
            />
          </Search>


          <div className="navbar-icons">

          <div className="wishlist-icon">
            <Link
              to="/wishlist"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {" "}
              <FavoriteBorderIcon
                className="icon"
                sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }  }}
              ></FavoriteBorderIcon>{" "}
            </Link>
          </div>

          <div className="cart">
            <a
              onClick={goToCart}
              style={{ textDecoration: "none", color: "#ecf0f1" }}
            >
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartItem} color="primary">
                  <ShoppingCartIcon sx={{ color: "white",  fontSize: { xs: "1.5rem", sm: "2rem" } }} />
                </StyledBadge>
              </IconButton>
            </a>
          </div>

          </div>

        
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    value: state.searchText,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    searchBar: (value) => dispatch(search(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
