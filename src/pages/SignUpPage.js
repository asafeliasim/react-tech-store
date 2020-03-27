import React from 'react';
import SignUp from '../components/auth/SignUp'
import Hero from "../components/Hero";
import SignUpBcg from '../images/signUpBcg.jpeg';

export default function SignUpPage() {
    return(
        <>
            <Hero img={SignUpBcg}/>
            <SignUp />
            {/*<Title title="SIGN-IN"/>*/}
        </>
    )
}
