import React from 'react'
import { withRouter } from 'react-router'
import { makeStyles } from '@material-ui/core/styles'

import KeyFigure from './KeyFigure'
import Presentation from './Presentation'
import HeadBand from './HeadBand'

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '100%',
    minWidth: '100%'
  },
}))

const HomePage = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Presentation />
      <HeadBand />
      <KeyFigure />
    </div>
  )
}

export default withRouter(HomePage)