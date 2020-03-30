import React from 'react';
import styled from 'styled-components';

import {FaMobileAlt,FaHeart} from "react-icons/fa";
import {ProductConsumer} from "../context";
import {FacebookProvider, Share, Like, Comments,Feed,EmbeddedPost} from 'react-facebook';


export default function Product({product}) {
console.log(product.img);
    //const images = [img1,img2,img3];
return <ProductConsumer>

    {
        value=>{
            const {addToCart,setSingleProduct} = value;
        return (
        <ProductWrapper className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3">
            <div className="card">
                <div className="image-container">
                <figure className="image-container">
                                <img
                                    src={product.img}
                                    className="card-img-top p-5"
                                    alt="product"
                                    style={{height: '300px'}}
                                >
                                </img>
                </figure>

                <div className="product-icon">
               {/* <FaCartPlus className="icon"/>*/}
                    <FacebookProvider appId="1290048377862322">

                        <Comments href="https://www.facebook.com/asaf.eliasim"/>
                     {/*   <Share href="https://www.facebook.com/asaf.eliasim">
                            {({handleClick,loading})=>(
                                <button type="button" display={loading} onClick={handleClick}><FaHeart className="icon"/></button>
                            )}
                        </Share>*/}
                    </FacebookProvider>
            </div>
        </div>
          <div className="card-body d-flex justify-content-between">
                <p className="mb-0">{product.title}</p>
                <p className="mb-0">{product.company}</p>
                <p className="mb-0 text-main">${product.price}</p>
            </div>
        </div>
        </ProductWrapper>
        )
    }}

</ProductConsumer>
};


const ProductWrapper = styled.div`
  .card{
    box-shadow: 5px 5px 5px 0px  rgba(0,0,0,0.3);
    transition: var(--mainTransition);
    height: 100%;
  }
  .card:hover{
    box-shadow: 7px 10px 5px 0px rgba(0,0,0,0.5);
    cursor: pointer;
  }
  .card:hover .card-img-top{
    transform: scale(1.5);
    opacity: 0.2;
  }
  .img-container{
    position: relative;
  }
  .product-icon{
    transition: var(--mainTransition);
    position: absolute;
    top: 50%;
    left:40%;
    transform: translate(-50%, -50%);
    opacity: 0;
    display: inline-block;
  }
  .icon{
    font-size: 2.5rem;
    margin: 1rem;
    padding: 0.5rem;
    color: var(--primaryColor);
    background: var(--mainBlack);
    border-radius: 0.5rem;
  }
  .card:hover .product-icon{
    opacity: 1;
  }
  .card-body{
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  }
  
`;
