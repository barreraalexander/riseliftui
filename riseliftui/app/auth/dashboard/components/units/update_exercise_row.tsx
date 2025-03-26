'use client'; 

import { FormEvent, MouseEvent, ChangeEvent } from 'react'

import { get_cookie } from '@/app/actions/cookieActions';
import React, { useState, useContext } from 'react';

import { UserDashboardContext } from '../../userDashboardConstData';
// import { userDashboardConstData } from '../../userDashboardConstData';

export default function UpdateExerciseRow(props: any){
    // const { data, setData } = useContext(UserDashboardContext);
    const { targetMuscles } = useContext(UserDashboardContext);
    // const { targetMuscles } = userDashboardConstData;



    // const [inputValue, setInputValue] = useState({});

    const [inputValue, setInputValue] = useState(props.exercise.name);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        const user_cookie = await get_cookie("bearer_token")

        const formDataObject = Object.fromEntries(formData);
        const jsonData = JSON.stringify(formDataObject);

        if (user_cookie){
            const response = await fetch(`${api_url}/exercise/${props.exercise.xid}`, {
                method: 'PUT',
                body: jsonData,
                headers: {
                    'Authorization': `Bearer ${user_cookie.value}`,
                    'Content-Type': 'application/json'
                    }
                })
            
            const data = await response.json()

            if (response.ok){
                props.setLoading(true)
            }   
        }
    }
  
    // async function onDelete(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault()
    //     alert('submit')
    // }


    async function onDelete(event: MouseEvent<HTMLButtonElement>) {
        // const jsonData = JSON.stringify({
        //     "deleted" : "true"
        // });

        const user_cookie = await get_cookie("bearer_token")
        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        
        // const button = event.target as HTMLButtonElement

        // const parent_container = button.closest('.new_exercise_form') as HTMLElement

        // parent_container.remove()

        if (user_cookie){
            const response = await fetch(`${api_url}/exercise/${props.exercise.xid}`, {
                method: 'DELETE',
                // body: jsonData,
                headers: {
                    'Authorization': `Bearer ${user_cookie.value}`,
                    'Content-Type': 'application/json'
                    }
                })
            
            const data = await response.json()

            if (response.ok){
                props.setLoading(true)
                // setData({"message": "Cool new message"})
            }   
        }



    }



    return (
        <form className='new_exercise_form'  onSubmit={onSubmit}>
            <div className="bg-dark d-flex new_exercise p-3 align-items-end  border border-primary border-2 rounded gap-4">
                <div className="form-group">
                    <label htmlFor={`exercise_name_${props.new_id}`}>
                        Exercise Name
                    </label>
                    <input
                        id={`exercise_name_${props.new_id}`}
                        name="name"
                        className="form-control" 
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor={`exercise_primary_target_${props.new_id}`}>
                        Primary Target
                    </label>
                    <select name="" id="" className="form-select">
                        {targetMuscles.map((muscle: string) => (
                            <option key={muscle}>
                                {muscle}
                            </option>
                        ))}


                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-success" type="submit"> Update</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-danger" type="button" onClick={onDelete}> Delete</button>
                </div>

            </div>
        </form>
    )


}