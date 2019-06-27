import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'

const DashBoard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile()
  }, []) // eslint-disable-line

  return (
    loading && profile === null ? <Spinner /> : <Fragment>
      <h1 className='large text-primary'>DashBoard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome { user && user.name } </p>
      { profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
        </Fragment>
      ) : (
        <Fragment>
          <p>Current user does not have a profile setup</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
          Create Profile
          </Link>
        </Fragment>
      )
    }
    </Fragment>
  )
}

DashBoard.prototype = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard)
