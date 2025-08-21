
import React from 'react';

import UserHub from './components/userhub';

import WorkoutHistoryCard from './components/workout_history_card';

import { UserDashboardContextProvider } from './userDashboardConstData';


export default function Dashboard(){
    
    return (
    <div className="bg-dark text-white p-2" style={{"minHeight":"100vh"}}>
        <div className="d-flex flex-column gap-5">
            <UserDashboardContextProvider>
                <UserHub/>
                <WorkoutHistoryCard/>
            </UserDashboardContextProvider>

        </div>

    </div>
    )
}
