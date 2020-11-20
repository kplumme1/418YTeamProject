import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
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

if (getCookie("token")) {
    console.log("Current token: " + getCookie("token"));
    console.log("Username: " + getCookie("username"));
    console.log("Role: "+ getCookie("role"));
}

function Home() {

    var cookieUser = getCookie("username") || "guest";

    const notLoggedIn = (<Jumbotron style = {{margin: "1% 1%"}}>
                    <h1>Welcome to {config.forumname}!</h1>
                    <p>
                        This is the forum of the modern times - no PHP, no ASP, no nonsense. Join now!
                    </p>
                    <p>
                        <Button variant="primary" href="/login">Login/Register</Button>
                    </p>
                    </Jumbotron>);
    
    const loggedIn = (<Jumbotron style = {{margin: "1% 1%"}}>
                    <h1>Welcome to {config.forumname}, {cookieUser}!</h1>
                    <p>
                        You're ready to see the forum of the future! Click any of the topics below to start your experience. With your account, you can create posts as well!
                    </p>
                    </Jumbotron>);

    if (cookieUser === "guest") {
        return (
            notLoggedIn
        );
    }

    else {
        return (
            loggedIn
        );
    }
    
}

export default Home