All of the necessary endpoints for CRUD on forum content are up. The forum is modeled with a single "board" which is the topmost container. The board contains topics which are sort of like subreddits or communities. These are designed to hold threads about similar subject matter. Threads are chains of posts, basically a single conversation where the back and forth communication occurs in posts.

To access an API endpoint use axios methods. The primary ones we are interested in are axios.get and axios.post. Rather than using axios.delete, we are using post to update the del_flag field to true. This filters that item out of most queries.

Here is an example of a simple axios.get to preform a GET request on the endpoint that returns all posts. (This endpoint is just for development, we probably won't ever want to return all posts)

```
axios.get('http://kplumme1-ec2.ddns.net:5000/posts/')
      .then(response => {
        this.setState({ posts: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  ```
  
You can see how this gets used in the post list prototype page:
`http://kplumme1-ec2.ddns.net:3000/api/postlist`
Which is rendered by the `read-posts.js` component located:
`/src/Components/api/read-posts.js`

Here is an example of an axios.get call to fetch a specific post by it's ID:
```
    axios.get('http://kplumme1-ec2.ddns.net:5000/posts/URLupdate/'+this.props.match.params.id)
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
```

This example is pulled from the edit posts prototype page:
`http://kplumme1-ec2.ddns.net:3000/api/edit/<_ID HERE>` Note: the `_id` is part of the URL. You can also click the "edit" button on a post in the post list prototype page mentioned above.
This page is rendered by the edit-posts component located:
`/src/Components/api/edit-posts.js`
The unique ID of the post in question is apended to the end of the URL and the response from mongodb is set in the component's state structure.

Lastly, here is an example of an axios.post method:
```
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
```
This can be seen in the edit-posts prototype page mentioned above. This is the method used to update the post with new data.
We first build a JSON struct with all the fields we might need, and then pass that as the second parameter of the axios.post method. These three examples show us all of the necessary basics to get and post data to the db. The details about the endpoints follow.


Here are the models of the database tables for Board, Topic, Thread, and Post:
All tables also implicitly include a unique ID field called `_id` which acts as the unique key and is used to query individual documents from the db.
All tables also implicitly include create and modify timestamps, which are not really used.
Whenever we need to send or receive data, simply refer to fields by the same name as appears in the model.
Axios methods send JSON structs as the second parameter, following the URL of the endpoint, and return similar JSON structs (POSTs may not contain db data, they may just contain a response message or an error).


### Board:
```
const boardSchema = new Schema({
  board_title_text: { type: String, required: true },
  board_desc_text: { type: String, required: true },
}, {
  timestamps: true,
});
```

Going forward all endpoints listed come after the backend URL, which as of now is:
`http://kplumme1-ec2.ddns.net:5000`
So, for instance the board creation endpoint is:
`/boards/add`
Which when appended to the backend URL becomes:
`http://kplumme1-ec2.ddns.net:5000/boards/add`
Note that whenever something appears in a URL with < > that means to insert some value there, like `<_id>` the implicit unique ID for the document.

Because the board is just a single top-level container it doesn't need to have much else besides a title and a description to display.

#### Create:
`/boards/add/`

#### Find board by unique ID in URL:
`/boards/urlid/<_id>`

#### Find all boards (but there's only one for now...):
`/boards/`


### Topic:
```
const topicSchema = new Schema({
    topic_title: { type: String, required: true },
    topic_desc: { type: String, required: true },
    topic_num: { type: Number, required: true },
    del_flag: { type: Boolean, required: true }    
}, {
  timestamps: true,
});
```

#### Create:
`/topics/add/`

#### Find all topics:
`/topics/`

#### Find Topics associated with parent board `_id`:
`/topics/board/`

#### Find topic by ID in query parameter:
`/topics/queryid/`
This requires a 'query parameter' sent with the axios call. Simply create a JSON struct with an `_id` field and send that as the second parameter after the URL. 

#### Find topic by ID in URL:
`/topics/urlid/<_id>`
Instead of using a query parameter, you can just apend the ID to the URL.

#### Update topic:
`/topics/update/`


### Thread:
```
const threadSchema = new Schema({
    parent_topic_id: { type: String, required: true },
    thread_num: { type: Number, required: true },
    thread_author: { type: String, required: true },
    thread_title: { type: String, required: true },
    del_flag: { type: Boolean, required: true }    
}, {
    timestamps: true,
});
```
#### Create thread:
`/threads/add/`

#### Find all threads:
`/threads/`

#### Find threads associated with parent topic `_id`
`/threads/topic/`
Note: `_id` here is referring to the ID of the parent topic which contains these threads. 

#### Find thread with `_id` in query parameter:
`/threads/queryid/`

#### Find threads with `_id` in URL:
`/threads/urlid/<_id>`

#### Update thread:
`/threads/update/`



### Posts:
```
const postSchema = new Schema({
    parent_thread_id: { type: String, required: true },
    post_num: { type: Number, required: true },
    post_author: { type: String, required: true },
    post_body_text: { type: String, required: true },
    del_flag: { type: Boolean, required: true }
}, {
    timestamps: true,
});
```

#### Add post:
`/posts/add/`

#### Find all posts:
`/posts/`

#### Find posts associated with parent thread `_id`:
`/posts/thread`

#### Find specific post by `_id` in query parameter:
`/posts/queryid/`

#### Find specific post by `_id` in URL
`/posts/urlid/<_id>`

#### Update post:
`/posts/update/`
