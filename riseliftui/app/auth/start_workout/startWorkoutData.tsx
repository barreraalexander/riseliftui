"use client";

import React, {useContext, useEffect} from 'react';

import { useState } from 'react';

import { StartWorkoutContextProps, StartWorkoutData } from '@/app/data/models';


const defaultStartWorkoutData: StartWorkoutData = {
    workoutSession: null,
    setWorkoutSession: () => null,
    postWorkoutSummary:null,
    setPostWorkoutSummary: () => null
}




export const StartWorkoutContext = React.createContext<StartWorkoutData>(defaultStartWorkoutData);

export const StartWorkoutContextProvider = (
    {children} : {children: React.ReactNode}
) => {

    const [workoutSession, setWorkoutSession] = useState(
        defaultStartWorkoutData.workoutSession
    )
    const [postWorkoutSummary, setPostWorkoutSummary] = useState(
        defaultStartWorkoutData.postWorkoutSummary
    )

    return (
    <StartWorkoutContext.Provider value={
        {
            workoutSession,
            setWorkoutSession,
            postWorkoutSummary,
            setPostWorkoutSummary
        }
    }>
        {children}
    </StartWorkoutContext.Provider>
    );

}
