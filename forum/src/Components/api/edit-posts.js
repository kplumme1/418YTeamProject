import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeID = this.onChangeID.bind(this);
    this.onChangeParent = this.onChangeParent.bind(this);
    this.onChangePostNum = this.onChangePostNum.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeFlag = this.onChangeFlag.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    //State object
    this.state = {
      internalid: '',
      parentid: '',
      postnum: 0,
      authorid: '',
      bodytext: '',
      delflag: false
    }
  }


  componentDidMount() {
    axios.get('http://kplumme1-ec2.ddns.net:5000/posts/urlid/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          internalid: response.data._id,
          parentid: response.data.parent_thread_id,
          postnum: response.data.post_num,
          authorid: response.data.post_author,
          bodytext: response.data.post_body_text,
          delflag: response.data.del_flag
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

    //Functions
    onChangeID(e) {
      this.setState({
          internalid: e.target.value
      })
    }

    onChangeParent(e) {
      this.setState({
          parentid: e.target.value
      })
    }

    onChangePostNum(e) {
        this.setState({
            postnum: e.target.value
        })
    }

    onChangeAuthor(e) {
      this.setState({
        authorid: e.target.value
      })
    }
    
    onChangeText(e) {
        this.setState({
            bodytext: e.target.value
        })
    }

    onChangeFlag(e) {
      this.setState({
          delflag: e.target.value
      })
  }

  onSubmit(e) {
    e.preventDefault();

    let updatePost = {
      _id: this.state.internalid,
      parent_thread_id: this.state.parentid,
	    post_num: this.state.postnum,
	    post_author: this.state.authorid,
      post_body_text: this.state.bodytext,
      del_flag: this.state.delflag
    }

    console.log(updatePost);//console logging for dev - can be removed for release
    axios.post('http://kplumme1-ec2.ddns.net:5000/posts/update', updatePost)
      .then(res => console.log(res.data));

    //axios.post('http://kplumme1-ec2.ddns.net:5000/exercises/update/' + this.props.match.params.id, updatePost)
    //  .then(res => console.log(res.data));

    window.location = '/api/postlist/';
  }

  /*
      parentid: '',
      postnum: 0,
      authorid: '',
      bodytext: '',
      delflag: false
  */
    //Prototype
    render() {
      return (
        <div>
          <h3>Create New Post</h3>
          <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <label>Internal db ID: </label>
              <input readOnly type="text"
                  required
                  className="form-control"
                  value={this.state.internalid}
                  onChange={this.onChangeID}
                  />
            </div>
            <div className="form-group"> 
              <label>Parent thread ID: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.parentid}
                  onChange={this.onChangeParent}
                  />
            </div>
            <div className="form-group"> 
              <label>Post number: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.postnum}
                  onChange={this.onChangePostNum}
                  />
            </div>
            <div className="form-group"> 
              <label>Author user ID: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.authorid}
                  onChange={this.onChangeAuthor}
                  />
            </div>
            <div className="form-group"> 
              <label>Post body text: </label>
              <input type="text"
                  required
                  className="form-control"
                  value={this.state.bodytext}
                  onChange={this.onChangeText}
                  />
            </div>
            <div className="form-group"> 
              <label>Post delete flag: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.delflag}
                  onChange={this.onChangeFlag}
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