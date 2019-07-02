import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileByID } from '../../actions/profile'

const Profile = ({
        match,
        getProfileByID,
        profile: { profile, loading },
        auth }) => {
  useEffect(() => {
    getProfileByID(match.params.id)
  }, [getProfileByID, match.params.id])
  return (
    <div />
  )
}

Profile.propTypes = {
  getProfileByID: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileByID })(Profile)
