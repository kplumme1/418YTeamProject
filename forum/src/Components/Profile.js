import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import profpic from '../profpic.png'
import axios from 'axios';
const backend = require('./backendLink');

const FormData = require('form-data');

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.submitUsername = this.submitUsername.bind(this);
        this.submitProfile = this.submitProfile.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.cookieUser = this.getCookie("username") || "Invalid User";
        this.cookieRole = this.getCookie("role") || "Guest";
        this.postCount = 0;
    }

    // getCookie function from stack overflow
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }


    submitProfile(e) {
        e.preventDefault();
        const logUser = {
            pfp: document.getElementById("pfp").files
        };


        var bodyFormData = new FormData();
        bodyFormData.append('pfp', document.getElementById("pfp").files[0])
        const headers = {
            headers: {
                token: this.getCookie("token"),
                'Content-Type': 'multipart/form-data'
            },
            data: bodyFormData
        }
        /*
        console.log(this.state.email);
        console.log(this.state.password);
        console.log("ABOCVE^^^");
        console.log(logUser);
        */
        axios({
            method: 'post',
            url: backend.backendURL + '/user/updatePFP/',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data', "token": this.getCookie("token") }
        })
            .then(function (response) {
                if (response.status == 200 && response.data != null && response.data.accessToken != null) {
                    var d = new Date();
                    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = "token=" + response.data.accessToken + ";" + expires + ";path=/";
                    document.cookie = "username=" + response.data.username + ";" + expires + ";path=/";
                    document.cookie = "role=" + response.data.role + ";" + expires + ";path=/";
                    document.cookie = "pfp=" + response.data.pfp + ";" + expires + ";path=/";
                    alert("Profile picture change successful...");
                    window.location.href = "http://kplumme1-ec2.ddns.net:3000/profile";
                } else {
                    alert(response.statusText);
                }
            })
            .catch(function (response) {
                alert("Error:" + response);
            });
        return
    }

    submitUsername(e) {
        e.preventDefault();
        const logUser = {
            username: String(document.getElementById("username").value)
        };

        const headers = {
            headers: {
                token: this.getCookie("token")
            }
        }
        /*
        console.log(this.state.email);
        console.log(this.state.password);
        console.log("ABOCVE^^^");
        console.log(logUser);
        */
        axios.post('http://kplumme1-ec2.ddns.net:5000/user/updateUsername/', logUser, headers)
            .then(function (response) {
                //alert("Got response");
                //alert(JSON.stringify(response));
                if (response.status == 200 && response.data != null && response.data.accessToken != null) {
                    var d = new Date();
                    d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
                    var expires = "expires=" + d.toUTCString();
                    document.cookie = "token=" + response.data.accessToken + ";" + expires + ";path=/";
                    document.cookie = "username=" + response.data.username + ";" + expires + ";path=/";
                    document.cookie = "role=" + response.data.role + ";" + expires + ";path=/";
                    document.cookie = "pfp=" + response.data.pfp + ";" + expires + ";path=/";
                    alert("Username change successful...");
                    window.location.href = "http://kplumme1-ec2.ddns.net:3000/profile";
                } else {
                    alert(response.statusText);
                }
            })
            .catch(function (error) {
                alert("Error:" + error);
            });
    }

    render() {
        return (
            <div>
                <Container style={{ marginTop: "40px" }}>
                    <Row>
                        <Col></Col>
                        <Col md={7} style={{ border: "5px solid black", borderRadius: "30px", padding: "20px 20px", backgroundColor: "rgba(255, 255, 255, .5)" }}>
                            <Row>
                                <Col></Col>
                                <Col><Image style={{ border: "8px solid black" }} src={this.getCookie("pfp")} height="200px" width="200px" roundedCircle></Image></Col>
                                <Col></Col>
                            </Row>
                            <div style={{ textAlign: "center" }}>
                                <h1>{this.cookieUser}</h1>
                                <h4>User Role: {this.cookieRole}</h4>
                                <h4>Post Count: {this.postCount}</h4>
                            </div>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Form onSubmit={this.submitUsername} >
                        <Form.Label style={{ fontWeight: "bold" }}>Edit Username</Form.Label>
                        <Form.Control type="text" id="username" placeholder="Username" />
                        <button
                            onClick={this.submitUsername}>
                            Submit
                        </button>
                        <Form.Text className="submit">
                            This is where you can change your username.
                        </Form.Text>
                    </Form>
                    <br></br>
                    <Form onSubmit={this.submitProfile}>
                        <Form.Label style={{ fontWeight: "bold" }} action="/uploadpicture" method="post" enctype="multipart/form-data">Edit Profile Picture</Form.Label>
                        <Form.Control type="file" id="pfp" name="pfp" placeholder="picurl" />
                        <button
                            onClick={this.submitProfile}>
                            Submit
                        </button>
                        <Form.Text className="submit">
                            This is where you can add or change your profile picture.
                        </Form.Text>
                    </Form>
                </Container>
            </div>
        );
    }
}