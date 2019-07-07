import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post'
import Spinner from '../layout/Spinner'
import PostItem from './PostItem'
import PostForm from './PostForm'

const Post = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])
  return loading ? <Spinner /> : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <li className='fas fa-user'>Welcome</li>
      </p>
      <PostForm />
      <div className='posts'>
        { posts.map(post => (
          <PostItem key={post._id} post={post} />
        )) }
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    post: state.post
  }
}

export default connect(mapStateToProps, { getPosts })(Post)
