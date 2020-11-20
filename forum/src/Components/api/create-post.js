import React, { Component } from 'react';
import axios from 'axios';


//export default class CreatePostPrototype extends Component {
export default class APICreatePost extends Component {
  constructor(props) {
    super(props);

    //Function bindings
    this.onChangeParent = this.onChangeParent.bind(this);
    this.onChangePostNum = this.onChangePostNum.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onchangeText = this.onchangeText.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    //State object
    this.state = {
      parentid: '',
      postnum: 0,
      authorid: '',
      bodytext: '',
      delflag: false
    }
  }


  //Functions
  onChangeParent(e) {
    this.setState({
        parentid: e.target.value
    })
  }

  onChangeAuthor(e) {
    this.setState({
      authorid: e.target.value
    })
  }

  onChangePostNum(e) {
      this.setState({
          postnum: e.target.value
      })
  }

  onchangeText(e) {
      this.setState({
          bodytext: e.target.value
      })
  }

  //Function that submits data to db via axios and router
  onSubmit(e) {
    e.preventDefault();

    //Structure to be sent to axios/router
    const newPost = {
      parent_thread_id: this.state.parentid,
	    post_num: this.state.postnum,
	    post_author: this.state.authorid,
      post_body_text: this.state.bodytext,
      del_flag: this.state.delflag
    }

    //axios sends data through backend API endpoint
    console.log(newPost);//console logging for dev - can be removed for release
    axios.post('http://kplumme1-ec2.ddns.net:5000/posts/add', newPost)
      .then(res => console.log(res.data));

      //reset form (via stste object)
      this.setState({
      //parentid: '',
      //postnum: 0,
      //authorid: '',
      bodytext: '',
      delflag: false
    })
  }

  //Prototype
  render() {
    return (
      <div>
        <h3>Create New Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Parent thread ID:: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.parent_thread_id}
                onChange={this.onChangeParent}
                />
          </div>
          <div className="form-group"> 
            <label>Post number: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.postnum}
                onChange={this.onChangePostNum}
                />
          </div>
          <div className="form-group"> 
            <label>Author user ID: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.authorid}
                onChange={this.onChangeAuthor}
                />
          </div>
          <div className="form-group"> 
            <label>Post body text: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.bodytext}
                onChange={this.onchangeText}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}