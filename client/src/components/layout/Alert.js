import React, { useRef, useCallback, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spring } from 'react-spring/renderprops'
import { useTransition, animated } from 'react-spring'
import MessageHub from './MessageHub'
import { GlobalStyle, Main } from './styles'

const Alert = ({ alerts }) => {
  const ref = useRef(null)
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <Main>
        {() => ref.current(alert.message)()}
        <MessageHub children={add => (ref.current = add)} key={alert.id} className={`alert alert-${alert.alertType}`} >
          {console.log(alert)}
        </MessageHub>
      </Main>
    ))

/*     <Spring from={{opacity: 0, marginTop: -5000}} to={{opacity: 1, marginTop: 0}}>
      {props => (
        <div style={props}>
          {alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`}>
              {alert.message}
            </div>
          ))}
        </div>
        )}
    </Spring> */
/*     alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert =>
      <div key={alert.id}>
        {alert.message}
      </div>
    ) */
  )
}

Alert.prototype = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)

/* import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({alerts}) =>
alerts !== null &&
alerts.length > 0 &&
alerts.map(alert => (
  <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.message }
  </div>
))

Alert.prototype = {
  alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert)
 */
