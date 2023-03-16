import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import {
  Typography,
  Container,
  Select,
  InputLabel,
  MenuItem,
  Input,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import AuthService from '../../Services/AuthService'
import MessageError from '../MessageError'
import ButtonLayout from '../layout/ButtonLayout'
import ModalLayout from '../layout/ModalLayout'

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
  title: {
    textAlign: 'center',
    paddingBottom: '3vh'
  },
  select: {
    marginBottom: '2vh',
  },
  alert: {
    marginBottom: '2vh'
  },
}))

const FuelTypeForm = () => {

  const classes = useStyles()

  const [message, setMessage] = useState(null)
  const [fuelType, setFuelType] = useState('Diesel')
  const [yearVehicle, setYearVehicle] = useState('1995')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }


  const handleSubmit = async () => {
    const vehicleDatas = { fuelType, yearVehicle }
    try {
      const res = await AuthService.addFuelType(vehicleDatas)
      if(res) {
        handleOpen()
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const handleChangeFuelType = (event) => {
    setFuelType(event.target.value)
  }

  const handleChangeYear = (event) => {
    setYearVehicle(event.target.value)
  }

  const year = [
    1995,
    1996,
    1997,
    1998,
    1999,
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
  ]

  const fuel = [
    'Diesel',
    'Essence'
  ]

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h2" variant="h5" className={classes.title}>
            Choisissez un type de carburant et une année pour votre véhicule
          </Typography>
          <Alert variant="filled" severity="warning" className={classes.alert}>
            ATTENTION ! Si vous choisissez de rentrer un type de carburant plutôt qu'un véhicule, les résultats d'évaluations d'impact seront beaucoup moins précis.
          </Alert>
          <Form 
            className={classes.form} 
            onSubmit={handleSubmit}
          >
            {props => (
              <form onSubmit={props.handleSubmit}>
                <InputLabel htmlFor="fuel-type">Type de carburant</InputLabel>
                <Select
                  value={fuelType}
                  className={classes.select}
                  fullWidth
                  onChange={handleChangeFuelType}
                  input={<Input />}
                >
                  {fuel.map((fuel) => (
                    <MenuItem key={fuel} value={fuel}>
                      {fuel}
                    </MenuItem>
                  ))}
                </Select>
                <InputLabel htmlFor="year-vehicle-label">Année du véhicule</InputLabel>
                <Select
                  value={yearVehicle}
                  fullWidth
                  id='year-vehicle'
                  labelId='year-vehicle-label'
                  onChange={handleChangeYear}
                  input={<Input />}
                >
                  {year.map((years) => (
                    <MenuItem key={years} value={years}>
                      {years}
                    </MenuItem>
                  ))}
                </Select>
                <ButtonLayout type='submit'>
                  Valider
                </ButtonLayout>
              </form>
            )}
          </Form>
        </div>
      </Container>
      <ModalLayout
        open={open}
        onClose={handleClose}
      >
        <h2 id="transition-modal-title">Véhicule ajouter avec succès !</h2>
        <ButtonLayout type='button' link='/mon-profil'>
          Ok !
        </ButtonLayout>
      </ModalLayout>
      {message ? <MessageError message={message} /> : null}
    </>
  )
}

FuelTypeForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  handleSubmit: PropTypes.func
}

export default FuelTypeForm