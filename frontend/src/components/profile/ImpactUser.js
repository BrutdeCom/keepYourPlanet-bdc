import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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

import ProgessBar from '../layout/ProgressBar'
import { AuthContext } from '../../Context/AuthContext'
import '../../style/profile.css'

const useStyles = makeStyles((theme) => ({
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
    paddingTop: 25,
    paddingBottom: 50,
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
  title: {
    textAlign: 'center',
    padding: 25
  },
}))


const ImpactUser = () => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const globalDatas = authContext.globalUserDatas

  const totalKm = () => {
    let totalKmValue = 0
    if (!globalDatas.totalNumberKm) {
      return totalKmValue
    } else {
      totalKmValue = globalDatas.totalNumberKm
      return totalKmValue

    }
  }

  const totalImpact = () => {
    let totalImpactValue = 0
    if (globalDatas.totalImpact) {
      totalImpactValue = globalDatas.totalImpact
      return totalImpactValue
    }
    return totalImpactValue
  }

  const totalImpactPercent = () => {
    let totalImpactPercentValue = 0
    if (globalDatas.totalImpact) {
      totalImpactPercentValue = (globalDatas.totalImpact / 2000) * 100
      return totalImpactPercentValue
    }
    return totalImpactPercentValue
  }

  const treeToPlant = () => {
    let treeToPlantValue = 0
    if (globalDatas.totalTreeToPlants) {
      treeToPlantValue = globalDatas.totalTreeToPlants
      return treeToPlantValue
    }
    return treeToPlantValue
  }

  const numberTel = () => {
    let numberTelValue = 0
    if (globalDatas.totalNumberTel) {
      numberTelValue = globalDatas.totalNumberTel
      return numberTelValue
    }
    return numberTelValue
  }

  return (
    <>
      {globalDatas ?
        <>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} lg={4}>
              <Paper className={classes.paper}>
                <NatureIcon className={classes.icon} />
                <Typography gutterBottom variant="h5" component="h2">
                EN ARBRES PLANTÉS :
                </Typography>
                <Typography className={classes.number}>
                  {treeToPlant()}
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
                  {numberTel()}
                </Typography>
              </Paper>
            </Grid>
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
              <EcoIcon className={classes.icon} />
              <Typography gutterBottom variant="h5" component="h2">
              Masse CO2 émise :
              </Typography>
              <Typography className={classes.number}>

                {totalImpact()} Kg

              </Typography>
              {globalDatas.totalImpact > 2000 ? <Grid className={classes.paper} item xs={12}>  <Alert variant="filled" severity="warning">Le quota maximal est dépassé ! </Alert></Grid> : null}
              <ProgessBar value={totalImpactPercent()} />
              <Typography>
              Si vous souhaitez avoir une neutralité carbone il est recommandé de ne pas dépasser 2000kg de CO2 par an et par personne.
              </Typography>
            </Grid>
          </Grid>
        </> :
        <Grid className={classes.paper} item xs={12}>
          <Alert variant='filled' severity='warning'>
            Aucun impact pour le moment
          </Alert>
        </Grid>}
    </>
  )
}

export default ImpactUser