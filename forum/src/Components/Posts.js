import React from 'react'
import axios from 'axios'

class Posts extends React.Component {

    constructor() {
        super();
        this.state = {posts: [], parentPosts: []};
    }

    render() {

        axios.get('http://kplumme1-ec2.ddns.net:5000/posts/')
        .then(response => {
          this.setState({ posts: response.data })
        })
        .catch((error) => {
          console.log(error);
        })

        axios.get('http://kplumme1-ec2.ddns.net:5000/threads/')
        .then(response => {
          this.setState({ parentPosts: response.data })
        })
        .catch((error) => {
          console.log(error);
        })

        var parentID = window.location.href.split("/")
        parentID = parentID[parentID.length - 1]

        return (
            <div>
                <h1 style = {{textAlign: "center", textDecoration: "underline", margin: "50px 0px"}}>Replies to Post</h1>
                {this.state.posts.map(post => {
                    if(post.parent_thread_id === parentID){
                        return (
                            <div style = {{margin: "1% 1%", background: "linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)", padding: "30px 60px", borderRadius: "50px", border: "2px solid black"}}>
                                <div>
                                    <h2>{post.post_body_text}</h2>
                                    <h6>Created By {post.post_author}</h6>
                                    <h6>Created On {post.createdAt}</h6>
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