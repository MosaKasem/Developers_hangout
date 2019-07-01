import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const times = 3
const Button = styled.button`
background: #e54b4b;
border-radius: 5px;
border: none;
color: white;
font-size: 1.5rem;
margin-top: 1rem;
text-transform: uppercase;
font-weight: 400;
box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
${({ level }) => {
  if (level === 1) {
    return `
    transform: scale(1.1);
    background: #B93C3C;
  `
  }
  if (level === 2) {
    return `
    background: #9B1E1E;
  `
  }
}};
`

const ConfirmButton = ({dialog, action}) => {
  const [formData, setFormData] = useState({
    timesPressed: 0
  })

  const { timesPressed } = formData

  if (timesPressed === times) {
    action()
    setFormData({ timesPressed: 0 })
  }

  return (
    <Button level={timesPressed} onClick={() => setFormData({timesPressed: timesPressed + 1})}>
      {dialog[timesPressed]}
    </Button>
  )
}

ConfirmButton.propTypes = {
  action: PropTypes.func.isRequired
}

export default connect(null)(ConfirmButton)
