import axios from 'axios'
// import { setAlert } from './alert'
import { GET_POST, POST_ERROR, UPDATE_LIKES } from './types'

// GET posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts')
    dispatch({
      type: GET_POST,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// ADD like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`)
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch (error) {
    console.log('Update Like error: ', error)
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

// REMOVE like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    })
  } catch (error) {
    console.log('Remove Like error: ', error)
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}
