import React, { useContext } from 'react'
import {
  XAxis, 
  YAxis,
  Tooltip, 
  Legend, 
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'
import { 
  Typography,
  Grid,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../../Context/AuthContext'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
    padding: 25
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
}))

const ChartMonthImpact = () => {

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const globalDatas = authContext.globalUserDatas

  const getDatas = () => {
    const data = [
      {
        name: 'Janvier', Impact: globalDatas.monthImpact.janvier ? globalDatas.monthImpact.janvier : '0'
      },
      {
        name: 'Février', Impact: globalDatas.monthImpact.février ? globalDatas.monthImpact.février : '0'
      },
      {
        name: 'Mars', Impact: globalDatas.monthImpact.mars ? globalDatas.monthImpact.mars : '0'
      },
      {
        name: 'Avril', Impact: globalDatas.monthImpact.avril ? globalDatas.monthImpact.avril : '0'
      },
      {
        name: 'Mai', Impact: globalDatas.monthImpact.mai ? globalDatas.monthImpact.mai : '0'
      },
      {
        name: 'Juin', Impact: globalDatas.monthImpact.juin ? globalDatas.monthImpact.juin : '0'
      },
      {
        name: 'Juillet', Impact: globalDatas.monthImpact.juillet ? globalDatas.monthImpact.juillet : '0'
      },
      {
        name: 'Août', Impact: globalDatas.monthImpact.aout ? globalDatas.monthImpact.aout : '0'
      },
      {
        name: 'Septembre', Impact: globalDatas.monthImpact.septembre ? globalDatas.monthImpact.septembre : '0'
      },
      {
        name: 'Octobre', Impact: globalDatas.monthImpact.octobre ? globalDatas.monthImpact.octobre : '0'
      },
      {
        name: 'Novembre', Impact: globalDatas.monthImpact.novembre ? globalDatas.monthImpact.novembre : '0'
      },
      {
        name: 'Décembre', Impact: globalDatas.monthImpact.décembre ? globalDatas.monthImpact.décembre : '0'
      },
    ]
    return data
  }

  return (
    <>
      {globalDatas ?
        <>
          <Typography gutterBottom className={classes.title} variant="h5" component="h2">
          Mon impact par mois
          </Typography>
          <ResponsiveContainer width='90%' height={400}>
            <BarChart
              data={getDatas()}
              margin={{
                top: 30, right: 30, left: 30, bottom: 5,
              }}
              barSize={40}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar name='Impact kg/CO2' dataKey="Impact" stroke="#8884d8" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </> :
        <Grid className={classes.paper} item xs={12}>
          <Alert variant='filled' severity='warning'>
          Aucun impact pour le moment
          </Alert>
        </Grid>
      }
    </>
  )
}

export default ChartMonthImpact