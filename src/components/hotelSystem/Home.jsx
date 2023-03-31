import React, { Component } from 'react'
import single from '../Images/slide1.jpg'


export class Home extends Component {
  render() {
    return (
      <div>Welcome To Hotel Room Booking System
        <img src={single} alt="Logo" />;

      </div>
    )
  }
}
