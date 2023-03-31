import React, { Component } from 'react';
import {NavMenu} from './NavMenu';
import { Container } from 'reactstrap';
import Footer from './Footer';


export class Menu extends Component{

    render() {

        return(

            <div>
                <NavMenu/>    

                <Container>

                    {this.props.children}

                </Container>
            </div>

        )

    }

}