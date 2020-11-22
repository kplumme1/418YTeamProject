import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

class Threads extends React.Component {

    constructor() {
        super();
        this.state = {threads: []};
    }



    render() {

        axios.get('http://kplumme1-ec2.ddns.net:5000/threads/')
        .then(response => {
          this.setState({ threads: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
        
        //grab parent_topic_id from URL
        var thisurl = window.location.href.split("/")
        var topicID = thisurl[thisurl.length - 1]
        //var parentID = window.location.href.split("/")
        //parentID = parentID[parentID.length - 1]

        return (
            <div>
                <div style = {{backgroundColor: "#343a40", textAlign: "center"}}>
                    <Button style = {{margin: "0px 10px 20px 10px", fontSize: "20px"}} href = {"/CreateThread/" + topicID}>+ Create Thread</Button>
                </div>
                <h1 style = {{textAlign: "center", textDecoration: "underline", margin: "50px 0px"}}>Threads</h1>
                {this.state.threads.map(thread => {
                    if(thread.parent_topic_id === topicID){
                        return (
                            <a href = {"/post/" + thread._id} style = {{color: "black"}}>
                                <div style = {{margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black"}}>
                                    <div>
                                        <h3 style = {{marginBottom: "30px"}}>{thread.thread_title}</h3>
                                        <h6>Created By {thread.thread_author}</h6>
                                        <h5>{thread.createdAt.split("T")[0] + " at " + thread.createdAt.split("T")[1].split(".")[0]}</h5>
                                    </div>
                                </div>
                            </a>
                        )}
                    return null
                })}
            </div>
        );
    }
}

export default Threads