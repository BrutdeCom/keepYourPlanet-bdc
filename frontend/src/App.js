import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'


import Footer from './components/Footer'
import MenuTop from './components/navigation/MenuTop'
import RouterApp from './components/navigation/RouterApp'
import HeaderApp from './components/navigation/HeaderApp'
import './index.css'

const App = () => {
  return (

    <Router>
      <MenuTop />
      <HeaderApp />
      <RouterApp />
      <Footer />
    </Router>

  )
}

export default App
