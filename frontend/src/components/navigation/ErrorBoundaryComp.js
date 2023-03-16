import React from 'react'
import PropTypes from 'prop-types'
import ButtonLayout from '../layout/ButtonLayout'
import { withRouter } from 'react-router-dom'
import {
  Grid,
} from '@material-ui/core'

import '../../style/keyFigure.css'

const ErrorBoundaryComp = ({ history }) => {

  const reload = () => {
    history.push('/')
    window.location.reload()
  }

  return (

    <div role="alert">
      <Grid container justify='center' spacing={3} style={{ marginTop: '10vh' }}>
        <img src='/image/error.png' alt='error' />
      </Grid>
      <Grid container justify='center' spacing={3} >
        <ButtonLayout onClick={() => reload()} >Retourner à la page d'accueil</ButtonLayout>
      </Grid>
    </div>
  )
}


ErrorBoundaryComp.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default withRouter(ErrorBoundaryComp)