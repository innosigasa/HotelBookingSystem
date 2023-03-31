import React, { Component,useCallback} from 'react'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import * as constants from '../models/HRBSVals'
import Select from 'react-select';
import '../css/Buttons.css'

export default class RoomsPage extends Component {
  
    //set State 
    constructor(props){
        super(props)
        this.state = {
        Rooms : [],
        RoomId : 0,
        RoomNo : 0,
        RoomFloor: 0,
        RoomType :"",
        RoomTypes : [],
        RoomTypeId : 0,
        inputType: false,
        SelectedOption : "",
        columns : [
            {
            dataField : 'roomsNo',
            text : 'Room No',
            },
            {
            dataField : 'roomFloor',
            text : 'Room Floor',
            },
            {
                dataField : 'roomsType.roomsType1',
                text : 'Room Type',
            },
            {
                dataField : 'roomsType.description',
                text : 'Room Description',
            },
            {
                dataField : 'roomsType.roomsRate',
                text : 'Room Type',
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
        url : constants.getAllRoomsUrl,
        }
    }



    //mounting components
    componentDidMount(){
        this.getRooms();
    }

    //functionality
    getRooms = async ()=>
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
                this.setState({ Rooms : data })
            })
       } catch (error) {
           alert("Please check connection to the Database")
       }
   }
   
   editFormatter = (cell, row, rowIndex) => {
    return(
        <button className="button edit-button" onClick={() => this.crudGuest("Edit", row)} buttonType="Edit">Edit</button>
    )
  }

  deleteFormatter = (cell, row, rowIndex) => {
    return(
        <button className="button delete-button" onClick={() => this.crudGuest("Delete", row)}>Delete</button>
    )
  }

  //Perfom crud
  crudGuest(typeIs,row)
  {
        if(typeIs === 'Delete')
        {
            this.setState({RoomId : row.roomsId}, () => {
                this.onDelete();
            })
        }
        else
        if(typeIs === 'Edit'){
            this.setState({RoomId : row.roomsId});
            this.setState({RoomNo: row.roomsNo})
            this.setState({RoomFloor: row.roomFloor})
            this.setState({RoomTypeId : row.roomsTypeId})
            this.setState({SelectedOption : row.roomsType.roomsType1})
            this.getRoomsType()
            this.setState({inputType : !this.state.inputType})
        }
        else
        if(typeIs === 'Update')
        {
            this.onUpdate();
        }
        else
            this.setState({formType: ""})
  }

    //get Room types
    getRoomsType = async ()=>
    {
        const requestOption = {
            method: 'GET',
            headers : {'Content-Type' : 'application/json'}
            //bearear informaion
        }
        try 
        {
            const result = await fetch(constants.getRoomsTypes, requestOption).then( response=> { return response.json()})
            .then(data=>
             {
                this.setState({RoomTypes : data })
             })
        } catch (error) {
            alert("Please check connection to the Database")
        }
    }


    //Delete Room
    onDelete=async ()=>{
        const roomData = {"roomsId" :  this.state.RoomId};
    
        const requestOptions = {
            method:"DELETE",
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify(roomData)
            //bearer toker would go here
        }
        try
        {
            const result = await fetch(constants.getAllRoomsUrl, requestOptions)
            if(result.status===200){
                alert("Room is Deleted")
                window.location.reload()
            }
        }
        catch(error){
            console.log(error);
            alert("Please check connection to the database")
        }
    }
    //Update Room
onUpdate=async ()=>{
    const roomData = {
        "roomsNo" :  this.state.RoomNo,
        "roomFloor" : this.state.RoomFloor,
        "roomsTypeId" : this.state.RoomTypeId,
        "roomsId" : this.state.RoomId
    };

    const requestOptions = {
        method:"PUT",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(roomData)
        //bearer toker would go here
    }
    try
    {
        const result = await fetch(constants.getAllRoomsUrl, requestOptions)
        if(result.status===200){
            alert("Booking is Room is Updated")
            window.location.reload()
        }
    }
    catch(error){
        console.log(error);
        alert("Please check connection to the database")
    }
}

    // handle input changes
    handleRoomNoChange=(e)=>{
        this.setState({RoomNo : e.target.value})
    }
    handleRoomFloorChange=(e)=>{
        this.setState({RoomFloor : e.target.value})
    }
    handleRoomTypeIdChange = SelectedOption => {
      this.setState({SelectedOption : SelectedOption.label})
      this.setState({RoomTypeId : SelectedOption.key })
    }

    //rendering
    render() {
        return (
        <div>

            <h1>All Rooms</h1>
            <Link to={{pathname:"/createRoom"}}>
                <input type='button' value="Create Room" className="button create-button" onClick={this.createRoom} buttonType=""/>
            </Link>

            {this.state.inputType ?
            <div>
                Select Room Type
                <Select
                    value={this.state.SelectedOption}
                    onChange={this.handleRoomTypeIdChange}
                    style={{width: '320px'}} 
                    options={this.state.RoomTypes.map((roomType, index) => {
                    return {
                        label: roomType.roomsType1,
                        value: roomType,
                        key: roomType.roomsTypeId
                        };
                    })}
                /> 
                <p>Selected RoomType : {this.state.SelectedOption}</p>
                <label htmlFor='DateFrom'>Room No </label>
                <input type="number" name="" id="date" onChange={this.handleRoomNoChange} style={{width : '250px'}} format value={this.state.RoomNo} required/><br /> <br />
                <label htmlFor='DateFrom'>Room Floor</label>
                <input type="number" name="" id="date" style={{width : '250px'}} value={this.state.RoomFloor} onChange={this.handleRoomFloorChange} required/><br />
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
                  data={this.state.Rooms}
                  columns={this.state.columns}
                  />

        </div>
        )
    }
}
