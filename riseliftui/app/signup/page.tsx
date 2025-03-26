'use client'

import RegisterForm from "./components/register_form";
import LoginForm from "./components/login_form";

import { get_cookie } from "../actions/cookieActions";

import { useState, useEffect } from 'react'


export default function Signup() {


    useEffect(() => {

    // const fetchData = async () => {
    //   const user_cookie = await get_cookie("bearer_token")
    //   if (user_cookie){
    //     console.log(user_cookie.value)

    //   }

    // };

    // fetchData()

    }, []);


    return (

  
    <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>

        <RegisterForm />
        <LoginForm />



    </div>
  );
}
