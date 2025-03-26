'use client'

import React, { useState, useEffect } from 'react';

import WorkoutCardHeader from './units/workout_card_header';


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