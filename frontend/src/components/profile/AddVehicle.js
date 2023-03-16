import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import FuelTypeForm from './FuelTypeForm'
import VehicleRegistrationForm from './VehicleRegistrationForm'
import ButtonLayout from '../layout/ButtonLayout'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    color: 'red'
  }
}))

const AddVehicle = () => {
  const classes = useStyles()
  const [fuel, setFuel] = useState(false)

  const displayFuelForm = () => {
    setFuel(true)
  }

  const displayRegistrationForm = () => {
    setFuel(false)
  }


  const choiseForm = () => {
    if (fuel) {
      return (
        <>
          <Grid item xs={12}>
            <FuelTypeForm />
          </Grid>
          <Grid item xs={4}>
            <ButtonLayout type='button' onClick={displayRegistrationForm} className={classes.button}>
              Je préfère rentrer mon immatriculation
            </ButtonLayout>
          </Grid>
        </>
      )

              
    }
    return (
      <Grid item>
        <VehicleRegistrationForm />
        <ButtonLayout type='button' onClick={displayFuelForm}>
          Je préfère rentrer un type de carburant
        </ButtonLayout>
      </Grid>
    )
  }
  return (
    <Grid container className={classes.container}>
      {choiseForm()}
    </Grid>
  )
}

export default AddVehicle