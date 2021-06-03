import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { getSessionToken } from './helpers'

const PrivateRoute = ({ component: Component, ...routeParams }) => {
  return (
    <Route
      {...routeParams}
      render={(props) => {
        if (getSessionToken()) {
          return <Component {...props} />
        }

        window.location = '/login'
      }}
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
}

export default PrivateRoute
