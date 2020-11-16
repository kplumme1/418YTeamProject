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
          <Route component = {NotFound} />
        </Switch>
      </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
