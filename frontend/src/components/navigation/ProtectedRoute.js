import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => (
        authContext.isAuthenticated ?
          <Component {...props} /> :
          <Redirect to='/' />
      )} 
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func
}

export default ProtectedRoute