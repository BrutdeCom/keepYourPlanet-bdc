import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import {
  Paper,
  Button,
  Typography
} from '@material-ui/core'

import { AuthContext } from '../../Context/AuthContext'
import '../../index.css'

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 10px',
  },
  buttonResult: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '7%'
  },
  button: {
    minWidth: '150px',
    marginBottom: '1vh',
    marginTop: '1vh',
    backgroundColor: '#35a373',
    '&:hover': {
      color: 'black',
    },
  },
}))

const ChoiseTrajet = (props) => {

  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const itineraryIndex = authContext.itineraryIndex
  const setItineraryIndex = authContext.setItineraryIndex
  const setFinalItinerary = authContext.setFinalItinerary
  const { dataRoute, dataIndex } = props

  useEffect(() => {
    if (dataIndex === 0) {
      setFinalItinerary(dataRoute.legs[0])
    }
  }, [setFinalItinerary, dataRoute, dataIndex])

  const handleClick = () => {
    setItineraryIndex(dataIndex)
    setFinalItinerary(dataRoute.legs[0])
  }

  return (

    <div key={dataIndex} className={classes.container}>
      <Paper className={classes.paper} variant="outlined" square>
        <Typography>{dataRoute.summary} / {dataRoute.legs[0].distance.text}</Typography><br />
        <>{dataRoute.legs[0].duration.text}</>

        <Button
          variant='outlined'
          className={classes.button}
          onClick={() => handleClick()}>
          {itineraryIndex === dataIndex && <CheckCircleOutlineOutlinedIcon className={classes.buttonResult} fontSize="large" />}
            Choisir cet itinéraire
        </Button>
      </Paper>
    </div>
  )
}

ChoiseTrajet.propTypes = {
  dataRoute: PropTypes.object,
  dataIndex: PropTypes.number
}

export default ChoiseTrajet
