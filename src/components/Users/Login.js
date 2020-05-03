import React,{useState,useContext,useEffect} from 'react';
import Hero from '../Hero';
import {Form,Button} from 'react-bootstrap';
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/alertContext";
const Login=(props)=>{

    const authContext= useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const{login,error,isAuthenticated,isAdmin} = authContext;
    const {setAlert} = alertContext;
    useEffect(()=>{
        //@todo - addition to state isAdmin

        if(error === 'Invalid Credentials'){
            setAlert(error,'danger');
        }
        if(email === 'admin@gmail.com'){
            props.history.push('/dashboard');
        }

        else if(isAuthenticated && !isAdmin){
            props.history.push('/');
        }

    },[error,isAuthenticated,isAdmin,props.history]);
    const[user,setUser]= useState({
       email:'',
       password:''
    });

    const{email,password} = user;
    const onChane = e => setUser({...user,[e.target.name]:e.target.value});
    const onSubmit = e => {
      e.preventDefault();
      if(email === '' || password === ''){
         setAlert('Please fill in all fields','danger');
      }else{
          console.log(email);
          login({
             email,
             password
          });
      }
    };
    return(
        <>
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
            <Hero title="Login"/>
        </>
    )
};
export default Login;
