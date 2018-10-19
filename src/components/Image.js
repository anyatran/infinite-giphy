import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { throttle } from 'underscore'

/**
 * Creates a new Image.
 * @class
 */
class Image extends React.Component {
  constructor(props) {
    super(props)
    this.img = React.createRef()
    this.state = {
      hidden: true
    }
  }

  componentDidMount() {
    this._fadeIn()
    window.addEventListener('scroll', this._fadeIn)
    window.addEventListener('resize', this._fadeIn)
  }

  /**
   * show images when 1/4 of it is becoming visible in viewport
   * @private
   */
  _fadeIn = throttle(() => {
    const top = this.img.current.offsetTop
    const height = this.img.current.offsetHeight
    if ((window.pageYOffset + window.innerHeight - height / 4) > top && (top + height) > window.pageYOffset) {
      this.setState({ hidden: false })
      window.removeEventListener('scroll', this._fadeIn)
      window.removeEventListener('resize', this._fadeIn)
    }
  }, 500)

  componentWillUnmount() {
    window.removeEventListener('scroll', this._fadeIn)
    window.removeEventListener('resize', this._fadeIn)
  }

  render() {
    const { imageObj } = this.props
    const srcSet = `${imageObj.images['fixed_width'].url} ${Math.round(imageObj.images['fixed_width'].width * window.devicePixelRatio)}w, ${imageObj.images['original'].url} ${Math.round(imageObj.images['original'].width * window.devicePixelRatio)}w`
    const className = classNames('image', this.state.hidden && 'is-hidden')
    return (
      <img ref={this.img} srcSet={srcSet} className={className} src={imageObj.images['fixed_width'].url} />
    )
  }
}

Image.propTypes = {
  imageObj: PropTypes.object.isRequired
}

export default Image
