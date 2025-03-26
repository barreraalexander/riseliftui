import { get_cookie } from '@/app/actions/cookieActions';
// import { MouseEvent} from 'react'
import { json } from 'stream/consumers';
import React, { useState, useEffect, FormEvent, MouseEvent, ChangeEvent } from 'react';


export default function WorkingOutCard(
    workoutSession: any,
    setworkoutSession: any,
    
){

    // const [workoutSessionName, setworkoutSessionName] = useState("");
    

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        workoutSession.name = event.target.value
        console.log(workoutSession)
        setworkoutSession(workoutSession)
    };



    const handleFinishInputChange = async(event) => {

        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        const user_cookie = await get_cookie("bearer_token")

        const jsonData = JSON.stringify(workoutSession)

        if (user_cookie){
            const response = await fetch(`${api_url}/workout_session/${workoutSession.xid}`, {
                method: 'PUT',
                body: jsonData,
                headers: {
                    'Authorization': `Bearer ${user_cookie.value}`,
                    'Content-Type': 'application/json'
                    }
                })
            
            const data = await response.json()

            if (response.ok){
                setworkoutSession(data)

            }   
        }

    };


    return (
        <form>
        
            <div className='card bg-dark mt-2 col-6 d-flex flex-column'>

            <div className="form-group">
                    <input
                        id={`exercise_name_${workoutSession.xid}`}
                        name="name"
                        className="form-control" 
                        type="text"
                        value={workoutSession.name}
                        onChange={handleInputChange}
                        onBlur={handleFinishInputChange}
                    />

                </div>


            </div>

        </form>
    )



}