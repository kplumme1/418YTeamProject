import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'

import {Component} from "react";
//import {Link} from "react-router-dom";

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
        e.prevemtDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
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
                            <Form.Control type="email" placeholder="email@domain.com" />
                            <Form.Text className="text-muted">
                            Your email will be safe - we're the only ones who'll see it.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Row>
                            <Col></Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} variant="primary" type="submit">
                                    Login
                                </Button>
                            </Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "120px"}} variant="primary" type="button" href = "./register">
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