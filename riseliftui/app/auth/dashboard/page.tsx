// 'use client'

import React from 'react';

import { get_cookie } from "@/app/actions/cookieActions";

import { useState, useEffect } from 'react'

import UserHub from './components/userhub';
import StartWorkout from './components/start_workout_card';
import ExercisesCard from './components/exercises_card';
import WorkoutHistoryCard from './components/workout_history_card';

import { UserDashboardContextProvider } from './userDashboardConstData';


export default function Dashboard(){
    
    return (
    <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>
        <div className="d-flex flex-column gap-5">
            <UserDashboardContextProvider>
                <StartWorkout/>
                <UserHub/>
                <ExercisesCard/>
                <WorkoutHistoryCard/>
            </UserDashboardContextProvider>

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