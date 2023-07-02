import React from "react";
import { connect } from "react-redux";
import { updateQty, removeItem } from "../redux/allAction";
import { Button } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Cart.css";

function CartItem({ product, removeItem, updateqty }) {
  const handleQty = (id, e) => {
    if (e.target.value > 0) {
      updateqty(id, e.target.value);
    }
  };
  return (
    <>
      <hr />
      <div className="itemContainer">
        <div className="imgc">
          <img
            className="cart-image"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <div className="desc">
          <div className="itemName">
            <h3>{product.title}</h3>
          </div>
          <div className="itemQuantity">
            <label htmlFor="qty">Qty</label>
            <input
              min="1"
              type="number"
              id="qty"
              name="qty"
              value={product.qty}
              onChange={(e) => handleQty(product.id, e)}
              style={{ width: "3.5rem", marginLeft: "0.4rem" }}
            />
          </div>
          <div className="itemdesc">
            <p style={{ color: "#222f3e", textAlign: "center" }}>
              {product.description}
            </p>
          </div>
          <div className="pc">
            <Button
              variant="contained"
              color="error"
              onClick={() => removeItem(product.id)}
            >
              <DeleteIcon />
              Delete
            </Button>
            <h3 style={{ marginTop: "1%", marginLeft: "1%" }}>
              ₹ {product.price}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateqty: (id, qty) => dispatch(updateQty(id, qty)),
    removeItem: (id) => dispatch(removeItem(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
