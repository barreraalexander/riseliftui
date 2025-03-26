'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import React, { useState, useEffect } from 'react';
import CreateExerciseRow from './units/create_exercise_row';
import UpdateExerciseRow from './units/update_exercise_row';


import { get_cookie } from '@/app/actions/cookieActions';


import { NewExercises, Exercises } from '@/app/data/models';

// async function getData() {
//     const user_cookie = await get_cookie("bearer_token")
//     const api_url = process.env.NEXT_PUBLIC_BASE_URL;

//     if (user_cookie){
//         const response = await fetch(`${api_url}/exercise`, {
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
//   }
// }




export default function ExercisesCard(){


    const [data, setData] = useState<Exercises>([])

    const [items, setItems] = useState<NewExercises>([]);

    const [loading, setLoading] = useState(true);


    const addNewItem = () => {

        const newItem = {
            id: items.length + 1,
        };

        setItems([...items, newItem]);
    };



    useEffect(()=>{
        const getExercises = async () => {
            const user_cookie = await get_cookie("bearer_token")

            const api_url = process.env.NEXT_PUBLIC_BASE_URL;

            if (user_cookie){
                if (loading){
                    const response = await fetch(`${api_url}/exercise`, {
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
        getExercises()

    })

    return (
        <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
            <div className="card-body">
                <h5 className="card-title">
                    Manage Your Exercises
                </h5>
                <div className="create_exercise_container">

                    <div className="d-flex create-exercise">
                        <button onClick={addNewItem} className="btn btn-success">
                            <FontAwesomeIcon icon={faPlus} /> Create a New Exercise
                        </button>

                    </div>

                    <div id="exercise-container" className='d-flex flex-column gap-3 mt-2'>

                        {items.map((item) => (
                            <CreateExerciseRow key={item.id} new_id={item.id} loading={loading} setLoading={setLoading} is_new={true} />
                        ))}


                    </div>

                    <div id="existing-exercise-container" className='d-flex flex-column gap-3 mt-5'>
                        {data.map((exercise) => (
                                <UpdateExerciseRow key={exercise.xid} new_id={exercise.xid} loading={loading} setLoading={setLoading} is_new={false} exercise={exercise} />
                            ))}


                    </div>
                </div>

                
            </div>



        </div>

    )

}

