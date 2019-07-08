import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    text: ''
  })
  let green = ''

  const {
      text
  } = formData

  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })

  if (text && text.length >= 200) {
    green = 'green'
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Share your post, thoughts, question or idea..</h3>
      </div>
      <p className={`custom-counter ${green}`} >{text.length} characters {' '}
        {green ? (
          <i className='fas fa-comments' />
      ) : (
        <i className='fas fa-comment-slash' />
      )}
      </p>

      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault()
          addPost({text})
          if (text.length >= 200) {
            setFormData({
              text: ''
            })
          }
        }}
        >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='200 characters atleast to create a post!'
          value={text}
          onChange={e => onChange(e)}
       />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm)
