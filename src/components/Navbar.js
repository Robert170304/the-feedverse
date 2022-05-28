
import React, { Component } from 'react'
import {Link} from "react-router-dom";
import Category from './Category';

export default class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{color: '#0EF6BE'}}>The Feedverse</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/feeds">Feeds</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                {/*<div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" 
                    id="dropdownMenu2" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false" 
                    style={{color:' #F7F7F7', background: '#3A504B'}} >Category</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <Category categoryClick={this.props.categoryClick}/>
                    </ul>
                </div>*/}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Category categoryClick={this.props.categoryClick}/>
                  </ul>
                </li>
              </ul>
              <div>
                  <button type="button" className={`btn btn-light mx-2`} onClick={this.props.modeClick}>Dark Mode</button>
              </div>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.props.handleSearchChng}/>
                <button className="btn btn-outline-success" type="submit" >Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
