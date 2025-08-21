'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPlus,
    faCircleInfo
} from '@fortawesome/free-solid-svg-icons';

import React, {
    useState,
    useEffect,
    useContext,
    FormEvent,
    MouseEvent,
    ChangeEvent,

} from 'react';

import {
    WorkoutRoutinesContext,
    WorkoutRoutinesContextProvider
} from './workoutRoutinesConstData';

import {
    NewExercises,
    Exercises,
    Exercise,
    TargetMuscleOption,
    WorkoutRoutineDays,
    WorkoutRoutine,
    WorkoutRoutines
} from '@/app/data/models';

import {
    getExercises,
    createExercise,
    updateExercise,
    deleteExercise,
    createWorkoutRoutineExerciseRelationship,
    updateWorkoutRoutineExerciseRelationship
} from '@/app/data/api';

import "./page.css";


export default function WorkoutRoutinesPage(){
    
    return (
    <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>
        <div className="d-flex flex-column gap-5">
            <WorkoutRoutinesContextProvider>
                <RoutinesCard/>
                <ExercisesCard/>
            </WorkoutRoutinesContextProvider>
        </div>

    </div>
    )
}




function ExercisesCard(){
    const { userExercises, setUserExercises } = useContext(WorkoutRoutinesContext);

    const [loading, setLoading] = useState<Boolean>(true);

    const createNewExercise = async () => {
        const formData = new FormData()

        const newExercise = await createExercise(formData)
        if (newExercise){
            setUserExercises([newExercise, ...userExercises ?? []])

        }
    };



    useEffect(()=>{

        const setExercisesData = async () => {
            const exercises = await getExercises()
            setLoading(false)
            setUserExercises(exercises)
        }
        setExercisesData()

    }, [setUserExercises, setLoading])


    return (
        <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
            <div className="card-body">
                <h5 className="card-title">
                    Manage Your Exercises
                </h5>
                <small>
                <FontAwesomeIcon icon={faCircleInfo} /> Creating exercises here makes them easily selectable when creating routings, and when working out. 
                </small>

                <div className="create_exercise_container">
                    <button onClick={createNewExercise} className="btn btn-success">
                    <FontAwesomeIcon icon={faPlus} /> Create a New Exercise
                </button>

                    <div id="existing-exercise-container" className='d-flex flex-column gap-3 mt-5'>
                        {userExercises && userExercises.map((exercise) => (
                            <UpdateExerciseRow key={exercise.xid} new_id={exercise.xid} loading={loading} setLoading={setLoading} is_new={false} exercise={exercise} />
                        ))}
                    </div>
                </div>

                
            </div>



        </div>

    )

}


interface RountineCardProps {
    user_workout_routine: WorkoutRoutine
}


