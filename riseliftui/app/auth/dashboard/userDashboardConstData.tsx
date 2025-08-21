"use client";


import React, {useContext, useEffect} from 'react';
const MyContext = React.createContext(null);


// export default MyContext;

import { useState } from 'react';

import { UserDashboardContextProps, UserDashboardConstData } from '@/app/data/models';

import { get_user_dashboard_const_data } from '@/app/data/api';

// import MyContext from './MyContext';


// function MyProvider({ children }) {
//     const [data, setData] = useState({ message: 'Hello from context!' });

//     return (
//     <MyContext.Provider value={{ data, setData }}>
//         {children}
//     </MyContext.Provider>
//     );
// }

// export default MyProvider;


// const defaultUserDashboardConstData: UserDashboardContextProps = {
//     userDashboardConstData : {
//         targetMuscles : null,
//         targetMuscleOptions: null
//     }
//     // targetMuscles : [
//     //     "Muscle1",
//     //     "Muscle2",
//     //     "Muscle3",
//     // ]


// }

// const defaultUserDashboardConstData: UserDashboardConstData = {
//     targetMuscles : null,
//     targetMuscleOptions: null
//     // targetMuscles : [
//     //     "Muscle1",
//     //     "Muscle2",
//     //     "Muscle3",
//     // ]


// }

const defaultUserDashboardConstData: UserDashboardConstData = {
    // targetMuscles : null,
    targetMuscleOptions: null,
    targetMuscles : [
        "Loading...",
    ]
    

}




// export const UserDashboardContext = React.createContext<{}>(defaultUserDashboardConstData);
export const UserDashboardContext = React.createContext<UserDashboardConstData>(defaultUserDashboardConstData);
// export const UserDashboardContext = React.createContext<UserDashboardConstData>(
//     defaultUserDashboardConstData
// );
// export const UserDashboardContext = React.createContext<UserDashboardContextProps>(
//     defaultUserDashboardConstData
// );

export const UserDashboardContextProvider = (
    {children} : {children: React.ReactNode}
) => {

    // const [targetMuscles, setTargetMuscles] = useState(defaultUserDashboardConstData);
    // const [userDashboardConstData, setUserDashboardConstData] = useState<UserDashboardContextProps>({targetMuscles: []});
    // const [userDashboardConstData, setUserDashboardConstData] = useState<UserDashboardContextProps>(defaultUserDashboardConstData);
        // const [userDashboardConstData, setUserDashboardConstData] = useState<UserDashboardConstData>(defaultUserDashboardConstData);

    const [targetMuscles, setTargetMuscles] = useState(defaultUserDashboardConstData.targetMuscles)
    const [targetMuscleOptions, setTargetMusclesOptions] = useState({})
    

    useEffect(()=>{
        const setConstData = async () => {

            const user_dashboard_const_data = await get_user_dashboard_const_data()

            setTargetMuscles(user_dashboard_const_data.targetMuscles)
            




        }


        
        setConstData()

    }, [setTargetMuscles])

    // setTargetMuscles(["updated"])

    // setUserDashboardConstData({userDashboardConstData})
    

    return (
    <UserDashboardContext.Provider value={{ targetMuscles, targetMuscleOptions }}>
    {/* <UserDashboardContext.Provider value={{ targetMuscles, setTargetMuscles }}> */}
        {children}
    </UserDashboardContext.Provider>
    );

}


// export const userDashboardConstData = useContext(UserDashboardContext)

// const { data, setData } = useContext(UserDashboardContext);
