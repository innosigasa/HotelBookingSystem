import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Link } from 'react-router-dom'
import * as constants from '../models/HRBSVals'
import '../css/Buttons.css'

export default class BookingsPage extends Component {
    //set state
    constructor(props){
        super(props)
        this.state = {
        Bookings : [],
        inputType: false,
        dateFrom : "",
        dateTo : "",
        guestId : 0,
        roomId : 0,
        bookingId : 0,
        columns : [
            {
            dataField : 'rooms.roomsNo',
            text : 'Room No',
            },
            {
            dataField : 'rooms.roomFloor',
            text : 'Room Floor',
            },
            {
                dataField : 'guest.firstName',
                text : 'Guest name',
            },
            {
                dataField : 'payments[0].amountsPaid',
                text : 'Amount Paid',
            },
            {
            text : '',
            formatter: this.editFormatter
            },
            {
            text : '',
            formatter: this.deleteFormatter
            },
        ],
        url : constants.getAllBookingsUrl
        }
    }

    //mounting data
    componentDidMount(){
        this.getBookings();
    }

    //Functionality
    getBookings = async ()=>
   {
       const requestOption = {
           method: 'GET',
           headers : {'Content-Type' : 'application/json'}
           //bearear informaion
       }
       try 
       {
           await fetch(this.state.url, requestOption)
           .then( response=> { return response.json()})
           .then(data=>
            {
                this.setState({ Bookings : data })
            })
       } catch (error) {
           alert("Please check connection to the Database")
       }
   }
   editFormatter = (cell, row, rowIndex) => {
    return(
        <button className="button edit-button" onClick={() => this.crudGuest("Edit", row)} booking={row}>Edit</button>

    )
  }

  deleteFormatter = (cell, row, rowIndex) => {
    return(
        <button className="button delete-button" onClick={() => this.crudGuest("Delete", row)}>Delete</button>
    )
  }

  crudGuest(typeIs,row){
    
    if(typeIs==="Edit"){
        this.setState({ dateFrom : row.dateFrom.charAt(0)+row.dateFrom.charAt(1)+row.dateFrom.charAt(2)+row.dateFrom.charAt(3)+"-"+row.dateFrom.charAt(5)+row.dateFrom.charAt(6)+"-"+row.dateFrom.charAt(8)+row.dateFrom.charAt(9)})
        this.setState({ dateTo : row.dateTo.charAt(0)+row.dateTo.charAt(1)+row.dateTo.charAt(2)+row.dateTo.charAt(3)+"-"+row.dateTo.charAt(5)+row.dateTo.charAt(6)+"-"+row.dateTo.charAt(8)+row.dateTo.charAt(9)})
        this.setState({ guestId : row.guestId})
        this.setState({ roomId : row.roomsId})
        this.setState({ bookingId : row.bookingsId})
        this.setState({ roomId : row.roomsId }, () => {
            console.log(this.state.dateFrom.charAt(1));
          });
          
    this.setState({inputType : !this.state.inputType})
    }
    else if(typeIs==="Update"){
        this.onUpdate()
        
    this.setState({inputType : !this.state.inputType})
    }
    else if(typeIs==="Delete"){
        this.setState({bookingId : row.bookingsId}, () => {
            this.onDelete();
        })
    }
  }


onDateFromChange = (e)=>{
    this.setState({dateFrom: e.target.value})
}
onDateToChange = (e)=>{
    this.setState({dateTo: e.target.value})
}

onUpdate=async ()=>{
    const bookingData = {
        "bookingsId" :  this.state.bookingId,
        "guestId" : this.state.guestId,
        "dateFrom" : this.state.dateFrom,
        "dateTo" : this.state.dateTo,
        "roomsId" : this.state.roomId
    };

    const requestOptions = {
        method:"PUT",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(bookingData)
        //bearer toker would go here
    }
    try
    {
        const result = await fetch(constants.getAllBookingsUrl, requestOptions)
        if(result.status===200){
            alert("Booking is updated")
            window.location.reload()
        }
    }
    catch(error){
        console.log(error);
        alert("Please check connection to the database")
    }
}

onDelete=async ()=>{
    const bookingData = {"bookingsId" :  this.state.bookingId};

    const requestOptions = {
        method:"DELETE",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(bookingData)
        //bearer toker would go here
    }
    try
    {
        const result = await fetch(constants.getAllBookingsUrl, requestOptions)
        if(result.status===200){
            alert("Booking is Deleted")
            window.location.reload()
        }
    }
    catch(error){
        console.log(error);
        alert("Please check connection to the database")
    }
}


    render() {
    return (
      <div>
          <h1>All Bookings</h1>
          <Link to={{pathname:"/createBooking"}}>
              <input type='button' value="Create Booking" className="button create-button"/>
          </Link>

            {this.state.inputType ?
            <div>
                {this.state.guestId}
                <label htmlFor='DateFrom'>Check-In Date </label>
                <input type="date" name="" id="date" onChange={this.onDateFromChange} style={{width : '250px'}} format value={this.state.dateFrom} required/><br /> <br />
                <label htmlFor='DateFrom'>Check-Out Date </label>
                <input type="date" name="" id="date" min={this.state.dateFrom} style={{width : '250px'}} value={this.state.dateTo} onChange={this.onDateToChange} required/><br />
                <input type="button" value="Update"  onClick={() => this.crudGuest("Update", 0)} className="button update-button" />
            </div>
            :
            <div>
            </div>
            }

          <BootstrapTable
            striped
            hover
            keyField='bookingsId'
            data={this.state.Bookings}
            columns={this.state.columns}
            />
      </div>
    )
  }
}
