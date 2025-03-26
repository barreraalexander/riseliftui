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