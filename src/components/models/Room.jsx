import React, { Component } from 'react'
import '../css/Room.css'
import single from '../Images/single-room.jpg'

export class Room extends Component {
    //set state
    constructor(rooms){
        super(rooms)
        this.state = {
            RoomId : rooms.rooms.roomsId,
            RoomNo : rooms.rooms.roomsNo,
            RoomFloor : rooms.rooms.roomFloor,
            RoomType : rooms.rooms.roomsType.roomsType1,
            Description: rooms.rooms.roomsType.description
        }
    }
    //rendering
    render() {
        return (
            <div id='room'>
                <div className='Row'>
                    <div className='Column'>
                    <img src={single} alt="Logo" />
                    </div>
                    <div className='Column'>
                        <h5>Room No : {this.state.RoomNo}</h5>
                        <p>Room Floor : {this.state.RoomFloor}</p>
                        <p>Room Type : {this.state.RoomType} </p>
                        <p>{this.state.Description}</p>
                    </div>
                </div>
            </div>
        )
    }
}
