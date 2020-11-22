import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//copy of the old edit/delete link
//<Link to={"/api/edit/"+props.post._id}>edit</Link> | <a href="#" onClick={() => { props.deletePost(props.post._id) }}>delete</a>
const Topic = props => (
  <tr>
    <td>{props.topic._id}</td>
    <td>{props.topic.parent_board_id}</td>
    <td>{props.topic.topic_title}</td>
    <td>{props.topic.topic_desc}</td>
    <td>{props.topic.topic_num}</td>
    <td>{props.topic.del_flag}</td>
    <td>
      <Link to={"/api/edit/"+props.topic._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTopic(props.topic._id, props.topic.topic_title) }}>delete</a>
    </td>
  </tr>
)


export default class TopicList extends Component {
  //props is passed into our component here? where does it originate? in this file it seems assumed props contains post, matching the post model
  //does the data originate from the axios responses below?
  constructor(props) {
    super(props);

    this.deleteTopic = this.deleteTopic.bind(this)

    this.state = {topics: []};
  }

  componentDidMount() {
    //This queries all posts
    //console.log('componentdidmount');
    axios.get('http://kplumme1-ec2.ddns.net:5000/topics/')
      .then(response => {
        this.setState({ topics: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTopic(id, text) {
    //axios.delete('http://kplumme1-ec2.ddns.net:5000/posts/'+id)
    let updateTopic = {
      _id: id,
      del_flag: true
    }

    axios.post('http://kplumme1-ec2.ddns.net:5000/topics/update', updateTopic)
      .then(response => { console.log(response.data)});

    this.setState({
      topics: this.state.topics.filter(el => el._id !== id)
    })
  }

  topicList() {
      console.log('topicList: ');
      console.log(this.state.topics);
    return this.state.topics.map(currenttopic => {return <Topic topic={currenttopic} deleteTopic={this.deleteTopic} key={currenttopic._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Topics</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>internalid</th>
              <th>parentid</th>
              <th>title</th>
              <th>description</th>
              <th>ordernum</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.topicList() }
          </tbody>
        </table>
      </div>
    )
  }
}
