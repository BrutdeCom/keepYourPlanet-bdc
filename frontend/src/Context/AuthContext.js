import React, { createContext, useState, useEffect } from 'react'
import AuthService from '../Services/AuthService'
import PropTypes from 'prop-types'

import LoaderLayout from '../components/layout/LoaderLayout'

export const AuthContext = createContext()

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [itineraryIndex, setItineraryIndex] = useState(0)
  const [finalItinerary, setFinalItinerary] = useState(null)
  const [currentEvaluation, setCurrentEvaluation] = useState(null)
  const [globalUserDatas, setGlobalUserDatas] = useState(null)
  const [results, setResults] = useState(null)

  useEffect(() => {
    try {
      AuthService.isAuthenticated().then(res => {
        const { user, isAuthenticated } = res.data
        setUser(user)
        setIsAuthenticated(isAuthenticated)
        setIsLoaded(true)
      })
    } catch (error) {
      throw error
    }
  }, [])

  return (
    <div>
      {!isLoaded ? <LoaderLayout /> :
        <AuthContext.Provider value={{ 
          user, 
          setUser, 
          isAuthenticated, 
          setIsAuthenticated, 
          isLoaded, 
          setIsLoaded, 
          itineraryIndex, 
          setItineraryIndex, 
          finalItinerary, 
          setFinalItinerary,
          currentEvaluation, 
          setCurrentEvaluation,
          globalUserDatas,
          setGlobalUserDatas,
          results,
          setResults
        }}>
          {children}
        </AuthContext.Provider>
      }
    </div>
  )
}

AuthContext.propTypes = {
  children: PropTypes.object
}
