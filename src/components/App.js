import React from 'react'
import List from './List'

/**
 * helper function that pulls out random item in a given array
 * @param array
 * @return an item from array
 */
const getRandomItem = (array) => {
  if (array.length > 0) {
    const randomIndex = Math.floor(Math.random() * Math.floor(array.length))
    return array[randomIndex]
  }
  return null
}

const QUERIES = ['space', 'fashion', 'techno', 'magic', 'moon', 'burberry']

/**
 * Creates a new App.
 */
const App = ({ }) => (
  <List query={getRandomItem(QUERIES)} />
)

export default App
