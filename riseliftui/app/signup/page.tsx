'use client'

import RegisterForm from "./components/register_form";
import LoginForm from "./components/login_form";

import { get_cookie } from "../actions/cookieActions";

import { useState, useEffect } from 'react'

import "./page.css";

enum PageState {
    SIGNIN = "Sign In",
    REGISTER = "Register",
}

interface RenderFormProps {
    page_state: PageState
}


export default function Signup() {
    const [pageState, setPageState] = useState<PageState>(PageState.REGISTER)
    
    
    const RenderForm: React.FC<RenderFormProps> = ({page_state}) => {
        if (page_state==PageState.REGISTER){
            return <RegisterForm />
            
        } else if (page_state==PageState.SIGNIN) {
            return <LoginForm />

        }


        return (
          <div id="component-render-form">
            {page_state}
          </div>
        );
      };

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

  
    <div id="page-signup">
        <div id="riselift-promotional" className="d-none d-md-block"></div>
        <RenderForm page_state={pageState} />
    </div>
  );
}
