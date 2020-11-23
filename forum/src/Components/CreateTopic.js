//import React from 'react'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios';

const backend = require('./backendLink');

//converted into object oriented java (degenerate clown-shoes garbage) -Kyle
export default class CreateTopic extends Component {
    constructor(props) {
        super(props);
    
        //Function bindings
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.submitTopic = this.submitTopic.bind(this);
    
        //State object
        this.state = {
            topicTitle: '',
            topicDesc: ''
        }
      }

      //Function Declarations
      onChangeTitle(e) {
        this.setState({
            topicTitle: e.target.value
          })
      }

      onChangeDesc(e) {
        this.setState({
            topicDesc: e.target.value
          })
      }
    
      submitTopic(e) {
        e.preventDefault();

        //Structure to be sent to axios/router
        const newTopic = {
            topic_title: String(document.getElementById("topictitle").value),
            topic_desc: String(document.getElementById("topicdesc").value)
            //topic_num: { type: Number, required: true },
        }
    
        //axios sends data through backend API endpoint
        console.log(newTopic);//console logging for dev - can be removed for release
        axios.post(backend.backendURL + '/topics/add', newTopic)
          .then(res => console.log(res.data));
        //alert('test: ' + this.state.topicTitle);

          //reset form (via stste object)
          this.setState({
            topicTitle: '',
            topicDesc: ''
        })

        window.location.href = "/";
      }

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

        if(cookieRole != "admin") {
            window.location.href = "/nopermissions";
        }

        else {

            return (
                <Container style = {{marginTop: "40px"}}>
                    <Row>
                        <Col></Col>
                        <Col md = {7} style = {{border: "5px solid black", borderRadius: "30px", padding: "20px 20px"}}>
                            <Form>
                                <Form.Group>
                                    <Form.Label style = {{fontWeight: "bold"}}>New Topic Name</Form.Label>

                                    <Form.Control type="text" id="topictitle" placeholder="Name" />
                                    <Form.Text 
                                        className="text-muted"
                                        //value={this.state.topictitle}
                                        //onChange={this.onChangeTitle}
                                    >

                                    This is how the name will show up on the forum.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label style = {{fontWeight: "bold"}}>Description</Form.Label>

                                    <Form.Control as = "textarea" type="text" id="topicdesc" placeholder="Description" />
                                    <Form.Text 
                                        className="text-muted"
                                        //value={this.state.topicDesc}
                                        //onChange={this.onChangeDesc}    
                                    >

                                    This description will be shown below the name. Use it to explain to users what it will be about!
                                    </Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col></Col>
                                    <Col style = {{textAlign: "center"}}>

                                        <Button 
                                            style = {{padding: "10px 20px", width: "160px"}} 
                                            variant="primary" 
                                            type="submit"
                                            onClick={this.submitTopic}
                                        >

                                            Create Topic
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
