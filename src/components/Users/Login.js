import React,{useState,useContext,useEffect} from 'react';
import Hero from '../Hero';
import {Form,Button} from 'react-bootstrap';
import AuthContext from "../../context/auth/AuthContext";

const Login=(props)=>{

    const authContext= useContext(AuthContext);
    const{login,error,isAuthenticated,isAdmin} = authContext;

    useEffect(()=>{
        //@todo - addition to state isAdmin

        if(isAuthenticated && isAdmin){
            props.history.push('/dashboard');
        }

        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'Invalid Credentials'){
            throw error;
        }

    },[error,isAuthenticated,props.history]);
    const[user,setUser]= useState({
       email:'',
       password:''
    });

    const{email,password} = user;
    const onChane = e => setUser({...user,[e.target.name]:e.target.value});
    const onSubmit = e => {
      e.preventDefault();
      if(email === '' || password === ''){
         console.log('Please fill in all fields');
      }else{
          login({
             email,
             password
          });
      }
    };
    return(
        <>
            <Hero title="Login"/>
            <Form className="w-75 h-100 mx-auto my-5">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="your email" name="email" onChange={onChane}/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="more then 6 characters" name="password" onChange={onChane}/>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mt-2" onClick={onSubmit}>
                    Login
                </Button>
            </Form>
        </>
    )
};
export default Login;
