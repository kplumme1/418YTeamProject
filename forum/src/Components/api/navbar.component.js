import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">API TEST</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/user" className="nav-link">USER ENTRY</Link>
          </li>
          <li className="navbar-item">
          <Link to="/post" className="nav-link">POST ENTRY</Link>
          </li>
          <li className="navbar-item">
          <Link to="/list" className="nav-link">POST LIST</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}