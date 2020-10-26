import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'

function checkFields() {
    let password = String(document.getElementById("passwordOne").value);
    let email = String(document.getElementById("email").value);
    if(document.getElementById("username").value.length < 6) {
        document.getElementById("submitButton").disabled = "true";
        document.getElementById("validMessage").style.color = "red";
        document.getElementById("validMessage").innerHTML = "USERNAME NOT LONG ENOUGH [6 CHARS]";
    }
    else if (!email.toLowerCase().match("[a-z 0-9]@[a-z 0-9]+\.[a-z]")) {
        document.getElementById("submitButton").disabled = "true";
        document.getElementById("validMessage").style.color = "red";
        document.getElementById("validMessage").innerHTML = "INVALID EMAIL";
    }
    else if(password !== document.getElementById("passwordTwo").value) {
        document.getElementById("submitButton").disabled = "true";
        document.getElementById("validMessage").style.color = "red";
        document.getElementById("validMessage").innerHTML = "PASSWORDS ARE NOT THE SAME";
    }
    else if (password.length < 8) {
        document.getElementById("submitButton").disabled = "true";
        document.getElementById("validMessage").style.color = "red";
        document.getElementById("validMessage").innerHTML = "PASSWORD NOT LONG ENOUGH [8 CHARS]";
    }
    else if (!password.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-+=_])(?=.*[0-9]).{8,100}$")) {
        document.getElementById("submitButton").disabled = "true";
        document.getElementById("validMessage").style.color = "red";
        if (!password.match("^(?=.*[A-Z])")) {
            document.getElementById("validMessage").innerHTML = "NEED AN UPPERCASE LETTER";
        }
        else if (!password.match("^(?=.*[a-z])")) {
            document.getElementById("validMessage").innerHTML = "NEED A LOWERCASE LETTER";
        }
        else if (!password.match("^(?=.*[!@#$%^&*()-+=_])")) {
            document.getElementById("validMessage").innerHTML = "NEED A SPECIAL CHARACTER (ex: !,@,$, etc.)";
        }
        else if (!password.match("^(?=.*[0-9])")) {
            document.getElementById("validMessage").innerHTML = "NEED A NUMBER";
        }
        else if (password.length > 100) {
            document.getElementById("validMessage").innerHTML = "PASSWORD TOO LONG [<= 100 CHARS]";
        }
    }
    else {
        document.getElementById("submitButton").disabled = "";
        document.getElementById("validMessage").style.color = "green";
        document.getElementById("validMessage").innerHTML = "REGISTRATION ALLOWED";
    }
}

function Register() {
    return (
        <Container style = {{marginTop: "40px"}}>
            <Row>
                <Col></Col>
                <Col md = {7} style = {{border: "5px solid black", borderRadius: "30px", padding: "20px 20px"}}>
                    <Row>
                        <Col></Col>
                        <Col><Image style = {{border: "8px solid black"}} src = {profpic} height = "200px" width = "200px" roundedCircle></Image></Col>
                        <Col></Col>
                    </Row>
                    <Form>
                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Email address</Form.Label>
                            <Form.Control type="email" id = "email" placeholder="email@domain.com" />
                            <Form.Text className="text-muted">
                            Your email will be safe - we're the only ones who'll see it.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Username</Form.Label>
                            <Form.Control id = "username" type="text" placeholder="Username" onKeyUp = {checkFields}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Password</Form.Label>
                            <Form.Control id = "passwordOne" type="password" placeholder="Password [CaSe SeNsItIvE]" onKeyUp = {checkFields}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Retype Password</Form.Label>
                            <Form.Control id = "passwordTwo" type="password" placeholder="Password [CaSe SeNsItIvE]" onKeyUp = {checkFields}/>
                        </Form.Group>
                        <Row>
                            <Col></Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} id = "submitButton" variant="primary" type="submit" disabled = "true">
                                    Register
                                </Button>
                            </Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} variant="primary" type="button" href = "./login">
                                    Login?
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col id = "validMessage" style = {{textAlign: "center", marginTop: "5px"}}></Col>
                            <Col></Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Register