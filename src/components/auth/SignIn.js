import React, {Component} from 'react';
import SignInBcg from "../../images/signInBcg.jpeg";
import Title from "../Title";

class SignIn extends Component {
    state = {
        email: '',
        password:''
    };
    handleChange = (e) =>{
       this.setState({
           [e.target.id]: e.target.value
       })
    };
    handleSubmit = (e) =>{
        // load the correct user
        e.preventDefault();
        console.log(this.state)
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
                            <Title title="Sign In"/>
                            <form onSubmit={this.handleSubmit} className="col-md-3">
                                <div className="input-field">
                                    <label htmlFor="email" style={{color: '#5f5e5e'}}>Email</label>
                                    <input type="email" id="email" onChange={this.handleChange}/>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="password" style={{color: '#5f5e5e'}}>Password</label>
                                    <input type="password" id="password" onChange={this.handleChange}/>
                                </div>
                            </form>
                            <button className="main-link" type="button" onSubmit={this.handleSubmit} style={{marginTop:'2rem'}}>Login</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

};


export default SignIn;
