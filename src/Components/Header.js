import React from 'react'

function Header (){
    var config = require("../config.json");
    return (
        <div className = "header">
            <img src = {config.logo}></img>
            <p>{config.forumcall}</p>
        </div>
    )
}

export default Header;