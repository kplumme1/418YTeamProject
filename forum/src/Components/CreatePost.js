import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Editor } from "@tinymce/tinymce-react";
import axios from 'axios';

var mongoose = require('mongoose');
const backend = require('./backendLink');



//export default class CreatePost extends Component {
export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        //method bindings
        this.onChangeText = this.onChangeText.bind(this);
        this.getCookie = this.getCookie.bind(this);
        //this.changeUsername = this.changeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //State object
        this.state = {
        bodytext: ''
      }
    }

    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }



    //Methods
    /*
    changeUsername(user) {
        alert("user: " + user);
        this.setState({
            username: user
        })
        alert("state set: " + this.state.username);
    }
    */
    onChangeText(content, editor) {
        //alert("onChangeText: " + content);
        this.setState({
            bodytext: content
        })
    }

    //Function that submits data to db via axios and router
    onSubmit(e) {
    e.preventDefault();
    var thisurl = window.location.href.split("/")
    var threadID = thisurl[thisurl.length - 1]
    var newId = mongoose.Types.ObjectId();

    //Structure to be sent to axios/router
    const newPost = {
        parent_thread_id: threadID,
        post_body_text: this.state.bodytext,
    }

    const headers = {
        headers: {
            token: this.getCookie("token"),
            //'Content-Type': 'multipart/form-data'
        }
    }


    //axios sends data through backend API endpoint
    console.log(newPost);//console logging for dev - can be removed for release
    axios.post(backend.backendURL + '/posts/add', newPost, headers)
      .then(res => console.log(res.data));

      window.location.href = "/post/" + threadID;
  }
  

    //function CreatePost() {
    render() {
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

        var cookieRole = getCookie("role") || "guest";

        if(cookieRole == "guest") {
            window.location.href = "/login";
        }

        else {

            return (
                <Container style={{ marginTop: "40px" }}>
                    <Row>
                        <Col></Col>
                        <Col md={7} style={{ border: "5px solid black", borderRadius: "30px", padding: "20px 20px" }}>
                            <Form >
                                {/*  dsfsdfsdf
                                <Form.Group>
                                    <Form.Label style={{ fontWeight: "bold" }}>New Post Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" />
                                    <Form.Text className="text-muted">
                                        What will your post be about?.
                                    </Form.Text>
                                </Form.Group>
                                */}
                                <Form.Group>
                                    <Form.Label style={{ fontWeight: "bold" }}>Reply</Form.Label>
                                    <Editor
                                        apiKey = "ryef7c7iynamh7xxtkti6mskmx80xg2t3qy2xqtiqmwxf2d5"
                                        init={{
                                            height: 300,
                                            menubar: false
                                        }}
                                        onEditorChange = {this.onChangeText}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Row>
                                        <Col></Col>
                                        <Col style={{ textAlign: "center" }}>
                                            <Button onClick={this.onSubmit} 
                                                style={{ padding: "10px 20px", width: "160px" }} 
                                                variant="primary" 
                                                type="submit" 
                                                href="/posts/add">
                                                Create Post
                                            </Button>
                                        </Col>
                                        <Col></Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            );
        }
    }
}