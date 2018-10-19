import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import Image from '../components/Image'

const imageObj = {
  images: {
    fixed_width: {
      url: 'url1',
      width: 400
    },
    original: {
      url: 'url2',
      width: 800
    }
  }
}

describe('<Image />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<Image imageObj={imageObj} />)
  })

  it('renders Image', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('img').hasClass('image')).toBe(true)
    expect(wrapper.find('img').hasClass('is-hidden')).toBe(true)
    expect(wrapper.find('img').prop('src')).toEqual(imageObj.images.fixed_width.url)
  })

  it('allows us to set props', () => {
    expect(wrapper.props().imageObj).toEqual(imageObj)
  })

  it('shows the image', () => {
    wrapper.setState({ hidden: false })
    expect(wrapper.find('img').hasClass('is-hidden')).toBe(false)
  })
})
