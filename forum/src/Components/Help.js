import React from 'react'
var config = require('../config.json');

function Help() {
    return (
        <div style = {{textAlign: "center"}}>
            <h1 style = {{textDecoration: "underline"}}>HELP</h1>
            <h3>If you have any concerns or questions about 4UM, please feel free to <a href = "mailto:PUT_EMAIL_HERE"><span class = "underline">{config.contactEmail}</span></a>!</h3>
        </div>
    );
}

export default Help;