import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//copy of the old edit/delete link
//<Link to={"/api/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
const Thread = props => (
  <tr>
    <td>{props.thread._id}</td>
    <td>{props.thread.parent_topic_id}</td>
    <td>{props.thread.thread_num}</td>
    <td>{props.thread.thread_title}</td>
    <td>{props.thread.del_flag}</td>
    <td>
      <Link to={"/api/edit/"+props.thread._id}>edit</Link> | <a href="#" onClick={() => { props.deleteThread(props.thread._id) }}>delete</a>
    </td>
  </tr>
)



export default class ThreadList extends Component {
  //props is passed into our component here? where does it originate? in this file it seems assumed props contains post, matching the post model
  //does the data originate from the axios responses below?
  constructor(props) {
    super(props);

    this.deleteThread = this.deleteThread.bind(this)

    this.state = {threads: []};
  }

  componentDidMount() {
    //This queries all posts
    //console.log('componentdidmount');
    axios.get('http://kplumme1-ec2.ddns.net:5000/threads/')
      .then(response => {
        this.setState({ threads: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteThread(id, text) {
    //axios.delete('http://kplumme1-ec2.ddns.net:5000/posts/'+id)
    let updateThread = {
      _id: id,
      del_flag: true
    }

    axios.post('http://kplumme1-ec2.ddns.net:5000/threads/update', updateThread)
      .then(response => { console.log(response.data)});

    this.setState({
      threads: this.state.threads.filter(el => el._id !== id)
    })
  }

  threadList() {
      console.log('threadList: ');
      console.log(this.state.threads);
    return this.state.threads.map(currentthread => {return <Thread thread={currentthread} deletePost={this.deleteThread} key={currentthread._id}/>;
    })
  }



  render() {
    return (
      <div>
        <h3>Threads</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>internalid</th>
              <th>parentid</th>
              <th>threadnum</th>
              <th>threadtitle</th>
              <th>delflag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.threadList() }
          </tbody>
        </table>
      </div>
    )
  }
}
