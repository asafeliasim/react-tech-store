import React from 'react';
import Hero from "../components/Hero";
import SignInImg from '../images/signInBcg.jpeg';
import SignIn from '../components/auth/SignIn';

export default function SignInPage() {
    return(
        <>
            <Hero img={SignInImg}/>
            <SignIn />
            {/*<Title title="SIGN-IN"/>*/}
        </>
    )
}
