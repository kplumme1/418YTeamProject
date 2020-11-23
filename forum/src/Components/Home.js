import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
var config = require('../config.json');
const backend = require('./backendLink');

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

class Home extends React.Component {

    constructor() {
        super();
        this.state = {topics: []};
    }

    componentDidMount() {
        axios.get(backend.backendURL + '/topics/')
      .then(response => {
        this.setState({ topics: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    }
    
    render(){

        var cookieUser = getCookie("username") || "guest";
        var cookieRole = getCookie("role") || "guest";

        const notLoggedIn = (<Jumbotron style = {{margin: "1% 1%"}}>
                        <h1>Welcome to {config.forumname}!</h1>
                        <p>
                            This is the forum of the modern times - no PHP, no ASP, no nonsense. Join now!
                        </p>
                        <p>
                            <Button variant="primary" href="/login">Login/Register</Button>
                        </p>
                        </Jumbotron>);
        
        const loggedIn = (<Jumbotron style = {{margin: "1% 1%"}}>
                        <h1>Welcome to {config.forumname}, {cookieUser}!</h1>
                        <p>
                            You're ready to see the forum of the future! Click any of the topics below to start your experience. With your account, you can create posts as well!
                        </p>
                        </Jumbotron>);
        
        const adminCreateTopicHeader = (
            <div style = {{backgroundColor: "#343a40", textAlign: "center"}}>
                <Button style = {{margin: "0px 10px 20px 10px", fontSize: "20px"}} href = "/CreateTopic">+ Create Topic</Button>
            </div>
        );
        
        const renderTopicMessage = (
            <h1 style = {{textAlign: "center", textDecoration: "underline", margin: "100px 0px"}}>Active Topics</h1>
        );
        
        const renderTopics = this.state.topics.map(topic => (
            <a href = {"/topics/" + topic._id} style = {{color: "black"}}>
                <div style = {{margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black"}}>
                    <div>
                        <h3>{topic.topic_title}</h3>
                        <h6>{topic.topic_desc}</h6>
                    </div>
                </div>
            </a>
        ));

        if (cookieRole == "guest") {
            return (
                <div>
                    {notLoggedIn}
                    {renderTopicMessage}
                    {renderTopics}
                </div>
            );
        }

        else if (cookieRole == "admin") {
            return (
                <div>
                    {adminCreateTopicHeader}
                    {loggedIn}
                    {renderTopicMessage}
                    {renderTopics}
                </div>
            ); 
        }

        else {
            return (
                <div>
                    {loggedIn}
                    {renderTopicMessage}
                    {renderTopics}
                </div>
            );
        }
        
    }
}

export default Home;