import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../../Context/AuthContext'
import {
  Typography,
  Paper
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
  test: {
    minHeight: '100%',
    padding: 20
  }
}))

const InfosVehicle = () => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const user = authContext.user

  if (!user.vehicle) {
    return (
      <Typography>Aucun véhicule ajouté</Typography>
    )
  }

  let vehicleMake = user.vehicle.marque ? user.vehicle.marque : 'Inconnu'
  let vehicleModel = user.vehicle.model ? user.vehicle.model : 'Inconnu'
  let vehicleYear = user.vehicle.year ? user.vehicle.year : 'Inconnu'
  let vehicleFuel = user.vehicle.carburant ? user.vehicle.carburant : 'Inconnu'
  let vehicleCO2Emission = user.vehicle.emission ? user.vehicle.emission : 'Inconnu'

  return (
    <Paper className={classes.test}>
      <strong>Votre véhicule:</strong><br />
            Marque:     {vehicleMake} <br />
            Modèle: {vehicleModel} <br />
            Année:     {vehicleYear}<br />
            Type de carburant:     {vehicleFuel}<br />
            Emission de C02:     {vehicleCO2Emission}
    </Paper>
  )
}

export default InfosVehicle