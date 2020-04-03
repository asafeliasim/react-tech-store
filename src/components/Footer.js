import React from 'react';
import styled from 'styled-components';
import {ProductConsumer} from "../context";
import {Link} from 'react-router-dom';
import {Comments, FacebookProvider, Share} from "react-facebook";
export default function Footer() {
    return(
        <ProductConsumer>
            {value =>{
                return <FooterWrapper>
                    <div className="container py-3">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="text-capitalize">
                                    copyright &copy; tech store {new Date().getFullYear()}. all rights reserved{" "}
                                </p>
                            </div>
                            <div className="col-md-6 d-flex justify-content-around">
                                {value.socialIcons.map(item=> <a href={item.url} key={item.id}>{item.icon}</a>)}
                            </div>
                            <FacebookProvider appId="1290048377862322">

                                {/*<Comments href="https://www.facebook.com/asaf.eliasim"/>*/}
                                   <Share href="https://www.facebook.com/asafeliasim">
                                       {({handleClick,loading})=>(
                                        <button type="button" display={loading} onClick={handleClick}>Share</button>
                                        )}
                                    </Share>
                            </FacebookProvider>
                            <div>
                                <a href="https://darksky.net/poweredby/">
                                    <p>Powered by Dark Sky</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </FooterWrapper>
            }}
        </ProductConsumer>
    )
}

const FooterWrapper= styled.footer`
  background: var(--darkGray);
  color: var(--mainWhite);
  .icon{
  font-size: 1.5rem;
  color: var(--mainWhite);
  transition: var(--mainTransition);
  }
  .icon:hover{
  color: var(--primaryColor);
  cursor: pointer;
  }
`;
