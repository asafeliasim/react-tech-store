import React,{useState,useContext,useEffect} from 'react';
import Hero from '../Hero';
import {Form,Button}  from 'react-bootstrap';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/alertContext';

const Register =(props)=>{
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const [user,setUser] = useState({
       name:'',
       email:'',
       password:''
    });

    const {name,email,password} = user;
    const {setAlert} = alertContext;
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
        if(name=== '' || email === ''|| password === ''){
            setAlert('Please enter all fields','danger');
        }
        else if(password.length < 6 )
        {
            setAlert('Password need to include at least 6 characters','danger');
        }
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
             <Hero title="register here"/>
         </>
    )
};

export default Register;
