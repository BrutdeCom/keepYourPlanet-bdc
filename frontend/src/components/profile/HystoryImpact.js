import React, { useContext } from 'react'

import { AuthContext } from '../../Context/AuthContext'

const HystoryImpact = () => {

  const authContext = useContext(AuthContext)
  const user = authContext.user

  return (
    <>
      {JSON.stringify(user)}
    </>
  )
}

export default HystoryImpact