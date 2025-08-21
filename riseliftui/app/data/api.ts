const myFunc = async (arg1: any, arg2: any): Promise<any> => {
    return "This can be anything";

};
import { get_cookie } from "../actions/cookieActions";

import {
    Exercise,
    WorkoutSession,
    GetWorkoutRoutineConstDataResponse,
    WorkoutRoutineExerciseRelationship,
    WorkoutRoutine
} from "./models";

// export const loginUser: (formData: any) => Promise<any> = async () => {
//     // Asynchronous operations here
//     // ...
//     const result = "ge"

//     return result as string;
//   };


export const loginUser = async (formData: any): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${api_url}/login`, {
        method: 'POST',
        body: formData,
    })

    const data = await response.json()
    
    return new Promise<string>((resolve) => {
        resolve(data)

    });
    
};

export const registerUser = async (formData: any): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const formDataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataObject);

    const response = await fetch(`${api_url}/user/create_and_login`, {


    method: 'POST',
    body: jsonData,
    headers: {
        'Content-Type': 'application/json'
        }
    })

    const data = await response.json()
    
    return new Promise<string>((resolve) => {
        resolve(data)
    });
    
};


export const getExercises = async (): Promise<any> => {

    const user_cookie = await get_cookie("bearer_token")

    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    if (user_cookie){

        const response = await fetch(`${api_url}/exercise`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })

            const data = await response.json()
            
            return new Promise<Exercise[]>((resolve) => {
                resolve(data as Exercise[])
            });
    }

};

export const createExercise = async (formData: any): Promise<Exercise | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    const formDataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        const response = await fetch(`${api_url}/exercise`, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })
        
        const data = await response.json()

        return new Promise<Exercise>((resolve) => {
            resolve(data as Exercise)
        });
    
    } else {
        return null
    }
    
};


export const updateExercise = async (formData: any, exercise_xid: number): Promise<Exercise | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    const formDataObject = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        // const response = await fetch(`${api_url}/exercise`, {
        //     method: 'POST',
        //     body: jsonData,
        //     headers: {
        //         'Authorization': `Bearer ${user_cookie.value}`,
        //         'Content-Type': 'application/json'
        //         }
        //     })
        
        const response = await fetch(`${api_url}/exercise/${exercise_xid}`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })

        const data = await response.json()

        return new Promise<Exercise>((resolve) => {
            resolve(data as Exercise)
        });
    
    } else {
        return null
    }
    
};

export const deleteExercise = async (exercise_xid: number): Promise<Exercise | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    if (user_cookie){
        
        const response = await fetch(`${api_url}/exercise/${exercise_xid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })
        

        const data = await response.json()

        return new Promise<Exercise>((resolve) => {
            resolve(data as Exercise)
        });
    
    } else {
        return null
    }
    
};



export const createWorkoutSession = async (jsonData: any): Promise<WorkoutSession | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    // const formDataObject = Object.fromEntries(formData);
    // const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        const response = await fetch(`${api_url}/workout_session`, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })
        
        const data = await response.json()

        return new Promise<WorkoutSession>((resolve) => {
            resolve(data as WorkoutSession)
        });
    
    } else {
        return null
    }
    
};


export const updateWorkoutSession = async (jsonData: any, workout_session_xid: number): Promise<WorkoutSession | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    // const formDataObject = Object.fromEntries(formData);
    // const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        const response = await fetch(`${api_url}/workout_session/${workout_session_xid}`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })
        
        const data = await response.json()

        return new Promise<WorkoutSession>((resolve) => {
            resolve(data as WorkoutSession)
        });
    
    } else {
        return null
    }
    
};


export const endWorkoutSession = async (workout_session_xid: number): Promise<WorkoutSession | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    // const formDataObject = Object.fromEntries(formData);
    // const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        const response = await fetch(`${api_url}/workout_session/${workout_session_xid}`, {
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

        return new Promise<WorkoutSession>((resolve) => {
            resolve(data as WorkoutSession)
        });
    
    } else {
        return null
    }
    
};

export const createWorkoutRoutineExerciseRelationship = async (
    jsonData: any
): Promise<
    WorkoutRoutine | null
> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    // const formDataObject = Object.fromEntries(formData);
    // const jsonData = JSON.stringify(formDataObject);

    if (user_cookie){
        const response = await fetch(`${api_url}/workout_routine_exercise_relationship`, {
            method: 'POST',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })
        
        const data = await response.json()

        return new Promise<WorkoutRoutine>((resolve) => {
            resolve(data as WorkoutRoutine)
        });
    
    } else {
        return null
    }
    
};



export const updateWorkoutRoutineExerciseRelationship = async (
    jsonData: any,
    workout_routine_exercise_relationship_xid: number
): Promise<
    WorkoutRoutine | null
> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    if (user_cookie){
        
        const response = await fetch(`${api_url}/workout_routine_exercise_relationship/${workout_routine_exercise_relationship_xid}`, {
            method: 'PUT',
            body: jsonData,
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
                }
            })

        const data = await response.json()

        return new Promise<WorkoutRoutine>((resolve) => {
            resolve(data as WorkoutRoutine)
        });
    
    } else {
        return null
    }
    
};



export const get_user_dashboard_const_data = async (): Promise<any> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const response = await fetch(`${api_url}/const_page_data/get_user_dashboard_const_data`, {
        method: 'GET',
        // body: formData,
    })

    const data = await response.json()
    
    // console.log(data)

    return new Promise<string>((resolve) => {
        resolve(data)

    });
    
};

export const get_workout_routine_const_data = async (): Promise<GetWorkoutRoutineConstDataResponse | null> => {
    const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    const user_cookie = await get_cookie("bearer_token")

    if (user_cookie){
        const response = await fetch(`${api_url}/const_page_data/get_workout_routine_const_data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user_cookie.value}`,
                'Content-Type': 'application/json'
            }
            
    
            // body: formData,
        })
    
        const data = await response.json()
            
    
        return new Promise<GetWorkoutRoutineConstDataResponse>((resolve) => {
            resolve(data)
    
        });
    } else {
        return null

    }


    
};

// export const resolveAfterDelay = (delay: number): Promise<string> => {
//     return new Promise<string>((resolve) => {
//         setTimeout(() => {


//         resolve(`Resolved after ${delay}ms`);
//         }, delay);
//     });

// };