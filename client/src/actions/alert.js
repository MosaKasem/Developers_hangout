import { SET_ALERT, REMOVE_ALERT } from './types'
import uuid from 'uuid'

export const setAlert = (message, alertType, timeout = 90009) => dispatch => {
  const id = uuid.v4()
  dispatch({
    type: SET_ALERT,
    payload: {
      message, alertType, id
    }
  })
  setTimeout(() => dispatch({
    type: REMOVE_ALERT, payload: id
  }), timeout)
}
