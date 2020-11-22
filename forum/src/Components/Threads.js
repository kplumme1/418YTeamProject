import React from 'react'
import axios from 'axios'

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

        var parentID = window.location.href.split("/")
        parentID = parentID[parentID.length - 1]

        return (
            <div>
                <h1 style = {{textAlign: "center", textDecoration: "underline", margin: "50px 0px"}}>Threads</h1>
                {this.state.threads.map(thread => {
                    if(thread.parent_topic_id === parentID){
                        return (
                            <a href = {"/post/" + thread._id} style = {{color: "black"}}>
                                <div style = {{margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black"}}>
                                    <div>
                                        <h3>{thread.thread_title}</h3>
                                        <h6>Created By {thread.thread_author}</h6>
                                        <h6>Created On {thread.createdAt}</h6>
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