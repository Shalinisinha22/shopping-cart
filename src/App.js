import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Product from './Components/Product';
import SingleItem from './Components/SingleItem';
import { BrowserRouter,Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Components/Cart';

function App(props) {

 
  return (

  
    <div className="App">
 

 <BrowserRouter>
    <Navbar></Navbar>
    <Routes>

      <Route exact path="/" element={<Product></Product>}></Route>
      <Route exact path="/cart" element={<Cart></Cart>}></Route>
      
    </Routes>  

{props.currItem ?
<Routes><Route exact path="/product/:id" element={<SingleItem></SingleItem>}></Route></Routes>:

  // <Navigate to="/"></Navigate>
  null
}



</BrowserRouter>

    
    </div>
  
  );
}


const mapStateToProps=(state)=>{
  return{
    currItem:state.currItem
  }
}
export default connect(mapStateToProps) (App);
