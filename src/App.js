import React from 'react'
import logo from './logo.svg';
import './App.css';
import { Menu } from './components/Menu';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import { Home } from './components/hotelSystem/Home';
import { GuestPage } from './components/hotelSystem/Guests';
import BookingsPage from './components/hotelSystem/Bookings';
import RoomsPage from './components/hotelSystem/Rooms';
import {GuestDetails} from './components/hotelSystem/GuestDetails'
import Error from './components/hotelSystem/Error';
import RoomsCreate from './components/hotelSystem/RoomsCreate';
import GuestCreate from './components/hotelSystem/GuestCreate';
import BookingsCreate from './components/hotelSystem/BookingsCreate';
import BookingUpdate from './components/hotelSystem/BookingUpdate';
function App() {
  return (
    <div className="App">
      <Menu>
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/guestPage' component={GuestPage} />
                  <Route exact path='/bookingsPage' component={BookingsPage} />
                  <Route exact path='/roomsPage' component={RoomsPage} />
                  <Route exact path="/guestPage/Details?guestId=*" component={GuestDetails} />
                  <Route exact path="/createGuestPage" component={GuestCreate} />
                  <Route exact path="/createRoom" component={RoomsCreate} />
                  <Route exact path="/createBooking" component={BookingsCreate} />
                  <Route exact path="/updateBooking" component={BookingUpdate} />
                  <Route exact path='*' component={Error} />
              </Switch>   
          </BrowserRouter>
      </Menu>
    </div>
  );
}

export default App;
