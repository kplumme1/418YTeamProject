import React from 'react'
var config = require('../config.json');

function About() {
    return (
        <div style = {{textAlign: "center"}}>
            <h1 style = {{textDecoration: "underline"}}>ABOUT</h1>
            <h3 style = {{margin: "20px 20%"}}>{config.aboutPage}</h3>
        </div>
    );
}

export default About