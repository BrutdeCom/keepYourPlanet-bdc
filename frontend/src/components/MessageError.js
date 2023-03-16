import React from 'react'
import { Alert } from '@material-ui/lab'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '3vh'
  },
}))

const MessageError = props => {
  const classes = useStyles()
  return (
    <Grid container className={classes.container}>
      <Alert variant="filled" severity="error">
        {props.message}
      </Alert>
    </Grid>
  )
}

MessageError.propTypes = {
  message: PropTypes.string
}

export default MessageError