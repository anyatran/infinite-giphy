import React from 'react'
import axios from 'axios'
import { mount } from 'enzyme'
import List from '../components/List'

jest.mock('axios')

describe('<List />', () => {
  let wrapper
  const mockResponse = {
    data: {
      data: [
        {
          images: {
            fixed_width: { url: 'url1', width: 400 },
            original: { url: 'url2', width: 800 }
          }
        },
        {
          images: {
            fixed_width: { url: 'url3', width: 400 },
            original: { url: 'url4', width: 800 }
          }
        }
      ],
      pagination: {
        count: 2,
        offset: 0,
        total_count: 10
      }
    }
  }
  axios.get.mockResolvedValue(mockResponse)
  beforeEach(() => {
    wrapper = mount(<List query='test' />)
  })

  it('should render List', () => {
    expect(wrapper).toMatchSnapshot()
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.list__message').length).toEqual(1)
    expect(wrapper.find('.list__message').find('.loader').length).toEqual(1)
  })

  it('should render images', async () => {
    wrapper.setState({ data: mockResponse.data.data, isLoading: false })
    expect(wrapper.find('.list__message').length).toEqual(0)
    expect(wrapper.find('.image').length).toEqual(2)
  })

  it('should render error message', () => {
    const error = 'An errror occured'
    wrapper.setState({ error, isLoading: false })
    expect(wrapper.find('.list__message').length).toEqual(1)
    expect(wrapper.find('.list__message').text()).toEqual(error)
  })

  it('should render done message', () => {
    wrapper.setState({ hasMore: false, error: '', isLoading: false })
    expect(wrapper.find('.list__message').length).toEqual(1)
    expect(wrapper.find('.list__message').text()).toEqual('there are no more images')
  })
})
