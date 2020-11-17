import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header'
import AdminHeader from './Components/AdminHeader'
import Home from './Components/Home'
import Help from './Components/Help'
import About from './Components/About'
import Login from './Components/Login'
import Register from './Components/Register'
import CreateTopic from './Components/CreateTopic'
import CreatePost from './Components/CreatePost'
import Post from './Components/Post'
import NotFound from './Components/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'



import {Provider} from "react-redux";
import store from "./store"
//API Component imports
import APICreatePost from "./Components/api/create-post";
import APIReadPosts from "./Components/api/read-posts"
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
          <Route path = "/CreateTopic" component = {CreateTopic} />
          <Route path = "/CreatePost" component = {CreatePost} />
          <Route path = "/Post" component = {Post} />
          {/*API/Prototype routes. - completed*/}
          <Route path="/api/createpost" component={APICreatePost} />
          <Route path = "/api/PostList" exact component = {APIReadPosts} />

          {/*API/Prototype routes - work in progress.*/}
          <Route path="/api/edit/:id" component={APIEditPost} />

          {/*API/Prototype routes. - these need work*/}
          <Route path="/api/user" component={CreateUser} />
          {/*End of kyle's API/prototypes*/}
          <Route component = {NotFound} />
        </Switch>
      </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
