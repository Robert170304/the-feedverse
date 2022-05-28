import {Link} from "react-router-dom";
import React, { Component } from 'react'

export default class category extends Component {
  render() {
    let categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
    return (
        <div>
            {categories.map((category, id) => {
                return <li key={id} onClick={this.props.categoryClick}><span role="button" className="dropdown-item">{category}</span></li>
            })}
        </div>
    )
  }
}
