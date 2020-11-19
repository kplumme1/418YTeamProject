/**
import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'
import axios from 'axios';

import {Component} from "react";

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
eraseCookie("username");
eraseCookie("role");
eraseCookie("token");
alert("Logout complete! Redirecting...");
window.location.href = "http://kplumme1-ec2.ddns.net:3000/";


class Logout extends Component {

}

export default Logout
*/