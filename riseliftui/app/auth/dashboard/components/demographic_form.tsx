'use client';

import { FormEvent } from 'react'

import RequiredFieldsMessage from '@/app/common_components/required_fields_message';
import RedAsterisk from '@/app/common_components/red_asterisk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

// still need to load function

export default function DemographicForm(){

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()




        // alert('here')

    }



    return (
        <form className="p-2" onSubmit={onSubmit}>
            <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-wrap gap-3">
                    <div className="form-group col-4">
                        <label htmlFor="height">
                            Height (in)
                        </label>
                        <input id="height" name="height"  className='form-control' type="text" />
                    </div>
                    <div className="form-group col-4">
                        <label htmlFor="">
                            Weight (lb)
                        </label>
                        <input id="weight" className='form-control' type="text" />
                    </div>

                    <div className="form-group col-12">
                        <label htmlFor="">
                            Activity Level
                        </label>
                        <select name="activity_level" id="activity_level" className='form-select'>
                            <option value="0">
                                Select your Activity Level
                            </option>
                            <option value="1">
                                Sedentary
                            </option>
                            <option value="2">
                                Light
                            </option>
                            <option value="3">
                                Moderate
                            </option>
                            <option value="4">
                                Heavy
                            </option>
                        </select>
                        <small className="form-text text-light">
                        <FontAwesomeIcon icon={faCircleExclamation} /> this helps us create reasonable goals for you
                        </small>

                    </div>
                </div>


                
            </div>
            <div className="form-group mt-2">
                <button id='registration_submit_button' className="btn btn-primary" type="submit">
                <FontAwesomeIcon icon={faFloppyDisk} /> Update
                </button>
            </div>


        </form>


    )
    

}