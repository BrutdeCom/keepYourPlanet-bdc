import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  loader: {
    margin: '0 auto'
  },
}))

const LoaderLayout = () => {
  const classes = useStyles()
  return (
    <Grid item xs={4} className={classes.loader}>
      <img src='/image/loader.gif' alt='loader' />
    </Grid>
  )
}

export default LoaderLayout