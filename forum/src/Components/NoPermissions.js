import React from 'react'
import Alert from 'react-bootstrap/Alert'

function NoPermissions() {
    return (
        <Alert variant = 'danger'>
            <Alert.Heading>Uh oh! You do not have permissions!</Alert.Heading>
            <p>You do not have the proper permissions to view that page. Please navigate using the navigation bar above.</p>
        </Alert>
    );
}

export default NoPermissions