// 'use client'

import React from 'react';

import { get_cookie } from "@/app/actions/cookieActions";

import { useState, useEffect } from 'react'

import UserHub from './components/userhub';
import StartWorkout from './components/start_workout_card';
import ExercisesCard from './components/exercises_card';
import WorkoutHistoryCard from './components/workout_history_card';


export default function Dashboard(){
    


    // useEffect(() => {
    //     alert('once')

    //     const fetchData = async () => {
    //         const user_cookie = await get_cookie("bearer_token")



            
    //         if (user_cookie){


    //         }
    
    //     };
    
    //     fetchData()
    
    // }, []);
    








    return (
    <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>
        <div className="d-flex flex-column gap-5">
            <StartWorkout/>
            <UserHub/>
            <ExercisesCard/>
            <WorkoutHistoryCard/>

        </div>

    </div>
    )
}


// export async function getStaticProps() {
//     // Run your function here, e.g., fetch data from an API
//     // const data = await fetchDataFromAPI();
  
//     // return {
//     //   props: {
//     //     data,
//     //   },
//     // };

//     alert('loading')
//   }