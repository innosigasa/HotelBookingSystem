import React, {useState,useCallback}from 'react'
import { useHistory } from 'react-router-dom';
import * as constants from '../models/HRBSVals'
import '../css/Buttons.css'

export default function GuestCreate() {
    
    const [FirstName,setFirstName] = useState("");
    const [LastName,setLastName] = useState("");
    const history = useHistory();

    const onSubmit =async ()=>{
        const guestData = {
            "firstName" : FirstName,
            "lastName" : LastName
        }
        const requestOptions ={
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(guestData)
        }
        try {
            const result = await fetch(constants.getAllGuestsUrl,requestOptions)
            if(result.status===200){
                alert("Guest Successfully Created")
                setFirstName("");
                setLastName("")
                moveToHome()
            }
            
        } catch (error) {
            console.log("Check connection string")
        }
    }
  
    const moveToHome = useCallback(() => history.push('/guestPage'), [history]);

    return (
    <div>
        <h1> Create Guest </h1>
        <form action="">
            <label htmlFor="FirstName">First Name</label><br />
            <input type="text" name="FirstName" id="" onChange={(e)=>setFirstName(e.target.value)} /> <br />
            <label htmlFor="LastName">Last Name</label><br />
            <input type="text" name="LastName" id="" onChange={(e)=>setLastName(e.target.value)} /> <br />
            <input type="button" value="Create Guest" onClick={onSubmit}  className="button create-button" /> 
            <input type="button" value="Back" onClick={moveToHome}  className="button cancel-button"/> <br />
            
        </form>
    </div>
  )
}
