import './App.css';
import React, { Component, createContext } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import About from './components/About';
import {Routes, Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  constructor() {
    super()
    this.state = {neededHeight: 0, category: 'general', pageSize: 20, progress: 0};
    this.currentTheme = localStorage.getItem("theme");
    if (this.currentTheme === "dark") {
      document.body.classList.add("dark-theme");
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      this.setState((oldState) => {
        return {...oldState, neededHeight: window.pageYOffset}
      })
    })
  }

  handleMode() {
      this.setState((oldState) => {
        return{...oldState,  mode: !oldState.mode}
      });
      document.body.classList.toggle("dark-theme");
      let theme = "light"
      if (document.body.classList.contains("dark-theme")) {
        theme = "dark";
      } 
      localStorage.setItem("theme", theme);
  }

  handleCategorylick = async (e) => {
    this.setState((oldState) => {
      return {...oldState, category: e.target.textContent}
    })
  }

  handleLoadingBar = async(progress) => {
    this.setState((oldState) => {
      return {...oldState, progress: progress}
    })
  }

  handleSearchChng(e) {
    console.log(e.target.value)
  }

  
  render() {
    return (
      <div>
        <Navbar modeClick={this.handleMode.bind(this)} theme={this.currentTheme} category={this.state.category}
          categoryClick={this.handleCategorylick.bind(this)} handleSearchChng={this.handleSearchChng} />
        <LoadingBar color='#0EF6BE' progress={this.state.progress} />
        <Routes>
          <Route path='/feeds' element={<News theme={this.currentTheme} 
          key={this.state.category} 
          setProgress={this.handleLoadingBar}
          pageSize={this.state.pageSize}
          country='in'
          category={this.state.category}
          categoryClick={this.handleCategorylick.bind(this)}/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
        {this.state.neededHeight >= 500 && <a className="top-link" href='javascript:window.scrollTo(0,0)' accessKey='u'>
          <i className="bi bi-arrow-up-square-fill"></i>
        </a>}
      </div>
    )
  }
}

