import axios from 'axios'
import { setAlert } from './alert'
import { GET_POST, POST_ERROR } from './types'

// GET posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    console.log('error: ', error)
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}