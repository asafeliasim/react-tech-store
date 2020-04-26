import React,{useContext} from 'react';
import {FaBars} from 'react-icons/fa';
import styled from 'styled-components';
import {ProductConsumer} from "../context";
import logo from '../images/logo.svg'
import AuthContext from "../context/auth/AuthContext";

const Navbar = ()=>{
    const authContext = useContext(AuthContext);
    const {isAuthenticated,logout,user} = authContext;

    const onLogout = () => {
      logout();
    };
    const authLinks = (
      <div className="user-link">
            <a  onClick={onLogout} href="#!">
                <h3>Logout</h3>
            </a>
      </div>
    );
    const guestLinks = (
        <>
            <div className="user-link">
                <a href="/register"><h3>Register</h3></a>
            </div>
            <div className="user-link">
                <a href="/login"><h3>Login</h3></a>
              </div>
        </>
    );

    return(
        <ProductConsumer>
            {value=> {
                const { handleSideBar} = value;
                return <NavWrapper>
                    <div className="nav-center">
                        <FaBars className="nav-icon" onClick={handleSideBar}/>
                        {isAuthenticated? authLinks: guestLinks}

                        <img src={logo} alt="tech store logo"/>
                      {/*  <div className="row">
                            <button style={{padding:"20px", color:" #222",border:"none",background:"#fafafa",transition:"all 0.3s ease-in-out"}}>Sign In</button>
                            <button style={{padding:"20px", color:" #222",border:"none",background:"#fafafa",transition:"all 0.3s ease-in-out"}}>Sign up</button>
                        </div>*/}

                    </div>
                </NavWrapper>
            }}
        </ProductConsumer>
    )
};

const NavWrapper = styled.nav`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  background: var(--mainGray);
  border-bottom: 3px solid var(--primaryColor);
  z-index: 1;
  .nav-center{
      display: flex;
      align-items:center;
      justify-content: space-between;
      max: 1170px;
      margin: 0 auto;
   }
  .nav-icon{
     font-size: 1.5rem;
     cursor: pointer;
   }
   .cart-items{
    background: var(--primaryColor);
    color: var(--mainWhite);
    font-size: 0.85rem;
    position: absolute;
    top: 25px;
    right: 15px;
    padding: 0 5px;
    border-radius: 50%;
   }
   .user-link a{
     text-decoration: none!important;
     color: var(--mainBlack)!important;
     transition: all 0.2s ease-in-out;
   }
   h3:hover{
      background: var(--primaryColor)!important;
   }
   .user-link a:hover{
    color: var(--mainWhite)!important;
   }
   h3{
    font-family: 'Open Sans', sans-serif;
   }
 `;
export default Navbar;
