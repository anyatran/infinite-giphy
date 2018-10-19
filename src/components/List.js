import axios from 'axios'
import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import Loader from './Loader'
import { throttle } from 'underscore'

/**
 * Creates a new List.
 * @class
 */
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      error: '',
      hasMore: true,
      isLoading: false,
      limit: 25,
      offset: 0,
      query: this.props.query
    }
  }

  async componentDidMount() {
    await this._loadImages()
    window.addEventListener('scroll', this._onScroll)
  }

  /**
   * Get images from Giphy API
   * @async
   * @private
   */
  async _loadImages() {
    if (this.state.hasMore && this.state.query) {
      this.setState({ isLoading: true })
      const { data, limit, query, offset } = this.state
      try {
        const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
          params: {
            api_key: process.env.GIPHY_KEY,
            limit: limit,
            offset: offset * limit,
            q: query,
          }
        })

        const newState = {
          data: [...data, ...response.data.data],
          isLoading: false,
          offset: offset + 1
        }

        // if there are no more images to fetch
        if (response.data.pagination.count + response.data.pagination.offset === response.data.pagination.total_count) {
          newState.hasMore = false
        }
        setTimeout(() => this.setState(newState), 1000)
      } catch(err) {
        console.log(err, typeof err)
        this.setState({ error: err.message, isLoading: false })
      }
    }
  }

  /**
   * scroll event handler
   * if almost hit the bottom of the page - load more images
   * @private
   */
  _onScroll = throttle(() => {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight - window.innerHeight * 1.5) {
      this._loadImages()
    }
  }, 1000)

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
  }

  render() {
    const { data, isLoading, error, hasMore } = this.state
    return (
      <div className="list">
        <div className="list__row">
          { data.map((imageObj, index) => <Image key={index} imageObj={imageObj} />) }
        </div>
        { isLoading && <div className="list__message"><Loader /></div> }
        { error && <div className="list__message">{error}</div> }
        { !hasMore && <div className="list__message">there are no more images</div> }
      </div>
    )
  }
}

List.propTypes = {
  query: PropTypes.string
}

export default List
