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
import D3DiagramPage from "./pages/D3diagramPage";
import Footer from './components/Footer';
import ChatPage from "./pages/ChatPage";
import Register from "./components/Users/Register";
import Login from "./components/Users/Login";
import AuthState from "./context/auth/AuthState";
import setAuthToken from "./utils/setAuthToken";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/Alerts";
import AdminDashboard from "./components/Dashboard/AdminDashboard";

if(localStorage.token){
    setAuthToken(localStorage.token);
}
function App() {
  return (
    <>
        <AuthState>
        <AlertState>
        <Navbar />
        <Sidebar />
        <Alerts />
        <Switch>
            <Route path="/dashboard" exact component={AdminDashboard}/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/about"  component={AboutPage}/>
            <Route path="/contact"  component={ContactPage}/>/>
            <Route path="/cart"  component={CartPage}/>/>
            <Route path="/products" exact component={ProductsPage}/>
            <Route path="/" exact component={SingleProductPage}/>
            <Route path="/products/:id" exact component={SingleProductPage}/>
            <Route path="/chat" exact component={ChatPage}/>
            <Route path="/d3BestSell" component={D3DiagramPage}/>
            <Route component={DefaultPage}/>
        </Switch>
        <Footer />
        </AlertState>
        </AuthState>
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
