import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import {
  CssBaseline,
  Typography,
  Container,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

import { AuthContext } from '../../Context/AuthContext'
import AuthService from '../../Services/AuthService'
import MessageError from '../MessageError'
import ItineraryInput from '../layout/ItineraryInput'
import ButtonLayout from '../layout/ButtonLayout'

import '../../index.css'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      margin: 10
    },
  }
}))

const ItineraryForm = ({ history }) => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const user = authContext.user

  const [message, setMessage] = useState(null)

  const [start, setStart] = useState('')
  const [arrival, setArrival] = useState('')

  const handleStart = async value => {
    await setStart(value)
  }

  const handleArrival = async value => {
    await setArrival(value)
  }

  const handleSubmit = async () => {
    try {
      const itinerary = { start, arrival }
      const res = await AuthService.requestResult(itinerary)
      const coordinatesData = JSON.stringify(res.data.coordinates)
      localStorage.setItem('coordinates', coordinatesData)
      history.push('/choix-itineraire')
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  if (!user.vehicle) {
    return (
      <Grid className={classes.alert} item xs={12}>
        <Alert variant="filled" severity="warning">
          Vous devez rentrer un véhicule ou un type de carburant pour pouvoir soumettre des évaluations.
          <ButtonLayout type='button' link='/ajout-vehicule'>
            Rentrez un véhicule ou un type de carburant
          </ButtonLayout>
        </Alert>
      </Grid>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h2" variant="h5">
         Entrez un itinéraire
        </Typography>
        <Form 
          className={classes.form} 
          onSubmit={handleSubmit}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <ItineraryInput
                handleSelect={handleStart}
                address={start}
                setAddress={setStart}
                placeholder='Entrez votre adresse complète de départ'
                label='Adresse de départ'
              />
              <ItineraryInput
                handleSelect={handleArrival}
                address={arrival}
                setAddress={setArrival}
                placeholder='Entrez votre adresse complète de destination'
                label='Adresse de destination'
              />
              <ButtonLayout type='submit'>
                  Suivant
              </ButtonLayout>
            </form>
          )}
        </Form>
        {message ? <MessageError message={message} /> : null}
      </div>
    </Container>
  )
}

ItineraryForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  handleSubmit: PropTypes.func
}

export default ItineraryForm