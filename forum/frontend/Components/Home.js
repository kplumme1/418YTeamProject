import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

function Home() {
    return (
        <Jumbotron style = {{margin: "1% 1%"}}>
            <h1>Welcome to 4UM!</h1>
            <p>
                This is the forum of the modern times - no PHP, no ASP, no nonsense. Join now!
            </p>
            <p>
                <Button variant="primary" href="/login">Login/Register</Button>
            </p>
        </Jumbotron>
    );
}

export default Home