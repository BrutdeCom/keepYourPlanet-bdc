import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={props => (
        authContext.user.role !== 'admin' ?
          <Redirect to='/' /> :
          <Component {...props} />
      )}
    />
  )
}

ProtectedAdminRoute.propTypes = {
  component: PropTypes.func
}

export default ProtectedAdminRoute