//import React from 'react'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";

var mongoose = require('mongoose');
const backend = require('./backendLink');
const auth = require('../auth');

//converted into object oriented java (degenerate clown-shoes garbage) -Kyle
export default class CreateTopic extends Component {
    constructor(props) {
        super(props);
    
        //Function bindings
        this.onChangeText = this.onChangeText.bind(this);
        this.submitThread = this.submitThread.bind(this);

        this.getCookie = this.getCookie.bind(this);

    
        //State object
        this.state = {
            postText: ''
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


    onChangeText(content, editor) {
        this.setState({
            postText: content
        })
    }


      //Function Declarations   
      submitThread(e) {
        e.preventDefault();
        var thisurl = window.location.href.split("/")
        var topicID = thisurl[thisurl.length - 1]
        var newId = mongoose.Types.ObjectId();
        const newThread = {
            _id: newId,
            parent_topic_id: topicID,
            thread_title: String(document.getElementById("threadtitle").value)
        }
        const newPost = {
            parent_thread_id: newId,
            post_body_text: this.state.postText//String(document.getElementById("posttext").value)
        }

        const headers = {
            headers: {
                token: this.getCookie("token"),
                //'Content-Type': 'multipart/form-data'
            }
        }

        //axios sends data through backend API endpoint
        console.log(newThread);//console logging for dev - can be removed for release
        axios.post(backend.backendURL + '/threads/add', newThread, headers)
          .then(res => console.log(res.data));

        axios.post(backend.backendURL + '/posts/add', newPost, headers)
          .then(res => console.log(res.data));

          //reset form 
          this.setState({
            topicTitle: '',
            topicDesc: ''
        })


        window.location.href = "/post/" + newId;
      }

    render() {

        // getCookie function
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
                <Container style = {{marginTop: "40px"}}>
                    <Row>
                        <Col></Col>
                        <Col md = {7} style = {{border: "5px solid black", borderRadius: "30px", padding: "20px 20px"}}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style = {{fontWeight: "bold"}}>New Thread Title</Form.Label>
                                    <Form.Control type="text" id="threadtitle" placeholder="Enter an interesting title" />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                {/*
                                <Form.Group>
                                    <Form.Label style = {{fontWeight: "bold"}}>Post Text</Form.Label>
                                    <Form.Control as = "textarea" type="text" id="posttext" placeholder="Enter some interesting text people will want to read. Try not to be boring." />
                                    <Form.Text className="text-muted" >
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
                                <Row>
                                    <Col></Col>
                                    <Col style = {{textAlign: "center"}}>
                                        <Button 
                                            style = {{padding: "10px 20px", width: "160px"}} 
                                            variant="primary" 
                                            type="submit"
                                            onClick={this.submitThread}
                                        >
                                            Create Thread
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
}

