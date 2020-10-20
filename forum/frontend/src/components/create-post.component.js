import React, { Component } from 'react';
import axios from 'axios';

export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeParent = this.onChangeParent.bind(this);
    this.onchangeText = this.onchangeText.bind(this);
    this.onChangeOrderNum = this.onChangeOrderNum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      parentid: '',
      username: '',
      bodytext: '',
      ordernum: 0
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeParent(e) {
      this.setState({
          parentid: e.target.value
      })
  }

  onchangeText(e) {
      this.setState({
          bodytext: e.target.value
      })
  }

  onChangeOrderNum(e) {
      this.setState({
          ordernum: e.target.value
      })
  }


  onSubmit(e) {
    e.preventDefault();

    const newPost = {
        //username: this.state.username
      	parent_topic_id: this.state.parentid,
	    post_num: this.state.ordernum,
	    post_author: this.state.username,
	    post_body_text: this.state.bodytext
    }

    console.log(newPost);

    axios.post('http://kplumme1-backup.ddns.net:5000/posts/add', newPost)
      .then(res => console.log(res.data));

    this.setState({
      bodytext: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
          </div>
          <div className="form-group"> 
            <label>Parent Thread ID: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.parentid}
                onChange={this.onChangeParent}
                />
          </div>
          <div className="form-group"> 
            <label>Text: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.bodytext}
                onChange={this.onchangeText}
                />
          </div>
          <div className="form-group"> 
            <label>Post number: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.postnum}
                onChange={this.onChangeOrderNum}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Post" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}