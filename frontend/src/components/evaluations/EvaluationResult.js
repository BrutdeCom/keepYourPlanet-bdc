import React, { useContext, useEffect, useState, useCallback } from 'react'
import NatureIcon from '@material-ui/icons/NatureOutlined'
import SmartphoneIcon from '@material-ui/icons/SmartphoneOutlined'
import CarIcon from '@material-ui/icons/DirectionsCarOutlined'
import EcoIcon from '@material-ui/icons/EcoOutlined'
import Alert from '@material-ui/lab/Alert'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../../Context/AuthContext'
import AuthService from '../../Services/AuthService'
import DividerLayout from '../layout/DividerLayout'
import MessageError from '../MessageError'
import ButtonLayout from '../layout/ButtonLayout'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    marginTop: '3vh',
    marginBottom: '3vh'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40
  },
  icon: {
    fontSize: 84,
    color: '#35a373'
  },
  paper: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      margin: 10
    },
  },
  number: {
    fontSize: 40,
    fontStyle: 'bold'
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))


const EvaluationResult = () => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const currentEvaluation = authContext.currentEvaluation
  const setCurrentEvaluation = authContext.setCurrentEvaluation
  const [message, setMessage] = useState(null)

  const getCurrentEvaluation = useCallback(async () => {
    try {
      const res = await AuthService.requestCurrentEvaluation(localStorage.getItem('currentEvaluationId'))
      setCurrentEvaluation(res.data.currentEvaluation)
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }, [setCurrentEvaluation])

  useEffect(() => {
    getCurrentEvaluation()
  }, [getCurrentEvaluation])

  const totalKm = () => {
    let totalKmValue = 0
    if (!currentEvaluation.itinerary.numberKm) {
      return totalKmValue
    } else {
      totalKmValue = currentEvaluation.itinerary.numberKm
      return totalKmValue

    }
  }

  const numberTelEquivalent = () => {
    let numberTelValue = 0
    if (!currentEvaluation.equivalents.numberTel) {
      return numberTelValue
    } else {
      numberTelValue = currentEvaluation.equivalents.numberTel
      return numberTelValue

    }
  }

  const treeEquivalent = () => {
    let treeValue = 0
    if (!currentEvaluation.equivalents.treeToPlant) {
      return treeValue
    } else {
      treeValue = currentEvaluation.equivalents.treeToPlant
      return treeValue

    }
  }

  const totalImpact = () => {
    let impactValue = 0
    if (!currentEvaluation.impact) {
      return impactValue
    } else {
      impactValue = currentEvaluation.impact
      return impactValue

    }
  }

  return (
    <>
      <Typography className={classes.title} variant="h4" component="h2">
        Évaluation de votre itinéraire
      </Typography>
      <DividerLayout />
      { currentEvaluation ?
        <Grid container spacing={3} className={classes.container}>
          <Grid className={classes.paper} item xs={12}>
            <CarIcon className={classes.icon} />
            <Typography gutterBottom variant="h5" component="h2">
            NOMBRE DE KM PARCOURUS : 
            </Typography>
            <Typography className={classes.number}>
              {totalKm()} KM
            </Typography>
          </Grid>
          <Grid className={classes.paper} item xs={12}>
            <Typography gutterBottom variant="h5" component="h2">
            Equivalents de votre impact
            </Typography>
            <DividerLayout />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper className={classes.paper}>
              <NatureIcon className={classes.icon} />
              <Typography gutterBottom variant="h5" component="h2">
            EN ARBRES PLANTÉS : 
              </Typography>
              <Typography className={classes.number}>
                {treeEquivalent()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Paper className={classes.paper}>
              <SmartphoneIcon className={classes.icon} />
              <Typography gutterBottom variant="h5" component="h2">
            EN SMARTPHONE FABRIQUÉS : 
              </Typography>
              <Typography className={classes.number}>
                {numberTelEquivalent()}
              </Typography>
            </Paper>
          </Grid>
          <Grid className={classes.paper} item xs={12}>
            <EcoIcon className={classes.icon} />
            <Typography gutterBottom variant="h5" component="h2">
          Masse CO2 émise pour ce trajet : 
            </Typography>
            <Typography className={classes.number}>
              {totalImpact()} Kg
            </Typography>
          </Grid>
          <Grid className={classes.paper} item xs={4}>
            <ButtonLayout type='button' link='/mon-profil'>
              Voir mon profil
            </ButtonLayout>
          </Grid>
        </Grid> : 
        <Grid className={classes.paper} item xs={12}>
          <Alert variant='filled' severity='warning'>
            Aucune donnée pour cette évaluation
          </Alert>
        </Grid> }
      {message ? <MessageError message={message} /> : null}
    </>
  )


}

export default EvaluationResult