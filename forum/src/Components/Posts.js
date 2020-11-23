import React from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import ReactHtmlParser from 'react-html-parser';
const backend = require('./backendLink');

class Posts extends React.Component {

    constructor() {
        super();
        this.state = {posts: [], parentPosts: []};
    }

    componentDidMount() {
        axios.get(backend.backendURL + '/posts/')
        .then(response => {
          this.setState({ posts: response.data })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get(backend.backendURL + '/threads/')
        .then(response => {
          this.setState({ parentPosts: response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render() {

        var thisurl = window.location.href.split("/")
        var threadID = thisurl[thisurl.length - 1]

        return (
            <div>
                <div style = {{backgroundColor: "#343a40", textAlign: "center"}}>
                    <Button style = {{margin: "0px 10px 20px 10px", fontSize: "20px"}} href = {"/CreatePost/" + threadID}>+ Reply to Thread</Button>
                </div>
                <h1 style = {{textAlign: "center", textDecoration: "underline", margin: "50px 0px"}}>Replies to Post</h1>
                {this.state.posts.map(post => {
                    if(post.parent_thread_id === threadID){
                        return (
                            <div style = {{margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black"}}>
                                <div>
                                    <h4>{post.post_author}</h4>
                                    <h5>{post.createdAt.split("T")[0] + " at " + post.createdAt.split("T")[1].split(".")[0]}</h5>
                                    <h4 style = {{marginTop: "50px"}}>{ReactHtmlParser(post.post_body_text)}</h4>
                                </div>
                            </div>
                        )}
                    return null
                })}
            </div>
        );
    }
}

export default Posts