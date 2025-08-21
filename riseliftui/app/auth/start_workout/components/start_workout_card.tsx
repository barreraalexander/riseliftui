'use client'

import { get_cookie } from '@/app/actions/cookieActions';
import { MouseEvent} from 'react'
import { json } from 'stream/consumers';
import React, { useState, useEffect } from 'react';

// import React, { useState, useEffect } from 'react';

// import WorkoutCardHeader from './units/workout_card_header';


export default function StartWorkout(){

    const [sessionStarted, setSessionStarted] = useState(0)

    return (
        <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
            <div className="card-body">
                <WorkoutCardHeader sessionStarted={sessionStarted} setSessionStarted={setSessionStarted}/>
            </div>
        </div>



    )

}


function WorkoutCardHeader(
    sessionStarted: any,
    setsessionStarted: any,
    
){
    const target_xid = 0
    
    const [workoutSessionXid, setworkoutSessionXid] = useState(null)
    const [workoutSession, setworkoutSession] = useState(null)
    const [postWorkoutSummary, setpostWorkoutSummary] = useState(null)


    async function startWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        const user_cookie = await get_cookie("bearer_token")

        if (user_cookie){
            const response = await fetch(`${api_url}/workout_session`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Authorization': `Bearer ${user_cookie.value}`,
                    'Content-Type': 'application/json'
                    }
                })
            
            const data = await response.json()
 
            if (response.ok){
                // console.log(data)
                sessionStarted.setSessionStarted(1)
                setworkoutSessionXid(data.xid)
                setworkoutSession(data)



                // props.setLoading(true)
                // delete_target.remove()

                
            }
        }



    }

    async function endWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
        const api_url = process.env.NEXT_PUBLIC_BASE_URL;
        const user_cookie = await get_cookie("bearer_token")
        // console.log(workoutSessionXid)
        if (user_cookie){
            const response = await fetch(`${api_url}/workout_session/${workoutSessionXid}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "end_workout" : true
                }),
                headers: {
                    'Authorization': `Bearer ${user_cookie.value}`,
                    'Content-Type': 'application/json'
                    }
                })
            
            const data = await response.json()

            if (response.ok){
                sessionStarted.setSessionStarted(2)
                setpostWorkoutSummary(data)

                // props.setLoading(true)
                // delete_target.remove()

                
            }
        }


    }


    if (sessionStarted.sessionStarted==1){
        return (
        <div className='workout_card_header d-flex flex-column gap-2'>
                <h5 id="start_workout_title" className="card-title">
                    End Workout
                </h5>
                <div className="workout_container">
                    <div className="d-flex start-workout">
                        <button onClick={endWorkoutClicked} className="btn btn-danger">End Workout</button>
                    </div>
                </div>
                {workoutSession && WorkingOutCard(workoutSession, setworkoutSession)}
        </div>            
        )
        
        
    } else if (sessionStarted.sessionStarted==2) {

        return (
            <div className='workout_card_header'>
                <h5 id="start_workout_title" className="card-title">
                    Workout Summary
                </h5>
                <div className="workout_container">
                    <div className="d-flex start-workout">
                        <button onClick={startWorkoutClicked} className="btn btn-success">Start a New Workout</button>
    
                    </div>
                </div>
                {postWorkoutSummary &&
                    <div>
                        <p>this is a summary {postWorkoutSummary.xid}</p>
                    </div>
                }
            </div>            
            )
    } 
    
    else {
        return (
        <div className='workout_card_header'>
            <h5 id="start_workout_title" className="card-title">
                Start a Workout
            </h5>
            <div className="workout_container">
                <div className="d-flex start-workout">
                    <button onClick={startWorkoutClicked} className="btn btn-success">Start a New Workout</button>

                </div>
            </div>
        </div>            
        )

    }

}