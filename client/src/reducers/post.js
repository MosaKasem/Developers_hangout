import {
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES
} from '../actions/types'

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post._id === payload.id) { // if it's a match, update the post likes
            return {
              ...post, likes: payload.likes
            }
          } else { // else do nothing, just return the post
            return post
          }
        })
      }
    default:
      return state
  }
}
