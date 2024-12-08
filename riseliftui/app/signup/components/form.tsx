'use client'; 

import { FormEvent } from 'react'
// import { useEffect } from 'react';
import RedAsterisk from '@/app/common_components/red_asterisk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { redirect } from 'next/navigation'


export default function RegisterForm() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        const formDataObject = Object.fromEntries(formData);
        const jsonData = JSON.stringify(formDataObject);


        const response = await fetch(`${api_url}/user`, {
        method: 'POST',
        body: jsonData,
        headers: {
            'Content-Type': 'application/json'
            }
        })


   
      // Handle response if necessary



        const data = await response.json()

        let error_messages = document.querySelectorAll(".error-message")

        for (let elem of error_messages){
            elem.remove()
        }


        if (response.ok){
            let target = document.querySelector("#registration_submit_button")
            if (target){
                target.disabled = true
                target.classList.remove('btn-primary')
                target.classList.add('btn-success')
                let new_element = document.createElement('p')
                new_element.textContent = "Successfully created your account, logging in now."

                redirect('/auth/dashboard')


            }

        } else {
            if (response.status==409){
                
                let target = document.querySelector("#email_form_group")
                if (target){
                    let new_element = document.createElement('small')
                    new_element.textContent = '*An account with this email has already been created.'
                    new_element.id = 'email_form_group_small'

                    new_element.classList.add('form-text', 'text-danger', 'error-message')

                    target.append(new_element)

                }



            }
        }

    }
  
  
  

  
    return (    
        <form className="p-2" onSubmit={onSubmit}>
            
            <div className="d-flex flex-column gap-3">
                <div className="form-group">
                    <small id="emailHelp" className="form-text text-danger">
                    *Fields with a red asterisk are required. 
                    </small>
                </div>

                <div className="d-flex gap-3 ">

                    <div className="form-group">
                        <label
                            htmlFor="first_name"
                        >
                            <RedAsterisk/> First Name
                        </label>
                        <input
                            className="form-control"
                            id="first_name"
                            type="text"
                            name="first_name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="last_name"
                        >
                            Last Name
                        </label>
                        <input
                            className="form-control"
                            id="last_name"
                            type="text"
                            name="last_name"
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="display_name"
                        >
                            Display Name
                        </label>
                        <input
                            className="form-control"
                            id="display_name"
                            type="text"
                            name="display_name"
                        />
                    </div>




                </div>
                
                <div className="d-flex gap-3">
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

                    <div className="form-group">
                        <label
                            htmlFor="password"
                        >
                            <RedAsterisk/> Password
                        </label>
                        <input
                            className="form-control"
                            id="password"
                            type="text"
                            name="password"
                            required
                        />
                    </div>


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
  