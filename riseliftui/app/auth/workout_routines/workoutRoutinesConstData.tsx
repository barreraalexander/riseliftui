"use client";


import React, {useContext, useEffect} from 'react';

import { useState } from 'react';

import {
    WorkoutRoutinesContextProps,
    WorkoutRoutinesConstData,
    TargetMuscleOption,
    Exercises,
    WorkoutRoutineDays,
    WorkoutRoutines
} from '@/app/data/models';

import { get_workout_routine_const_data } from '@/app/data/api';

const defaultWorkoutRoutinesConstData: WorkoutRoutinesConstData = {
    targetMuscleOptions: [],
    // targetMuscles : [
    //     "Loading...",
    // ],
    
    userExercises : [],
    setUserExercises: () => [],
    
    
    selectedWorkoutRoutineDay : null,
    setSelectedWorkoutRoutineDay: () => [],

    userWorkoutRoutines : null,
    setUserWorkoutRoutines: () => []
}




export const WorkoutRoutinesContext = React.createContext<WorkoutRoutinesConstData>(defaultWorkoutRoutinesConstData);
export const WorkoutRoutinesContextProvider = (
    {children} : {children: React.ReactNode}
) => {


    // const [targetMuscles, setTargetMuscles] = useState(defaultWorkoutRoutinesConstData.targetMuscles)
    const [userExercises, setUserExercises] = useState<
        Exercises
    >(defaultWorkoutRoutinesConstData.userExercises)

    const [userWorkoutRoutines, setUserWorkoutRoutines] = useState<
        WorkoutRoutines
    >(defaultWorkoutRoutinesConstData.userWorkoutRoutines)
    
    const [targetMuscleOptions, setTargetMusclesOptions] = useState<
        TargetMuscleOption[]
    >(defaultWorkoutRoutinesConstData.targetMuscleOptions)
    
    const [selectedWorkoutRoutineDay, setSelectedWorkoutRoutineDay] = useState<
        WorkoutRoutineDays | null
    >(defaultWorkoutRoutinesConstData.selectedWorkoutRoutineDay)
    


    useEffect(()=>{
        const setConstData = async () => {

            const workout_routine_const_data = await get_workout_routine_const_data()

            // setTargetMuscles(workout_routine_const_data.target_muscles)
            if (workout_routine_const_data){

                setTargetMusclesOptions(workout_routine_const_data.target_muscle_options)
                setUserWorkoutRoutines(workout_routine_const_data.user_workout_routines)
            }


        }


        
        setConstData()

    }, [setTargetMusclesOptions])

    return (
    <WorkoutRoutinesContext.Provider value={
            {
                targetMuscleOptions,
                userExercises,
                setUserExercises,
                selectedWorkoutRoutineDay,
                setSelectedWorkoutRoutineDay,
                userWorkoutRoutines,
                setUserWorkoutRoutines
            }
        }>
        {children}
    </WorkoutRoutinesContext.Provider>
    );

}


// export const workoutRoutinesConstData = useContext(WorkoutRoutinesContext)

// const { data, setData } = useContext(WorkoutRoutinesContext);
