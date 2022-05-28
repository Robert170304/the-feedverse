import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, publishedAt} = this.props
    let publishTime = new Date(publishedAt)
    return (
      <div className='my-3 cardContainer align-self-start' style={{width: '20rem'}}>
        {!this.props.loading && <div className="card">
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm" style={{color:' #F7F7F7', background: '#3A504B'}}>Read More</a>
            <p className="card-text my-2"><small className="text-muted">Published at {publishTime.toUTCString()}</small></p>
          </div>
        </div> 
        }
      </div>
    )
  }
}

export default Newsitem