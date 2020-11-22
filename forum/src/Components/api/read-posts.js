import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//copy of the old edit/delete link
//<Link to={"/api/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
const Post = props => (
  <tr>
    <td>{props.post._id}</td>
    <td>{props.post.parent_thread_id}</td>
    <td>{props.post.post_author}</td>
    <td>{props.post.post_body_text}</td>
    <td>{props.post.post_num}</td>
    <td>
      <Link to={"/api/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id, props.post.post_body_text) }}>delete</a>
    </td>
  </tr>
)

export default class PostList extends Component {
  //props is passed into our component here? where does it originate? in this file it seems assumed props contains post, matching the post model
  //does the data originate from the axios responses below?
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this)

    this.state = {posts: []};
  }

  componentDidMount() {
    //This queries all posts
    //console.log('componentdidmount');
    axios.get('http://kplumme1-ec2.ddns.net:5000/posts/')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePost(id, text) {
    //axios.delete('http://kplumme1-ec2.ddns.net:5000/posts/'+id)
    let updatePost = {
      _id: id,
      post_body_text: text,
      del_flag: true
    }

    axios.post('http://kplumme1-ec2.ddns.net:5000/posts/update', updatePost)
      .then(response => { console.log(response.data)});

    this.setState({
      posts: this.state.posts.filter(el => el._id !== id)
    })
  }

  postList() {
      console.log('postList: ');
      console.log(this.state.posts);
    return this.state.posts.map(currentpost => {return <Post post={currentpost} deletePost={this.deletePost} key={currentpost._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>internalid</th>
              <th>parentid</th>
              <th>username</th>
              <th>bodytext</th>
              <th>ordernum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.postList() }
          </tbody>
        </table>
      </div>
    )
  }
}
