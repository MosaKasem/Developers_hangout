/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGitHubRepo } from '../../actions/profile'
import Spinner from '../layout/Spinner'

const ProfileGitHub = ({ username, getGitHubRepo, repos }) => {
  useEffect(() => {
    getGitHubRepo(username)
  }, [getGitHubRepo])

  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>GIthub Repos</h2>
      { repos === null ? <Spinner /> : repos.map(repo => {
        return <div key={repo._id} className='repo bg-white p-1 my-1'>
          <h4>
            <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
              {repo.name}
            </a>
          </h4>
        </div>
      })}
    </div>
  )
}

ProfileGitHub.propTypes = {
  getGitHubRepo: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGitHubRepo })(ProfileGitHub)
