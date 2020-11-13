//This page is not actually in use any longer, the prototype components have been loaded into App.js

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/prototype/navbar.component"
import ExercisesList from "./components/prototype/exercises-list.component";
import EditExercise from "./components/prototype/edit-exercise.component";
import CreateExercise from "./components/prototype/create-exercise.component";
import CreateUser from "./components/prototype/create-user.component";
import CreatePost from "./components/prototype/create-post.component";
import PostList from "./components/prototype/post-list.component"

function Prototype() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/post" component={CreatePost} />
      <Route path="/list" component={PostList} />
      </div>
    </Router>
  );
}

export default Prototype;