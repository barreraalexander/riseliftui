import {
    ChangeEvent,
    MouseEvent,
    useContext
} from 'react';

import {
    StartWorkoutContext,
    StartWorkoutContextProvider
} from './startWorkoutData';

import {
    updateWorkoutSession,
    createWorkoutSession,
    endWorkoutSession
} from '@/app/data/api';


export default function StartWorkoutPage(){


    return (
        <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>
        <div className="d-flex flex-column gap-5">
            <StartWorkoutContextProvider>
                <StartWorkoutCard/>
            </StartWorkoutContextProvider>


        </div>

    </div>

    )

}


function StartWorkoutCard(){
    const { workoutSession, postWorkoutSummary } = useContext(StartWorkoutContext);
    
    
    
    const WorkoutCardHeader = () => {

        async function startWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
            
            const new_workout_session = createWorkoutSession({})

            
            //         sessionStarted.setSessionStarted(1)
            //         setworkoutSessionXid(data.xid)
            //         setworkoutSession(data)
        }


        async function endWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
            
            if (workoutSession){
                endWorkoutSession(workoutSession.xid)

            }

            // sessionStarted.setSessionStarted(2)
            // setpostWorkoutSummary(data)

        }


        if (workoutSession){
            return (
                <div>
                    
                </div>
            )
        }

        if (postWorkoutSummary){
            return (
                <div>

                </div>
            )
        }

        return (
            <p>
                header
            </p>
        )
    }


    return (
        <div className="card w-100">
            <div className="card-body">
                <WorkoutCardHeader/>
            </div>
        </div>
    )
}




function WorkingOutCard(
    workoutSession: any,
    setworkoutSession: any,
    
){
    // const [workoutSessionName, setworkoutSessionName] = useState("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        workoutSession.name = event.target.value
        // console.log(workoutSession)
        setworkoutSession(workoutSession)
    };



    const handleFinishInputChange = async() => {

        const jsonData = JSON.stringify(workoutSession)


        const updated_workout_session = await updateWorkoutSession(jsonData, workoutSession.xid)

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

// function StartWorkoutPanel(){

//     const [sessionStarted, setSessionStarted] = useState(0)

//     return (
//         <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
//             <div className="card-body">
//                 <WorkoutCardHeader sessionStarted={sessionStarted} setSessionStarted={setSessionStarted}/>
//             </div>
//         </div>



//     )

// }





// function WorkoutCardHeader(
//     sessionStarted: any,
//     setsessionStarted: any,
    
// ){
//     const target_xid = 0
    
//     const [workoutSessionXid, setworkoutSessionXid] = useState(null)
//     const [workoutSession, setworkoutSession] = useState(null)
//     const [postWorkoutSummary, setpostWorkoutSummary] = useState(null)




//     async function startWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
        
//         const new_workout_session = createWorkoutSession({})

        
//         //         sessionStarted.setSessionStarted(1)
//         //         setworkoutSessionXid(data.xid)
//         //         setworkoutSession(data)
//     }

//     async function endWorkoutClicked(event: MouseEvent<HTMLButtonElement>) {
//         endWorkoutSession(workoutSessionXid)

//         // sessionStarted.setSessionStarted(2)
//         // setpostWorkoutSummary(data)

//     }


//     if (sessionStarted.sessionStarted==1){
//         return (
//         <div className='workout_card_header d-flex flex-column gap-2'>
//                 <h5 id="start_workout_title" className="card-title">
//                     End Workout
//                 </h5>
//                 <div className="workout_container">
//                     <div className="d-flex start-workout">
//                         <button onClick={endWorkoutClicked} className="btn btn-danger">End Workout</button>
//                     </div>
//                 </div>
//                 {workoutSession && WorkingOutCard(workoutSession, setworkoutSession)}
//         </div>            
//         )
        
        
//     } else if (sessionStarted.sessionStarted==2) {

//         return (
//             <div className='workout_card_header'>
//                 <h5 id="start_workout_title" className="card-title">
//                     Workout Summary
//                 </h5>
//                 <div className="workout_container">
//                     <div className="d-flex start-workout">
//                         <button onClick={startWorkoutClicked} className="btn btn-success">Start a New Workout</button>
    
//                     </div>
//                 </div>
//                 {postWorkoutSummary &&
//                     <div>
//                         <p>this is a summary {postWorkoutSummary.xid}</p>
//                     </div>
//                 }
//             </div>            
//             )
//     } 
    
//     else {
//         return (
//         <div className='workout_card_header'>
//             <h5 id="start_workout_title" className="card-title">
//                 Start a Workout
//             </h5>
//             <div className="workout_container">
//                 <div className="d-flex start-workout">
//                     <button onClick={startWorkoutClicked} className="btn btn-success">Start a New Workout</button>

//                 </div>
//             </div>
//         </div>            
//         )

//     }

// }