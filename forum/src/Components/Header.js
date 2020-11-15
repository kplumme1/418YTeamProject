import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Logo from '../logo.png'

function Header (){
    return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand href="/">
            <Image src = {Logo} height = "90px"></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="about">About</Nav.Link>
                <Nav.Link href="help">Help</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown alignRight title="Profile" id="dropdown-menu-align-right">
                    <NavDropdown.Item href="login">Login</NavDropdown.Item>
                    <NavDropdown.Item href="register">Register</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    );
}

export default Header