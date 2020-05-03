import React from 'react';
import Title from '../Title';
import aboutBcg from '../../images/aboutBcg.jpeg';

import './about.css';

export default function Info() {
    return(
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <img src={aboutBcg}
                            className="img-fluid img-thumbnail"
                            alt="about company"
                            style={{background:'var(--darkGray)'}}
                        />
                    </div>
                    <div className="col-10 mx-auto col-md-6 my-3">
                        <Title title="about us"/>
                        <p className="text-lead text-muted my-3 first-p">We are 4 students studying computer</p>
                        <p className="text-lead my-3" style={{color:'red',fontSize:'20px'}}><strong>This site looks like a 100 grade.</strong></p>
                        <aside>
                            <p>The fastest and most courteous service.</p>
                        </aside>

                        <button className="main-link" type="button" style={{marginTop:'2rem'}}>more info</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
