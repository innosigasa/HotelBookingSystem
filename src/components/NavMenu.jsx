import { BrowserRouter as Router } from "react-router-dom";
import React, {Component} from "react";
import {Link} from 'react-router-dom'
import { Navbar, NavItem, NavLink, Container } from "reactstrap";
import '../components/css/NavMenu.css'


export class NavMenu extends Component{
    render() {
        return(
        <Router forceRefresh ={true}>
            <header >
                <Navbar >
                    <Container>
                        <ul>
                            <NavItem>
                                    <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                    <NavLink tag={Link} to="/guestPage">Guests</NavLink>
                            </NavItem>
                            <NavItem>
                                    <NavLink tag={Link} to="/bookingsPage">Bookings</NavLink>
                            </NavItem>
                            <NavItem>
                                    <NavLink tag={Link} to="/roomsPage">Rooms</NavLink>
                            </NavItem>
                        </ul>
                    </Container>
                </Navbar>
            </header>
        </Router>
        )
    }
}