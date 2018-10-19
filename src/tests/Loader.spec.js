import React from 'react'
import { shallow } from 'enzyme'
import Loader from '../components/Loader'

describe('<Loader />', () => {
  it('should render Loader', () => {
    const wrapper = shallow(<Loader />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.loader__dot').length).toEqual(8)
  })
})
