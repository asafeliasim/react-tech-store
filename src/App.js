import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import DefaultPage from "./pages/Default";
import SingleProductPage from "./pages/SingleProductPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
//import SideCart from "./components/SideCart";
import Footer from './components/Footer';
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
        <Navbar />
        <Sidebar />
       {/* <SideCart />*/}
        <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/about"  component={AboutPage}/>
            <Route path="/contact"  component={ContactPage}/>/>
            <Route path="/cart"  component={CartPage}/>/>
            <Route path="/products" exact component={ProductsPage}/>
            <Route path="/" exact component={SingleProductPage}/>
            <Route path="/products/:id" exact component={SingleProductPage}/>
            <Route path="/chat" exact component={ChatPage}/>
            <Route component={DefaultPage}/>
        </Switch>
        <Footer />
    </>

  );
}

const color = '#f15025';

const Button = styled.button`
  color: white;
  background: ${color};
  font-size: ${(props) => props.large?'3rem':'1rem'};
`;
export default App;
