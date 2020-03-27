import React, {Component} from 'react';
import SignInBcg from "../../images/signInBcg.jpeg";
import Title from "../Title";
import {Link} from 'react-router-dom';
import HomePage from "../../pages/HomePage";

class SignUp extends Component {
    state = {
        email: '',
        password:'',
        name:'',
    };
    handleChange = (e) =>{
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) =>{
        // load the correct user
        console.log(this.state)
        //TODO: 1. need to past it to server
        //TODO: 2. need to go to home page
    };
    render() {
        return (
            <section className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <img src={SignInBcg}
                                 className="img-fluid img-thumbnail"
                                 alt="about company"
                                 style={{background:'var(--darkGray)'}}
                            />
                        </div>
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <Title title="Sign Up"/>
                            <form type="submit" className="col-md-3">
                                <div className="input-field">
                                    <label htmlFor="name" style={{color: '#5f5e5e'}}>User name</label>
                                    <input type="text" id="name" onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="email" style={{color: '#5f5e5e'}}>Email</label>
                                    <input type="email" id="email" onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password" style={{color: '#5f5e5e'}}>Password</label>
                                    <input type="password" id="password" onChange={this.handleChange}/>
                                </div>
                            </form>
                            <button type="button" onClick={this.handleSubmit} style={{marginTop:'2rem'}}>Login</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

};


export default SignUp;
