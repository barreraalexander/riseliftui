'use client'; 

import { FormEvent, MouseEvent } from 'react'

import { get_cookie } from '@/app/actions/cookieActions';


// async function getData() {
//     const res = await fetch('https://api.example.com/data');
//     // Recommendation: handle errors
//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data')
//     }
//     return res.json();
//   }


export default function CreateExerciseRow(props: any){

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const delete_target = event.currentTarget
        const formData = new FormData(event.currentTarget)
        const api_url = process.env.NEXT_PUBLIC_BASE_URL;

        const user_cookie = await get_cookie("bearer_token")


        const formDataObject = Object.fromEntries(formData);
        const jsonData = JSON.stringify(formDataObject);
        
        // alert(user_cookie.value)

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

            if (response.ok){
                props.setLoading(true)
                delete_target.remove()

                
            }

            
        }



    }

    async function onDelete(event: MouseEvent<HTMLButtonElement>) {
        const button = event.target as HTMLButtonElement

        const parent_container = button.closest('.new_exercise_form') as HTMLElement

        parent_container.remove()

    }


    return (
        <form className='new_exercise_form' onSubmit={onSubmit}>
            <div className="bg-dark d-flex new_exercise p-3 align-items-end  border border-primary border-2 rounded gap-4">
                <div className="form-group">
                    <label htmlFor={`exercise_name_${props.new_id}`}>
                        Exercise Name
                    </label>
                    <input id={`exercise_name_${props.new_id}`} name="name" className="form-control" type="text"  />

                </div>

                <div className="form-group">
                    <label htmlFor={`exercise_primary_target_${props.new_id}`}>
                        Primary Target
                    </label>
                    <select name="" id="" className="form-select">
                        <option value="0">
                            Select the Muscle
                        </option>
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-success" type="submit"> Save</button>
                </div>
                <div className="form-group">
                    <button className="btn btn-danger" type="button" onClick={onDelete}> Delete</button>
                </div>

            </div>
        </form>
    )

}