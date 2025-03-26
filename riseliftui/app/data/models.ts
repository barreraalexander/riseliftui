type Workout = {
    xid: number;
}

type Exercise = {
    xid: number;
    user_xid: number;
    name: string
}


type NewExercise = {
    id: number;
}

export type UserDashboardConstData = {
    targetMuscles: string[] | null;
    targetMuscleOptions: {} | null;

}
// export interface UserDashboardConstData {
//     targetMuscles: string[] | null

// }

export interface UserDashboardContextProps {
    userDashboardConstData: UserDashboardConstData
    // setUserDashboardConstData: any
}



export type WorkoutHistory = Workout[] 
export type Exercises = Exercise[]
export type NewExercises = NewExercise[]



// type Point = {
//     x: number;
//     y: number;
// };

// interface MyInterface {
//     property1: string;
//     property2: number;
//     property3: boolean;
// }