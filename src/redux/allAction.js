
import * as action from "./action";

export const addToCart=(item,id)=>{
    return{
        type:action.Add_To_CART,
        payload:{
            id:id,
            item:item
        }
    }
}

export const viewItem=(item)=>{
    return{
        type:action.VIEW_ITEM,
        payload:item
            
        
    }
}

export const updateQty=(id,qty)=>{
  return{
    type:action.UPDATE_QTY,
    payload:{
        id:id,
        qty:qty
    }
  }
}

export const removeItem=(id)=>{
    return{
        type:action.REMOVE_ITEM,
        payload:id
    }
}



export const search=(value)=>{
    return{
     type:action.SEARCH,
     payload:value
    }
 }

 export const addToWishlist = (product) => ({
    type: action.ADD_TO_WISHLIST,
    payload: product,
  });
  
  export const removeFromWishlist = (productId) => ({
    type:action.REMOVE_FROM_WISHLIST,
    payload: productId,
  });
