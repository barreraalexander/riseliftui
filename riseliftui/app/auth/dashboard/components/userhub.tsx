// 'use client'; 

import DemographicForm from "./demographic_form"

export default function UserHub(){
    // const api_url = process.env.NEXT_PUBLIC_BASE_URL;

    // const response = await fetch(`${api_url}/user_demographic`, {
    //     method: 'POST',
    //     body: jsonData,
    //     headers: {
    //         'Content-Type': 'application/json'
    //         }
    //     })
    



    return(
        <div className="card w-100 text-white" style={{"backgroundColor":"#000"}}>
            <div className="card-body">
                <h5 className="card-title">
                    Demographics
                </h5>
                <DemographicForm/>
            </div>
        </div>
    )
}