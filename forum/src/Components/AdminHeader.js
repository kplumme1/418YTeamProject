import React from 'react'
import useLocation from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
var config = require('../config.json');

// getCookie function from stack overflow
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

class AdminHeader extends React.Component{

    constructor() {
        super();
        this.state = {};
    }

    render() {
        var cookieRole = getCookie("role") || "guest";
        var cookieUser = getCookie("username") || "Profile";

        // If the user is not logged in
        if (cookieRole === "guest") {
            return (
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style = {{fontSize: "20px"}}>
                    <Navbar.Brand href="/">
                        <Image src = {config.logo} height = "90px"></Image>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/help">Help</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown alignright="true" title={cookieUser} id="dropdown-menu-align-right">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                );
        }

        // if the user is logged in and is a user, mod, or admin
        else {
            return (
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" style = {{fontSize: "20px"}}>
                    <Navbar.Brand href="/">
                        <Image src = {config.logo} height = "90px"></Image>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/help">Help</Nav.Link>
                        </Nav>
                        <Nav>
                        <Image style = {{border: "4px solid black"}} src = {getCookie("pfp")} height = "50px" width = "50px" roundedCircle></Image>
                            <NavDropdown alignright="true" title={cookieUser} id="dropdown-menu-align-right">
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
    }
}

export default AdminHeader