import React,{useState,useContext,useEffect} from 'react';
import Hero from '../Hero';
import {Form,Button}  from 'react-bootstrap';
import AuthContext from '../../context/auth/AuthContext';

const Register =(props)=>{
    const authContext = useContext(AuthContext);
    const [user,setUser] = useState({
       name:'',
       email:'',
       password:''
    });

    const {name,email,password} = user;
    const {register,isAuthenticated} = authContext;

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/')
        }
    },[isAuthenticated,props.history]);

    const onChange = e =>{
      setUser({...user,[e.target.name]:e.target.value});
    };
    const onSubmit = e =>{
        e.preventDefault();
       register({
           name,
           email,
           password
       });
        console.log(name);
        console.log(email);
        console.log(password);
    };
    return(
         <>
             <Hero title="register here"/>
             <Form className="w-75 h-100 mx-auto my-5">
                 <Form.Group controlId="formGroupName">
                    <Form.Label>User name</Form.Label>
                     <Form.Control type="text" placeholder="name" name="name" onChange={onChange} required/>
                 </Form.Group>
                 <Form.Group controlId="formGroupEmail">
                     <Form.Label>Email</Form.Label>
                     <Form.Control type="email" placeholder="your email" name="email" onChange={onChange} required/>
                 </Form.Group>
                 <Form.Group controlId="formGroupPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="more then 6 characters" name="password"
                                   onChange={onChange} requried
                     />
                 </Form.Group>
                 <Button variant="primary" type="submit" className="w-100 mt-2" onClick={onSubmit}>
                     OK
                 </Button>
             </Form>
         </>
    )
};

export default Register;
