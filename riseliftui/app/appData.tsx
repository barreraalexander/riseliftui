"use client";

import React, {
    useContext,
    useEffect,
    useState
}
from "react";

import {
    AppData,
    ModalDetails,
    ModalStatus,
    User
} from "./data/models";

const defaultAppData: AppData = {
    // show_error_modal: false,
    // set_show_error_modal: () => null,

    modal_details: {
        title: null,
        description: null,
        is_hidden: true,
        status: ModalStatus.NEUTRAL
    },
    set_modal_details: () => null,
    
    show_sidebar: false,
    set_show_sidebar: () => null,
    
    user: null,
    set_user: () => null,

}

export const appContext = React.createContext<
    AppData
>(defaultAppData);



export const AppContextProvider = (
    {children} : {children: React.ReactNode}
) => {
    const [
        show_sidebar,
        set_show_sidebar
    ] = useState<
        boolean
    >(defaultAppData.show_sidebar)


    const [
        user,
        set_user
    ] = useState<
        User | null
    >(defaultAppData.user)


    const [
        modal_details,
        set_modal_details
    ] = useState<
        ModalDetails
    >(defaultAppData.modal_details)


    return (
    <appContext.Provider value={{

        modal_details,
        set_modal_details,

        show_sidebar,
        set_show_sidebar,

        user,
        set_user,
    }}>
        {children}
    </appContext.Provider>
    );



}