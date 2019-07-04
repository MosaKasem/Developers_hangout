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
      {console.log(repos)}
      { repos === null ? (<Spinner />) : (
      repos.map(repo => (
        <div key={repo._id} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className='badge badge-light'>
                  Language: {repo.language}
              </li>
            </ul>
          </div>
        </div>
      ))
    )}
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
