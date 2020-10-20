import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = props => (
  <tr>
    <td>{props.post.parent_topic_id}</td>
    <td>{props.post.post_author}</td>
    <td>{props.post.post_body_text}</td>
    <td>{props.post.post_num}</td>
    <td>
      <Link to={"/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
    </td>
  </tr>
)

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.deletePost = this.deletePost.bind(this)

    this.state = {posts: []};
  }

  componentDidMount() {
    axios.get('http://kplumme1-backup.ddns.net:5000/posts/')
      .then(response => {
        this.setState({ posts: response.data })
        console.log(response.data);
        console.log(this.state.posts);
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  deletePost(id) {
    axios.delete('http://kplumme1-backup.ddns.net:5000/posts/'+id)
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