function RoutinesCard(){
    const {
        selectedWorkoutRoutineDay,
        setSelectedWorkoutRoutineDay,
        userWorkoutRoutines,
        setUserWorkoutRoutines,
        userExercises,
    } = useContext(WorkoutRoutinesContext);

    const RountineCard: React.FC<RountineCardProps> = ({user_workout_routine}) => {
        // const [
        //     selectedWorkoutRoutineExerciseRelationships,
        //     setSelectedWorkoutRoutineExerciseRelationships
        // ] = useState(user_workout_routine.exercise_relationships)


        const updateSelectedDay = () => {
    
            setSelectedWorkoutRoutineDay(user_workout_routine.day)
        }

        const addExerciseToRoutine = async () => {
            const jsonData = JSON.stringify({
                "workout_routine_xid" : user_workout_routine.xid
            })

            const updated_workout_routine = await createWorkoutRoutineExerciseRelationship(jsonData)
            // I should get back the new routine instead

            if (userWorkoutRoutines && updated_workout_routine){

                const updatedWorkoutRoutines = userWorkoutRoutines.map((c, i) => {
                    if (c.xid === updated_workout_routine.xid) {
                      return updated_workout_routine;
                    } else {
                      return c;
                    }
                  });
                
                //   console.log(updated_workout_routine)
                setUserWorkoutRoutines(updatedWorkoutRoutines)
                // setSelectedWorkoutRoutineExerciseRelationships(updated_workout_routine.exercise_relationships)


            }

        }

        const changeExercise = async(event: ChangeEvent<HTMLSelectElement>) => {
            const target = event.currentTarget

            
            // const v = event.target.value

            if (target.dataset.workout_routine_exercise_relationship_xid){
                const workout_routine_exercise_relationship_xid : number = parseInt(target.dataset.workout_routine_exercise_relationship_xid)
                
                const jsonData = JSON.stringify({
                    "workout_routine_exercise_relationship_xid" : target.dataset.workout_routine_exercise_relationship_xid,
                    "exercise_xid" : event.target.value
                })
    
    
                const updated_workout_routine = await updateWorkoutRoutineExerciseRelationship(
                    jsonData,
                    parseInt(target.dataset.workout_routine_exercise_relationship_xid)
                )
    
                if (userWorkoutRoutines && updated_workout_routine){

                    const updatedWorkoutRoutines = userWorkoutRoutines.map((c, i) => {
                        if (c.xid === updated_workout_routine.xid) {
                          return updated_workout_routine;
                        } else {
                          return c;
                        }
                      });
                    
                    setUserWorkoutRoutines(updatedWorkoutRoutines)    
                }
    


                
            }



            // const user_workout_routine_xid = target.dataset.workout_routine_exercise_relationship_xid
            // we are going to get back the exercise id
            // we need the id of the relationship
            // 
            // alert('change')
        }


        if (user_workout_routine.day==selectedWorkoutRoutineDay){
            return (
                <div className="routine-card-expanded card w-50">
                    <div className="card-body">
                        <p className="card-title">
                            {user_workout_routine.day}
                        </p>
                        <button className='btn btn-primary' onClick={addExerciseToRoutine}>Add Exercise</button>
                         <div className="routine_exercises_container">
                            {
                                user_workout_routine.exercise_relationships && user_workout_routine.exercise_relationships.map((exercise_relationship) => (
                                    <div key={exercise_relationship.xid}>
                                        <select
                                            data-workout_routine_exercise_relationship_xid={exercise_relationship.xid}
                                            className='form-select'
                                            onChange={changeExercise}
                                            value={exercise_relationship.exercise?.xid}
                                        >
                                            {
                                            userExercises && userExercises.map((exercise) => (
                                                <option
                                                    key={exercise.xid}
                                                    // how do i get the selected value? i need to know which 
                                                    value={exercise.xid}
                                                >
                                                    {exercise.name}
                                                </option>
                                        
                                            ))
                                            }

                                        </select>
                                    </div>
                                ))
                            }
                            

                        </div>
                    </div>

                </div>
            )
        }


        return (
            <div className="routine-card card" onClick={updateSelectedDay}>
                <div className="card-body">
                    <p className="card-title">
                        {user_workout_routine.xid}
                    </p>
                    <div className="routine_exercises_count">
                        {
                            user_workout_routine.exercise_relationships ?
                            (<p>
                                {user_workout_routine.exercise_relationships.length} Exercises
                            </p>
                            )
                                :
                            (
                            <p>
                                0 Exercises
                            </p>
                            )
                        }
                    </div>
                </div>

            </div>
        );
    };


    return (
    <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
        <div className="card-body">
            <h5 className="card-title">
                Manage Your Routines
            </h5>
            <small>
            <FontAwesomeIcon icon={faCircleInfo} /> Routines are an important part of BRAND NAME 
            </small>
            <p>
                selected: {selectedWorkoutRoutineDay}
            </p>
            <div className="routine_days_container d-flex flex-wrap gap-2">
                {
                    userWorkoutRoutines && userWorkoutRoutines.map((workout_routine: WorkoutRoutine) => (
                        <RountineCard key={workout_routine.xid} user_workout_routine={workout_routine}/>
                    ))
                }
            </div>
        </div>
    </div>
    )

}

// function RoutineCard(){
//     return (
//     <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
//         <div className="card-body">
//             <h5 className="card-title">
//                 Manage Your Routines
//             </h5>
//             <small>
//             <FontAwesomeIcon icon={faCircleInfo} /> Routines are an important part of BRAND NAME 
//             </small>
            


//         </div>
//     </div>
//     )

// }



interface UpdateExerciseRowProps{
    exercise: Exercise
}

const UpdateExerciseRow: React.FC<UpdateExerciseRowProps> = ({
    exercise
}) => {

    const { userExercises, setUserExercises, targetMuscleOptions } = useContext(WorkoutRoutinesContext);

    const [inputValue, setInputValue] = useState<string|null>(exercise.name);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)


        const updated_exercise = await updateExercise(formData, exercise.xid)
        
        if (userExercises && updated_exercise){

            const updatedExercises = userExercises.map((c, i) => {
                if (c.xid === updated_exercise.xid) {
                  return updated_exercise;
                } else {
                  return c;
                }
              });
            
            setUserExercises(updatedExercises)

        }    


        // props.setLoading(true)
    }


    async function onDelete(event: MouseEvent<HTMLButtonElement>) {

        const deleted_exercise = await deleteExercise(exercise.xid)
        // props.setLoading(true)

        if (userExercises && deleted_exercise){
            const filteredExercises= userExercises.filter(
                exercise => exercise.xid != deleted_exercise.xid
            )
            setUserExercises(filteredExercises)
            // props.setLoading(false)
        }
    }




    return (
        <form className='new_exercise_form'  onSubmit={onSubmit}>
            <div className="bg-dark d-flex new_exercise p-3 align-items-end  border border-primary border-2 rounded gap-4">
                <div className="form-group">
                    <label htmlFor={`exercise_name_${exercise.xid}`}>
                        Exercise Name
                    </label>
                    <input
                        id={`exercise_name_${exercise.xid}`}
                        name="name"
                        className="form-control" 
                        type="text"
                        value={inputValue ?? ''}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <label htmlFor={`exercise_primary_target_${exercise.xid}`}>
                        Primary Target
                    </label>
                    
                    <select name="common_muscle_group_target" id="" className="form-select" aria-placeholder='Select a Muscle' defaultValue={exercise.common_muscle_group_target ?? ''} >
                        {targetMuscleOptions && targetMuscleOptions.map((option: TargetMuscleOption) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
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
