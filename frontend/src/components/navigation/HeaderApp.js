import React from 'react'

import '../../style/header.css'

const HeaderApp = () => {

  return (
    <div className='container'>
      <img src='/image/header-image.jpg' alt='keep-your-planet' className='img'/>
      <div className='text-container'>
        <h1 className='title'>Connaissez-vous l'impact environnemental de vos trajets ?</h1>
        <p className='text'>KeepYourPlanet vous permet de le calculer.</p>
      </div>
    </div>
  )
}

export default HeaderApp