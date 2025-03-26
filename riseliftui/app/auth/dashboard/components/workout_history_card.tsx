'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from 'react';

import ViewWorkoutCard from './units/view_workout_card';

import { get_cookie } from '@/app/actions/cookieActions';

import { WorkoutHistory } from '@/app/data/models';  


// async function getData() {
//     const user_cookie = await get_cookie("bearer_token")
//     const api_url = process.env.NEXT_PUBLIC_BASE_URL;

//     if (user_cookie){
//         const response = await fetch(`${api_url}/workout_session`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${user_cookie.value}`,
//                 'Content-Type': 'application/json'
//                 }
//             })


//     if (!response.ok) {
//         throw new Error('Failed to fetch data')
//     }

//     return response.json();
//     }
// }


export default function WorkoutHistoryCard(){
    

    const [data, setData] = useState<WorkoutHistory>([])

    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getWorkoutSessions = async () => {
            const user_cookie = await get_cookie("bearer_token")

            const api_url = process.env.NEXT_PUBLIC_BASE_URL;

            if (user_cookie){
                if (loading){
                    const response = await fetch(`${api_url}/workout_session`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${user_cookie.value}`,
                            'Content-Type': 'application/json'
                            }
                        })
    
                    const json = await response.json()
                    setData(json)
                    setLoading(false)

                }

            }




        }
        getWorkoutSessions()

    })


    return (
    <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
        <div className="card-body">
            <h5 className="card-title">
                Manage Your Workouts
            </h5>
            <div className="workout_history_container">
                <div id="existing-workout-container" className='d-flex flex-wrap gap-3'>
                    {data.map((workout_session) => (
                            <ViewWorkoutCard key={workout_session.xid} new_id={workout_session.xid} loading={loading} setLoading={setLoading} is_new={false} workout_session={workout_session} />
                        ))}
                </div>                
            </div>

        </div>
    </div>



    )
}