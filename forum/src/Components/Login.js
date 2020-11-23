import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'
import axios from 'axios'
import {Component} from "react";
const backend = require('./backendLink');

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        const logUser = {
            email: String(document.getElementById("email").value),
            password: String(document.getElementById("password").value)
        };
        console.log(this.state.email);
        console.log(this.state.password);
        console.log("ABOCVE^^^");
        console.log(logUser);
        axios.post(backend.backendURL + '/user/login/', logUser)
        .then(function(response) {
            if (response.status == 200 && response.data != null && response.data.accessToken != null) {
                var d = new Date();
                d.setTime(d.getTime() + (1*60*60*1000));
                var expires = "expires="+ d.toUTCString();
                document.cookie = "token=" + response.data.accessToken + ";" + expires + ";path=/";
                document.cookie = "username=" + response.data.username+ ";" + expires + ";path=/";
                document.cookie = "role=" + response.data.role+ ";" + expires + ";path=/";
                document.cookie = "pfp=" + response.data.pfp+ ";" + expires + ";path=/";
                //alert("Login complete! Redirecting...");
                window.location.href = "/";
            } else {
                //alert(response.statusText);
            }
        })
        .catch(function(error) {
            alert("Error:" + error);
        });
        console.log(userData);
    };

    render() {
        const {errors} = this.state;

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
                    <Form noValidate onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Email address</Form.Label>
                            <Form.Control type="email" id = "email" placeholder="email@domain.com" />
                            <Form.Text className="text-muted">
                            Your email will be safe - we're the only ones who'll see it.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Password</Form.Label>
                            <Form.Control type="password"  id = "password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col></Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} variant="primary" type="button" href = "/register">
                                    Register?
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            </Container>
        );
    }
}

export default Login