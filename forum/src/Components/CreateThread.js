//import React from 'react'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios';

var mongoose = require('mongoose');
const auth = require('../auth');

//converted into object oriented java (degenerate clown-shoes garbage) -Kyle
export default class CreateTopic extends Component {
    constructor(props) {
        super(props);
    
        //Function bindings
        this.submitThread = this.submitThread.bind(this);
    
        //State object //no longer used
        /*
        this.state = {
            topicTitle: '',
            topicDesc: ''
        }
      */
    }

    


      //Function Declarations   
      submitThread(e) {
        e.preventDefault();
        var thisurl = window.location.href.split("/")
        var topicID = thisurl[thisurl.length - 1]
        //var userID = auth.getUserId(req);
        //alert('ID: ' + topicID)
        var newId = mongoose.Types.ObjectId();
        const newThread = {
            _id: newId,
            parent_topic_id: topicID,
            thread_title: String(document.getElementById("threadtitle").value)
        }
        /*const newPost = {
            parent_thread_id: newId,
            post_author: this.state.authorid,
            post_body_text: this.state.bodytext,
            del_flag: this.state.delflag
        }*/

        //Structure to be sent to axios/router
        //const newThread = {
          //  topic_title: String(document.getElementById("threadtitle").value),
            //topic_desc: String(document.getElementById("posttext").value)
        //}
    
        //axios sends data through backend API endpoint
        console.log(newThread);//console logging for dev - can be removed for release
        axios.post('http://kplumme1-ec2.ddns.net:5000/threads/add', newThread)
          .then(res => console.log(res.data));
        //alert('test: ' + this.state.threadTitle);

/*

    //Structure to be sent to axios/router
    const newPost = {
        parent_thread_id: newId,
        post_num: this.state.postnum,
        post_author: this.state.authorid,
        post_body_text: this.state.bodytext,
        del_flag: this.state.delflag
    }

    const newThread = {
        _id: newId,
        parent_topic_id: "testTopic",
        thread_num: 0,
        thread_author: "testAuthor",
        thread_title: "Thread_Title",
        del_flag: false
    }

    alert("new post json: " + newPost.del_flag + ", " + newPost.post_body_text);

    //axios sends data through backend API endpoint
    console.log(newPost);//console logging for dev - can be removed for release
    axios.post('http://kplumme1-ec2.ddns.net:5000/posts/add', newPost)
      .then(res => console.log(res.data));
    axios.post('http://kplumme1-ec2.ddns.net:5000/threads/add', newThread)
      .then(res => console.log(res.data));


    parent_topic_id: 'staticIdReplaceMe',
    thread_num,
    thread_author,
    thread_title,
    del_flag: false
*/


          //reset form (via stste object)
          this.setState({
            topicTitle: '',
            topicDesc: ''
        })

        window.location.href = "/";
      }

    render() {

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

                            <Form.Group>
                                <Form.Label style = {{fontWeight: "bold"}}>Post Text</Form.Label>
                                <Form.Control as = "textarea" type="text" id="posttext" placeholder="Enter some interesting text people will want to read. Try not to be boring." />
                                <Form.Text className="text-muted" >
                                </Form.Text>
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

