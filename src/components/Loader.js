import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    return (
      <div>
        <div className="my-4 d-flex justify-content-center align-items-center">
            <div className='spinner-border' style={{color: '#0EF6BE'}} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      </div>
    )
  }
}
