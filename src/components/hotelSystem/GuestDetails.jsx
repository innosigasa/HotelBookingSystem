import React,{Component} from 'react'
import { Guest } from '../models/Guest'
import { GuestContext } from './Guests';

export const GuestDetails=(props)=>{
    const contextType = GuestContext;
    return (
        <div>     
            <h1>Guest Details</h1>
            <Guest guest={contextType.Provider} />

                 
        </div> 
     )
}
