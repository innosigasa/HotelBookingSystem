import React,{useState,useEffect,useCallback} from 'react'
import * as constants from './HRBSVals'
import {Booking } from './Booking'
import '../css/Guest.css'
import '../css/Buttons.css'
import { BrowserRouter as Router, Route, Link, useHistory} from "react-router-dom";
import single from '../Images/profile.png'

export const Guest = ({guest,backButton}) => {
    //set State
    const [edit,setEdit] = useState(false);
    const [Bookings,setBookings] = useState({
        Bookings:guest.bookings
    })
    const [Guest,setGuest] = useState({
        GuestId : null,
        FirstName : "",
        LastName : ''
    })
    const history = useHistory();
    //component did mount
    useEffect(()=>{
        onLoad()
    },[])
    
    function onLoad(){
        setGuest({
            GuestId : guest.guestId,
            FirstName : guest.firstName,
            LastName : guest.lastName
        })
    }
    //functionallity
    function onEdit(){
        setEdit(!edit)
    }

    const onUpdate=async ()=>{
        const guestData = {
            "guestId":Guest.GuestId,
            "firstName": Guest.FirstName,
            "lastName" : Guest.LastName
        };

        const requestOptions = {
            method:"PUT",
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(guestData)
            //bearer toker would go here
        }
        try
        {
            const result = await fetch(constants.getAllGuestsUrl, requestOptions)
            console.log(result);
        }
        catch(error){
            console.log(error);
            alert("Please check connection to the database")
        }
        setEdit(!edit)
    } 
    
    function onDelete(){
        let confirmAction = window.confirm("Are you sure you want to Delete "+Guest.FirstName+" "+Guest.LastName+" ?");
        if (confirmAction) {
          console.log("Guest Deleted");
          deleteGuest();
        } else {
          console.log("Delete Cancelled");
        }
        console.log({Guest});
    }

    const deleteGuest= async ()=>{
        const guestData = {"guestId":Guest.GuestId};
        const requestOptions = {
            method:"DELETE",
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(guestData)
            //bearer toker would go here
        }
        try {
            const results = await fetch(constants.getAllGuestsUrl,requestOptions);
            if(results.status===200){
                alert("Guest is deleted")
                moveToHome();
            }
            else if(results.status===400){
                alert("Incorrect URL")
            }

        } catch (error) {
            console.log(error);
        } 
    }
    const moveToHome = useCallback(() => history.push('/guestPage'), [history]);

    const handleFirstNameChange=(e)=>{
        setGuest({LastName : Guest.LastName,FirstName : e.target.value,GuestId:Guest.GuestId})
    }

    const handleLastNameChange = (e) => {
        setGuest({FirstName : Guest.FirstName,LastName : e.target.value,GuestId:Guest.GuestId})
    }

    const onBookingsDelete = (id)=>{
        console.log("Deleted : "+id);
        deleteBooking(id);
    }

    const deleteBooking = async (id)=>{
        const bookingData = {"bookingsId":id};
        const requestOptions = {
            method:"DELETE",
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(bookingData)
            //bearer toker would go here
        }
        try {
            const results = await fetch(constants.getAllBookingsUrl,requestOptions);
            if(results.status===200){
                alert("Booking is Deleted")
                setBookings({Bookings: Bookings.Bookings.filter((booking)=>booking.bookingsId !==id)})
            }
            else if(results.status===400){
                alert("Incorrect URL")
            }

        } catch (error) {
            console.log(error);
        } 
    }
    //rendering 
    return (
        <div className='guest Container'>
            <div className='guest-details Row'>
                <div className='Column'>
                    <img src={single} alt="Logo" />;
                </div>
                <div className='Column'>
                    {edit?
                    <div>
                        <h3>{Guest.FirstName} {Guest.LastName} </h3>
                        <div>
                            <label htmlFor="FirstName">First name </label>
                            <input type="text" name="FirstName" id="firstName" value={Guest.FirstName} onChange={handleFirstNameChange}/>
                            <br />
                            <label htmlFor="LastName">Last Name </label>
                            <input type="text" name="LastName" id="lastName" value={Guest.LastName} onChange={handleLastNameChange}/>
                            <br />
                            <button onClick={onUpdate} className="button update-button">Update</button>
                            <button onClick={onEdit} className="button cancel-button">Cancel</button>
                        </div>
                    </div>
                    :<div>
                        <h3>{Guest.FirstName} {Guest.LastName}</h3>
                        <button  onClick={onEdit} className="button edit-button">Edit</button>
                        <button onClick={onDelete} className="button delete-button">Delete</button>
                    </div>
                    }
                    
                </div>
                
            </div>
            <div className='bookings'>
                <h2>Booking Details</h2>
                {Bookings.Bookings.length >0 ?
                <div>
                {Bookings.Bookings.map((bookings)=>(
                <Booking key={bookings.bookingsId} bookings={bookings} onDelete={onBookingsDelete} />))}
                </div>
                :
                <div>
                    "No Bookings"
                </div>
                }
            </div>
            <button onClick={moveToHome} className="button cancel-button">Back</button>
        </div> 
  )
}

/**
 * 
 * 
 * import React, { Component } from 'react'
import * as constants from './HRBSVals'
import { Bookings } from './Bookings'
import '../css/Guest.css'

export function Guest(guest){
    //set state

    const [Guest,setGuest] = React.useState(
        {
            GuestId : guest.guest.guestId,
            FirstName : guest.guest.firstName,
            LastName : guest.guest.lastName,
            Bookings : guest.guest.bookings,
            url : constants.urlIs,
            BackButton : guest.onClick.backButton
        }
    );

    //functionality
    function backButton (){
        console.log("Button is clicked")
        this.props.backButton()
    }

    //rendering
    return(
        <div className='guest'>
            <div className='guest-details'>
                <h3>{this.state.GuestId}</h3>
                <p>{this.state.FirstName} {this.state.LastName} </p>
            </div>
            <div className='bookings'>
                <h2>Booking Details</h2>
                {this.state.Bookings.map((bookings)=>(
                <Bookings key={this.state.Bookings.bookingsId} bookings={bookings} />
            ))}
            </div>
            <input value='Back' type='button'  onclick={this.backButton} />
        </div>
    )
}

 */