import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGitHub from './ProfileGitHub'
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
    <Fragment>
      { profile === null || loading ? (<Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>Back to profile</Link>
          { auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id &&
            (
            <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
            </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <div>
                <h2 className='text-primary'>Experience</h2>
                { profile.experience.length > 0 ? (
                  <Fragment>
                    { profile.experience.map(experience => (
                      <ProfileExperience key={experience._id} experience={experience} />
                      )) }
                  </Fragment>
                ) : (
                  <h4> No experience credentials yet </h4>) }
                <p>Oct 2011 - Current</p>
                <p><strong>Position: </strong>Senior Developer</p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
              </div>
            </div>

            <div className='profile-edu bg-white p-2'>
              <div>
                <h2 className='text-primary'>Education</h2>
                { profile.education.length > 0 ? (
                  <Fragment>
                    { profile.education.map(education => (
                      <ProfileEducation key={education._id} education={education} />
                      )) }
                  </Fragment>
                ) : (
                  <h4> No education credentials yet </h4>) }
                <p>Oct 2011 - Current</p>
                <p><strong>Position: </strong>Senior Developer</p>
                <p>
                  <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
              </div>
            </div>

            {
                profile.githubusername && <ProfileGitHub username={profile.githubusername} />
            }

          </div>
        </Fragment>
        )}
    </Fragment>
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
