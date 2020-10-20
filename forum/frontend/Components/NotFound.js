import React from 'react'
import Alert from 'react-bootstrap/Alert'

function Home() {
    return (
        <Alert variant = 'danger'>
            <Alert.Heading>Uh oh! This page isn't found!</Alert.Heading>
            <p>The page you navigated to could not be found. Please navigate using the navigation bar above.</p>
        </Alert>
    );
}

export default Home