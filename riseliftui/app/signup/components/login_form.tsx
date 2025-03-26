'use client'; 

import { FormEvent } from 'react'

import RedAsterisk from '@/app/common_components/red_asterisk';


import { redirect } from 'next/navigation'

import { create_cookie } from '@/app/actions/cookieActions'; 


import RequiredFieldsMessage from '@/app/common_components/required_fields_message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import { loginUser } from '@/app/data/api';


export default function LoginForm() {

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)

        const res = await loginUser(formData)

        if (res){
            create_cookie(res.access_token)
            redirect('/auth/dashboard')

        }



    }



    return(
        <form className="p-2"  onSubmit={onSubmit}>
            <div className="d-flex flex-column gap-3">
                <RequiredFieldsMessage/>

                <div className="d-flex gap-3 ">
                
                <div id="email_form_group" className="form-group">
                        <label
                            htmlFor="login_email"
                        >
                            <RedAsterisk/> Email
                        </label>
                        <input
                            className="form-control"
                            id="login_email"
                            type="email"
                            name="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label
                            htmlFor="login_password"
                        >
                            <RedAsterisk/> Password
                        </label>
                        <input
                            className="form-control"
                            id="login_password"
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
    )



}