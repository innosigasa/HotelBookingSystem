import React, { Component } from 'react'
import './css/footer.css'

export default class Footer extends Component {
  render() {
    return (
      <div>
           <div className="Box">
      <h1 style={{ color: "green", textAlign: "center", marginTop: "-50px" }}>
        Hotel Room Booking System
      </h1>
      <div className="Container">
        <div className="Row">
          <div class="Column">
            <div className="Heading">About Us</div>
            <div className="FooterLink" href="#">Contact Us</div>
          </div>
          <div class="Column">
            <div className="Heading">Services</div>
            <div className="FooterLink" href="#">About Us</div>
          </div>
          <div class="Column">
            <div className="Heading">Contact Us</div>
          </div>
        </div>
      </div>
    </div>


      </div>
    )
  }
}
