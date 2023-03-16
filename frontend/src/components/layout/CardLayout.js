import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia
} from '@material-ui/core'

import '../../style/keyFigure.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 370,
    minHeight: 550,
    [theme.breakpoints.down('sm')]: {
      minWidth: 370,
    },
  },
  media: {
    height: 150,
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  }
}))


const CardLayout = (props) => {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={12} md={3} className={classes.item}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{ color: '#35a373',  fontWeight: 'bold'}}>
            {props.title}
          </Typography>
          {props.children}
        </CardContent>
      </Card>
    </Grid>
  )
}

CardLayout.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  children: PropTypes.element
}

export default CardLayout
