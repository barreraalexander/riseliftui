'use client'; 

import React, { useState } from 'react';

import { cookies } from 'next/headers';

import { FormEvent } from 'react'


import RedAsterisk from '../../common_components/red_asterisk';
// import RedAsterisk from '@/app/common_components/red_asterisk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { redirect } from 'next/navigation'

import { create_cookie } from '../../actions/cookieActions'; 
import { registerUser } from '@/app/data/api';
// import { create_cookie } from '@/app/actions/cookieActions'; 

import RequiredFieldsMessage from '../../common_components/required_fields_message';
// import RequiredFieldsMessage from '@/app/common_components/required_fields_message';



enum ComponentState {
    NEUTRAL = "NEUTRAL",
    IS_LOGGING_IN = "IS_LOGGING_IN",
    IS_ERRORED_OUT = "IS_ERRORED_OUT",
    LOGGING_IN_SUCCESSFUL = "LOGGIN_IN_SUCCESSFUL",
}

export default function RegisterForm() {

    const [componentState, setComponentState] = useState<ComponentState>(ComponentState.NEUTRAL)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setComponentState(ComponentState.IS_LOGGING_IN)
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const data = await registerUser(formData)

        if (data){
            setComponentState(ComponentState.LOGGING_IN_SUCCESSFUL)
            await create_cookie(data.access_token)
            redirect('/auth/dashboard')
        }


        // console.log(data)

        // const data_as_json = data.json()
        // const data = await registerUser(formData).json()

        // const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        // const formDataObject = Object.fromEntries(formData);
        // const jsonData = JSON.stringify(formDataObject);


        // const response = await fetch(`${api_url}/user`, {
        // method: 'POST',
        // body: jsonData,
        // headers: {
        //     'Content-Type': 'application/json'
        //     }
        // })


   
      // Handle response if necessary



        

        // let error_messages = document.querySelectorAll(".error-message")

        // for (let elem of error_messages){
        //     elem.remove()
        // }


        // if (response.ok){
        //     // let target = document.querySelector("#registration_submit_button") as HTMLButtonElement
        //     if (target){
        //         target.disabled = true
        //         target.classList.remove('btn-primary')
        //         target.classList.add('btn-success')
        //         let new_element = document.createElement('p')
        //         new_element.textContent = "Successfully created your account, logging in now."


        //         const login_form_data = new FormData();
        //         login_form_data.append("username", data.email);
        //         if (formData != null){
        //             const pw = formData.get('password')
        //             // alert(pw)


        //             login_form_data.append("password", pw);

        //         }



        //         const response2 = await fetch(`${api_url}/login`, {
        //             method: 'POST',
        //             body: login_form_data,
        //         })
            

        //         const data2 = await response2.json()


        //         // console.log(data2)

        //         if (response2.ok){
        //             create_cookie(data2.access_token)
                    
                    
        //             redirect('/auth/dashboard')




        //         }




        //     }

        // } else {
        //     if (response.status==409){
                
        //         // let target = document.querySelector("#email_form_group")
        //         // if (target){
        //         //     let new_element = document.createElement('small')
        //         //     new_element.textContent = '*An account with this email has already been created.'
        //         //     new_element.id = 'email_form_group_small'

        //         //     new_element.classList.add('form-text', 'text-danger', 'error-message')

        //         //     target.append(new_element)

        //         // }



        //     }
        // }

    }
  
  
  

  
    return (    
        <form id='component-register-form' className="p-2" onSubmit={onSubmit}>
                <div className="register_form_container">

                    <RequiredFieldsMessage/>
                    <div id="email_form_group" className="form-group">
                        <label
                            htmlFor="email"
                        >
                            <RedAsterisk/> Email
                        </label>
                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            name="email"
                            required
                        />
                    </div>

                    <div className="form-group mt-2">
                        <button id='registration_submit_button' className="btn btn-primary" type="submit">
                            <FontAwesomeIcon icon={faPaperPlane} /> Submit
                        </button>
                    </div>
                </div>

        </form>
    );
  }
  