import React,{useState,useCallback,useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select';
import '../css/Buttons.css'
import * as constants from '../models/HRBSVals'
import '../css/styles.css'

export default function BookingsCreate() {
    const history = useHistory();
    const moveToHome = useCallback(()=>history.push('/bookingsPage'),[history])
    const [Rooms,setRooms] = useState({
        Rooms : []
    });
    const [Guests,setGuests] = useState({
        Guests : []
    });

    const [BookingDetails,setBookingDetails] = useState({
        DateFrom : new Date(),
        DatteTo : new Date(),
        GuestId : 0,
        RoomId : 0,
    })
    const DateLimit = new Date();
    const [SelectedGuest,setSelectedGuest] = useState("");
    const [SelectedRoom,setSelectedRoom] = useState("");
    const [SelectedOption,setSelectedOption] = useState("");

    //component did mount
    useEffect(()=>{
        getGuests();
        getRooms();
    },[])

    //Functionality
    const onDateFromChange = (e)=>{
        setBookingDetails({
            DateFrom : e.target.value,
            DatteTo : BookingDetails.DatteTo,
            GuestId : BookingDetails.GuestId,
            RoomId : BookingDetails.RoomId
        })
        DateLimit.setDate(BookingDetails.DateFrom.getDate() + 1)

    }
    const onDateToChange = (e)=>{
        setBookingDetails({
            DateFrom : BookingDetails.DateFrom,
            DatteTo : e.target.value,
            GuestId : BookingDetails.GuestId,
            RoomId : BookingDetails.RoomId
        })
    }

    const submitBooking =async ()=>{
        if(BookingDetails.GuestId===0 || BookingDetails.RoomId===0)
        {
            alert("Please select Room or Guest")
        }
        else
        {
            const bookingInfo = {
                "guestId" : BookingDetails.GuestId,
                "dateFrom" : BookingDetails.DateFrom,
                "dateTo" : BookingDetails.DatteTo,
                "roomsId" : BookingDetails.RoomId
            }
            const requestOptions = {
                method:"POST",
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify(bookingInfo)
                 //bearer toker would go here
             }
            try
            {
                const result = await fetch(constants.getAllBookingsUrl, requestOptions)
                if(result.status===200){
                    moveToHome();
                }
            }
            catch(error){
                alert("Please check connection to the database")
             }
    }
    }

    const getRooms = async ()=>
    {
        const requestOption = {
            method: 'GET',
            headers : {'Content-Type' : 'application/json'}
            //bearear informaion
        }
        try 
        {
            const result = await fetch(constants.getAllRoomsUrl, requestOption).then( response=> { return response.json()})
            .then(data=>
             {
                setRooms({Rooms : data })
             })
        } catch (error) {
            alert("Please check connection to the Database")
        }
    }


    const getGuests = async ()=>
    {
        const requestOption = {
            method: 'GET',
            headers : {'Content-Type' : 'application/json'}
            //bearear informaion
        }
        try 
        {
            const result = await fetch(constants.getAllGuestsUrl, requestOption).then( response=> { return response.json()})
            .then(data=>
             {
                setGuests({Guests : data })
             })
        } catch (error) {
            alert("Please check connection to the Database")
        }
    }

    //Handle Select List
    const handleRoomsIdChange = SelectedRoom => {
        setBookingDetails({
            DateFrom : BookingDetails.DateFrom,
            DatteTo : BookingDetails.DatteTo,
            GuestId : BookingDetails.GuestId,
            RoomId : SelectedRoom.key,
        })
        setSelectedRoom(SelectedRoom.label);
    }

    const handleGuestIdChange = SelectedGuest => {
        setBookingDetails({
            DateFrom : BookingDetails.DateFrom,
            DatteTo : BookingDetails.DatteTo,
            GuestId : SelectedGuest.key,
            RoomId : BookingDetails.RoomId,
        })
        setSelectedGuest(SelectedGuest.label);
    }

  return (
    <div className='form-div'>
        Create Bookings
        <form action="">
            <label htmlFor='DateFrom'>Select Guest </label>
            <Select
                value={SelectedGuest}
                onChange={handleGuestIdChange}
                style={{width: '320px'}} 
                options={Guests.Guests.map((guest, index) => {
                return {
                    label: guest.firstName +" "+guest.lastName,
                    value: guest,
                    key: guest.guestId
                    };
                })}
            /> <br />
            <label htmlFor='DateFrom'>Select Room </label>
            <Select
                value={SelectedRoom}
                onChange={handleRoomsIdChange}
                style={{width: '82px'}} 
                options={Rooms.Rooms.map((room, index) => {
                return {
                    label: room.roomsNo + ", Room Type : "+room.roomsType.roomsType1,
                    value: room,
                    key: room.roomsId
                    };
                })}
            />
            <p>Selected Guest : {SelectedGuest} </p>
            <p>Selected Room: {SelectedRoom} </p>
            <label htmlFor='DateFrom'>Check-In Date </label>
            <input type="date" name="" id="date" onChange={onDateFromChange} value={BookingDetails.DateFrom} required/><br />
            <label htmlFor='DateFrom'>Check-Out Date </label>
            <input type="date" name="" id="date" min={BookingDetails.DateFrom} onChange={onDateToChange} required/><br />
            <input type="button" value="Create Booking"  onClick={submitBooking} className="button create-button" />
            <input type="button" value="Cancel" onClick={moveToHome} className="button cancel-button"/>
        </form>
    </div>
  )
}
