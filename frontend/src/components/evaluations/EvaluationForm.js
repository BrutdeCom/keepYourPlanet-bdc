import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'

import AuthService from '../../Services/AuthService'
import { AuthContext } from '../../Context/AuthContext'
import MapComponent from './MapComponent'
import MessageError from '../MessageError'

const useStyles = makeStyles(() => ({
  button: {
    backgroundColor: '#35a373',
    '&:hover': {
      color: 'black',
    },
    marginTop: '3vh'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const EvaluationForm = ({ history }) => {

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const user = authContext.user
  const finalItinerary = authContext.finalItinerary
  const [message, setMessage] = useState(null)

  const handleClick = async () => {
    const evaluation = {
      start: finalItinerary.start_address,
      arrival: finalItinerary.end_address,
      carburant: user.vehicle.carburant,
      emission: user.vehicle.emission,
      distance: finalItinerary.distance.value,
      yearDate: moment().format('YYYY'),
      dayDate: moment().format('DD'),
      monthDate: moment().format('MM'),
      dateEvaluation: moment().format('DD-MM-YYYY')
    }
    try {
      const res = await AuthService.addEvaluation(evaluation)
      const evaluationId = res.data.evaluation._id
      localStorage.setItem('currentEvaluationId', evaluationId)
      history.push('/evaluation')
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <>
      <MapComponent />
      <Container className={classes.container}>
        <Button
          variant='contained'
          className={classes.button}
          onClick={() => handleClick()}>
          Valider l'évaluation
        </Button>
      </Container>
      {message ? <MessageError message={message} /> : null}
    </>
  )
}

EvaluationForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default EvaluationForm