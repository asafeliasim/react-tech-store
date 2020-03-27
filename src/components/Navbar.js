import React from 'react';
import {FaBars} from 'react-icons/fa';
import styled from 'styled-components';
import {ProductConsumer} from "../context";
import logo from '../images/logo.svg'

export default function Navbar() {
    return(
        <ProductConsumer>
            {value=> {
                const { handleSideBar} = value;
                return <NavWrapper>
                    <div className="nav-center">
                        <FaBars className="nav-icon" onClick={handleSideBar}/>
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
}
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
 `;
