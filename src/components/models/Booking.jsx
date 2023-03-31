import React, { useState } from 'react'
import { Room } from './Room'
import '../css/Guest.css'
import '../css/Buttons.css'

export const Booking=({bookings,onDelete})=>{
    //set State
    const [Booking,setBooking] = useState({
        BookingId : bookings.bookingsId,
        DateFrom : bookings.dateFrom,
        DateTo : bookings.dateTo,
        Room : bookings.rooms,
    })
  
    //rendering
    return (
        <div className='bookings-details'>
            <button onClick={()=>onDelete(Booking.BookingId)} className="button delete-button">Delete</button>
            <p>Check-In Date : {Booking.DateFrom} </p>
            <p> Check-Out Date : {Booking.DateTo}</p>
            <Room key={Booking.Room.roomsId} rooms={Booking.Room} />
        </div>
      
    )
}

