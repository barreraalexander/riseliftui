import React, {
    Dispatch,
    SetStateAction
} from 'react';

type Workout = {
    xid: number;
}

export type Exercise = {
    xid: number;
    user_xid: number;
    name: string | null;
    common_muscle_group_target: string | null;
}

export type WorkoutRoutineExerciseRelationship = {
    xid: number;
    workout_routine_xid: number;
    exercise_xid: number;
    exercise: Exercise | null;
}


type NewExercise = {
    id: number;
}


export enum WorkoutRoutineDays {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
    SUNDAY = "SUNDAY",
}

export type WorkoutSession = {
    xid: number;
    // user_xid: number;
    // name: string | null;
    // common_muscle_group_target: string | null;
}

export type PostWorkoutSummary = {
    // xid: number;
    // user_xid: number;
    // name: string | null;
    // common_muscle_group_target: string | null;
}


export type UserDashboardConstData = {
    targetMuscles: string[] | null;
    targetMuscleOptions: {} | null;
}

export type WorkoutRoutinesConstData = {
    targetMuscleOptions: TargetMuscleOption[];

    userExercises: Exercise[];
    setUserExercises: Dispatch<SetStateAction<Exercise[]>>;

    selectedWorkoutRoutineDay: WorkoutRoutineDays | null;
    setSelectedWorkoutRoutineDay: Dispatch<SetStateAction<WorkoutRoutineDays | null>>;

    userWorkoutRoutines: WorkoutRoutines | null;
    setUserWorkoutRoutines: Dispatch<SetStateAction<WorkoutRoutines | null>>;
}



export type StartWorkoutData = {
    workoutSession: WorkoutSession | null;
    setWorkoutSession: Dispatch<SetStateAction<WorkoutSession|null>>;

    postWorkoutSummary: PostWorkoutSummary | null;
    setPostWorkoutSummary: Dispatch<SetStateAction<PostWorkoutSummary|null>>;





    // targetMuscleOptions: TargetMuscleOption[];
    // userExercises: Exercise[];
    // setUserExercises: Dispatch<SetStateAction<Exercise[]>>;
}

export type CommonDataConstData = {
    app_display_name: string;
}


export interface UserDashboardContextProps {
    userDashboardConstData: UserDashboardConstData

}
export interface WorkoutRoutinesContextProps {
    workoutRoutinesConstData: WorkoutRoutinesConstData
}

export interface StartWorkoutContextProps {
    startWorkoutData: StartWorkoutData
}

export type TargetMuscleOption = {
    value: string;
    label: string;
}

export type WorkoutRoutine = {
    xid: number;
    name: string|null;
    day: WorkoutRoutineDays;
    is_rest_day: Boolean;
    exercise_relationships: WorkoutRoutineExerciseRelationship[];
}

export type GetWorkoutRoutineConstDataResponse = {
    target_muscle_options: TargetMuscleOption[];
    user_workout_routines: WorkoutRoutine[];
}


export type WorkoutHistory = Workout[] 
export type Exercises = Exercise[]
export type NewExercises = NewExercise[]
export type WorkoutRoutines = WorkoutRoutine[] | null


export enum ModalStatus{
    POSITIVE,
    NEGATIVE,
    NEUTRAL
}

export type ModalDetails = {
    title: string | null;
    description: string | null;
    status: ModalStatus | null;
    is_hidden: boolean;
}

export type User = {
    xid: number;
    email: string;
}

export type AppData = {
    // show_modal: boolean;
    // set_show_error_modal: Dispatch<SetStateAction<boolean>>;
    
    modal_details: ModalDetails;
    set_modal_details: Dispatch<
        SetStateAction<
            ModalDetails
        >
    >;

    show_sidebar: boolean;
    set_show_sidebar: Dispatch<
        SetStateAction<
            boolean
        >
    >;

    
    // error_description: string | null;
    // set_error_description: Dispatch<SetStateAction<string | null>>;

    // generated_files:  GeneratedFile[] | null;
    // set_generated_files: React.Dispatch<React.SetStateAction<GeneratedFile[] | null>>;

    user: User | null;
    set_user: Dispatch<
        SetStateAction<
            User|null
        >
    >;


};

export enum ExplanationCards {
    STEP1,
    STEP2,
    STEP3,
}
