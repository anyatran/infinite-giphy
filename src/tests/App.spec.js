import React from 'react'
import { mount } from 'enzyme'
import App from '../components/App'

describe('<App />', () => {
  it('should render App', () => {
    const wrapper = mount(<App />)
    expect(wrapper.find('.list').length).toEqual(1)
  })
})
