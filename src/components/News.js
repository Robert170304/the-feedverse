import React, { Component } from 'react'
import Newsitem from './Newsitem'
import '../index.css'
//import Category from './Category';
import Loader from './Loader'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    static defaultProps = {
        country: 'in', 
        pageSize: 8, 
    }

    static propTypes = {
        country: PropTypes.string, 
        pageSize: PropTypes.number,
    }

    constructor(props) {
        super(props)
        this.state = {articles: [], loading: false, totalResults: 0, pageNum: 1}
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - The Feedverse`
    }

    async componentDidMount() {
        this.updateFeeds()
    }

    async updateFeeds() {
        this.props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=067f08b271424dea9c607f23dbf20781&page=${this.state.pageNum}&pageSize=${this.props.pageSize}`
        this.setState((oldState) => {
            return {...oldState, loading: true}
        })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState((oldState) => {
          return {...oldState, 
            articles: parsedData.articles, 
            loading: false, 
            totalResults: parsedData.totalResults}
        })
        this.props.setProgress(100)
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchMoreData = async () => {
        this.setState((oldState) => {
            return {...oldState, pageNum: oldState.pageNum + 1}
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=067f08b271424dea9c607f23dbf20781&page=${this.state.pageNum+1}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState((oldState) => {
          return {...oldState, 
            articles: oldState.articles.concat(parsedData.articles), 
            loading: false, 
            totalResults: parsedData.totalResults}
        })
    };

    render() {
        return (
        <div className='container my-3'>
            {/*<div className={`container d-flex justify-content-between`} style={{color: this.props.theme === 'light' ? '#111' : '#fff'}}>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" 
                    id="dropdownMenu2" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false" 
                    style={{color:' #F7F7F7', background: '#3A504B'}} >Category</button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <Category categoryClick={this.props.categoryClick}/>
                    </ul>
                </div>
            </div>*/}
            <div className='d-flex justify-content-between align-items-center'
            style={{color: this.props.theme === 'light' ? '#111' : '#fff', marginTop: '100px'}}>
                <h2 style={{margin: 0}}>Top headlines</h2>
                <p style={{margin: 0}}>{this.capitalizeFirstLetter(this.props.category)} Feeds</p>
                <p style={{margin: 0}}>Total results {this.state.totalResults}</p>
            </div>
            {this.state.loading && <Loader theme={this.props.theme}/>}
            <InfiniteScroll style={{overflowY: 'hidden'}}
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Loader theme={this.props.theme}/>}>
                    <div className='d-flex justify-content-between flex-wrap my-3 bordered-pink'>
                        {this.state.articles.map((article, id) => {
                            return <Newsitem title={article.title} 
                            description={article.description}
                            newsUrl={article.url}
                            publishedAt={article.publishedAt} 
                            imgUrl={article.urlToImage ? article.urlToImage : 'https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png'} 
                            key={id}
                            loading={this.state.loading} /> 
                        })}
                        
                    </div>
            </InfiniteScroll>
        </div>
        )
    }
}

export default News