import React, { Component,useCallback } from 'react'
import {Guest} from '../models/Guest' 
import * as constants from '../models/HRBSVals'
import BootstrapTable from 'react-bootstrap-table-next'
import { BrowserRouter as Router, Route, Link, useHistory} from "react-router-dom";
import { GuestDetails } from './GuestDetails';
import '../css/styles.css'
import '../css/Buttons.css'

export const GuestContext = React.createContext("");

export class GuestPage extends Component {
  //set state
  constructor(props){
    super(props)
    this.state = {
      Guests : '',
      Guest :[],
      columns : [
        {
          dataField : 'firstName',
          text : 'First Name',
        },
        {
          dataField : 'lastName',
          text : 'Last Name',
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
      url : constants.getAllGuestsUrl,
      showComponent : true,
    }
  }

  //Mounting Component
  componentDidMount(){
    this.getGuests();
  }

  //functionality
  getGuests = async ()=>
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
                this.setState({ Guests : data })
            })
       } catch (error) {
           alert("Please check connection to the Database")
       }
   }

   crudGuest(row){
     
     console.log(row.guestId + " "+ row.firstName + " "+ row.lastName);
     GuestContext.Provider =row
     GuestContext.displayName=row.firstName
     return (
        <div>   
          <GuestContext.Provider value={row}>
              <GuestDetails />
          </GuestContext.Provider>        
          
        </div> 
     )
   }

    deleteGuest= async (row)=>{
      const guestData = {"guestId":row.guestId};
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
          }
          else if(results.status===400){
              alert("Incorrect URL")
          }

      } catch (error) {
          console.log(error);
      }
      window.location.reload();
}
   
   
   editFormatter = (cell, row, rowIndex) => {
    return(
      <Link to={{pathname: "/guestPage/Details?guestId="+row.guestId}}>
        <button className="button cancel-button" onClick={() => this.crudGuest(row)}>Details</button>
      </Link>
        
    )
  }
  deleteFormatter = (cell, row, rowIndex) => {
    return(
        <button className="button delete-button" onClick={() => this.deleteGuest(row)}>Delete</button>
    )
  }

  backButton(){
    {this.setState({showComponent : true})}
  }


  //rendering
  render() {
    return (
      <div>
        
        <div>
          <h1>All Guests </h1>
          <Link to={{pathname: "/createGuestPage"}}>
            <button className='button create-button' >Create Guest</button>
          </Link>
          <BootstrapTable striped hover keyField='guestId' data={this.state.Guests} columns={this.state.columns}/>
        </div> 
        {/*this.state.Guests.map((guest)=>(
          <Guest key={guest.guestId} guest={guest} />
        )
        )*/}
      </div>
    )
  }
}
