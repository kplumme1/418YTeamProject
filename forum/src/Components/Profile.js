import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'

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

var cookieUser = getCookie("username") || "Invalid User";
var cookieRole = getCookie("role") || "Guest";
var postCount = 0;

function Profile() {
    return (
        <div>
            <Container style = {{marginTop: "40px"}}>
            <Row>
                <Col></Col>
                <Col md = {7} style = {{border: "5px solid black", borderRadius: "30px", padding: "20px 20px", backgroundColor: "rgba(255, 255, 255, .5)"}}>
                    <Row>
                        <Col></Col>
                        <Col><Image style = {{border: "8px solid black"}} src = {profpic} height = "200px" width = "200px" roundedCircle></Image></Col>
                        <Col></Col>
                    </Row>
                    <div style = {{textAlign: "center"}}>
                        <h1>{cookieUser}</h1>
                        <h4>User Role: {cookieRole}</h4>
                        <h4>Post Count: {postCount}</h4>
                    </div>
                </Col>
                <Col></Col>
            </Row>
            <Form>
                    <Form.Label style={{ fontWeight: "bold" }}>Edit Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" />
                    <Form.Text className="text-muted">
                        This is where you can change and edit your username.
                    </Form.Text>
                </Form>
                <br></br>
                <Form>
                    <Form.Label style={{ fontWeight: "bold" }} action="/uploadpicture" method="post" enctype="multipart/form-data">Edit Profile Picture</Form.Label>
                        <Form.Control type="file" placeholder="picurl" />
                        <input type="submit" />
                    <Form.Text className="submit">
                        This is where you can add or change your profile picture.
                    </Form.Text>
            </Form> 
            </Container>
        </div>
    );
}

export default Profile