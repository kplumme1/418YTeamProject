import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminHeader from './Components/AdminHeader'
import Home from './Components/Home'
import Help from './Components/Help'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Logout from './Components/Logout'
import CreateTopic from './Components/CreateTopic'
import CreateThread from './Components/CreateThread'
import CreatePost from './Components/CreatePost'
import Posts from './Components/Posts'
import Threads from './Components/Threads'
import NotFound from './Components/NotFound'
import NoPermissions from './Components/NoPermissions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'

import {Provider} from "react-redux"
import store from "./store"
//API Component imports
import APICreatePost from "./Components/api/create-post";
import APIReadPosts from "./Components/api/read-posts"
import APIReadTopics from "./Components/api/read-topics";
import APIReadThreads from "./Components/api/read-threads";
import APIEditPost from "./Components/api/edit-posts";



//import ExercisesList from "./Components/api/exercises-list.component";

//import CreateExercise from "./Components/api/create-exercise.component";
import CreateUser from "./Components/api/create-user.component";


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
      <BrowserRouter>
        <AdminHeader/>
        <Switch>
          <Route exact path = "/" component = {Home} />
          <Route path = "/About" component = {About} />
          <Route path = "/Help" component = {Help} />
          <Route path = "/Login" component = {Login} />
          <Route path = "/Register" component = {Register} />
          <Route path = "/Profile" component = {Profile} />
          <Route path = "/Logout" component = {Logout} />
          <Route path = "/CreateTopic" component = {CreateTopic} />
          <Route path = "/CreateThread" component = {CreateThread} />
          <Route path = "/CreatePost" component = {CreatePost} />
          <Route path = "/topics" component = {Threads} />
          <Route path = "/post/" component = {Posts} />
          <Route path = "/nopermissions" component = {NoPermissions} />
          {/*API/Prototype routes*/}
          <Route path="/api/createpost" component={APICreatePost} />
          <Route path="/api/PostList" exact component = {APIReadPosts} />
          <Route path="/api/TopicList" component={APIReadTopics} />
          <Route path="/api/ThreadList" component={APIReadThreads} />
          <Route path="/api/edit/:id" component={APIEditPost} />
          {/*End of kyle's API/prototypes*/}
          <Route component = {NotFound} />
        </Switch>
      </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
