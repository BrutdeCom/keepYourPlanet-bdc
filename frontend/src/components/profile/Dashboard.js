import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  Typography,
  Container,
  Grid,
  Paper,
  Select,
  Input,
  MenuItem
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import moment from 'moment'

import { AuthContext } from '../../Context/AuthContext'
import AuthService from '../../Services/AuthService'
import ImpactUser from './ImpactUser'
import InfosUser from './InfosUser'
import InfosVehicle from './InfosVehicle'
import ButtonLayout from '../layout/ButtonLayout'
import ChartMonthImpact from './ChartMonthImpact'
import ResultsYearTable from './ResultsYearTable'
import DividerLayout from '../layout/DividerLayout'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  alert: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      margin: 10
    },
  },
  title: {
    textAlign: 'center'
  }
}))

const Dashboard = () => {

  const classes = useStyles()

  const authContext = useContext(AuthContext)
  const user = authContext.user
  const setUser = authContext.setUser
  const setGlobalUserDatas = authContext.setGlobalUserDatas
  const setResults = authContext.setResults
  const [yearImpact, setYearImpact] = useState(moment().format('YYYY'))

  useEffect(() => {
    try {
      AuthService.getUser(yearImpact).then(res => {
        const { user, globalDatas, results } = res.data
        setUser(user)
        setGlobalUserDatas(globalDatas)
        setResults(results)
      })
    } catch (error) {
      throw error
    }
  }, [yearImpact, setUser, setGlobalUserDatas, setResults])

  const year = [
    2019,
    2020
  ]

  const handleChangeYear = (event) => {
    setYearImpact(event.target.value)
  }


  const alertForVehicle = () => {
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

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <div />
        {alertForVehicle()}
        <Container maxWidth="lg" className={classes.container}>
          <Typography gutterBottom variant="h3" component="h2">
            Mon profil
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Paper>
                <InfosUser />
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4} >
              <InfosVehicle />
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Typography className={classes.title} variant="h4" component="h2">
                Mon impact pour l'année <br/>
                  <Select
                    value={yearImpact}
                    // fullWidth
                    id='year-impact'
                    labelId='year-impact-label'
                    onChange={handleChangeYear}
                    input={<Input />}
                  >
                    {year.map((years) => (
                      <MenuItem key={years} value={years}>
                        {years}
                      </MenuItem>
                    ))}
                  </Select>
                </Typography>
                <DividerLayout />
                <ImpactUser />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <ChartMonthImpact />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <ResultsYearTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard