import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import backendLink from './backendLink';
const backend = require('./backendLink');

class Threads extends React.Component {

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

    constructor() {
        super();
        this.state = { threads: [] };
    }

    componentDidMount() {
        axios.get(backend.backendURL + '/threads/')
            .then(response => {
                this.setState({ threads: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        
        var parentID = window.location.href.split("/")
        parentID = parentID[parentID.length - 1]


        return (
            <div>
                <div style={{ backgroundColor: "#343a40", textAlign: "center" }}>
                    <Button style={{ margin: "0px 10px 20px 10px", fontSize: "20px" }} href={"/CreateThread/" + parentID}>+ Create Thread</Button>
                </div>
                <h1 style={{ textAlign: "center", textDecoration: "underline", margin: "50px 0px" }}>Threads</h1>
                {this.state.threads.map(thread => {
                    if (thread.parent_topic_id === parentID) {
                        var pfp;
                        const sendData = {
                            username:thread.thread_author
                        }
                        //alert("Going to send request");
                        /*
                        axios.get('http://kplumme1-ec2.ddns.net:5000/user/userInfo/'+thread.thread_author).then(response => {
                            pfp = response.data.pfp;
                        })
                        .catch((error) => {
                            //alert(error);
                            //console.log(error);
                        });
                        */
                        return (
                            <a href={"/post/" + thread._id} style={{ color: "black" }}>
                                <div style={{ margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black" }}>
                                    <div>
                                        <Image style={{ border: "1spx solid black" }} src={this.pfp} height="50px" width="50px" roundedCircle></Image>
                                        <h3 style={{ marginBottom: "30px" }}>{thread.thread_title}</h3>
                                        <h6>Created By {thread.thread_author}</h6>
                                        <h5>{thread.createdAt.split("T")[0] + " at " + thread.createdAt.split("T")[1].split(".")[0]}</h5>
                                    </div>
                                </div>
                            </a>
                        )
                    }
                    return null
                })}
            </div>
        );
    }
}

export default Threads