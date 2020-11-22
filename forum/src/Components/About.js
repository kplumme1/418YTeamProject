import React from 'react'
import Image from 'react-bootstrap/Image'
var config = require('../config.json');

function About() {
    return (
        <div style = {{textAlign: "center"}}>
            <h1 style = {{textDecoration: "underline"}}>ABOUT</h1>
            <h3 style = {{margin: "20px 20%"}}>{config.aboutPage}</h3>
            <Image src = {config.aboutPhoto} height = "300"></Image>
            <hr></hr>
            <h3 style = {{margin: "20px 20%"}}>The forum provides the users with the ability to create topics and posts. 
                Users can reply to each other's posts and communicate. In order to use 4UM 
                to the best extent, you can register for an account!
                 </h3>
        </div>
    );
}

export default About;