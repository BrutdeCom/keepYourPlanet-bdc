import React, { useEffect, useState, useContext } from 'react'
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps'
import ChoiseTrajet from './ChoiseTrajet'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@material-ui/lab'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import RoomIcon from '@material-ui/icons/Room'
import { makeStyles } from '@material-ui/core/styles'

import { AuthContext } from '../../Context/AuthContext'
import DividerLayout from '../layout/DividerLayout'

const useStyles = makeStyles(() => ({
  direction: {
    width: '100%',

  },
  grid: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  title: {
    textAlign: 'center',
    marginTop: '3vh',
    marginBottom: '3vh'
  },
  container: {
    marginTop: '7vh',
    backgroundColor: '#35a373'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '100%'
  },
  separator: {
    maxWidth: '900px',
    maxHeight: '2px',
    marginTop: '1.9%',
    marginRight: '1%',
    marginLeft: '1%'
  },
  paper: {
    padding: '6px 16px',
  },
  subtitle: {
    fontWeight: 'bold'
  },
  left: {
    marginLeft: '0'
  },
  right: {
    marginRight: '0',
    flexDirection: 'row-reverse'
  }
}))

const MapComponent = () => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  const [directions, setDirections] = useState(null)

  const coordinates = JSON.parse(localStorage.getItem('coordinates'))

  useEffect(() => {
    async function fetchData() {
      const directionsService = new window.google.maps.DirectionsService()
      const origin = new window.google.maps.LatLng(coordinates.startLocation.lat, coordinates.startLocation.lng)
      const destination = new window.google.maps.LatLng(coordinates.endLocation.lat, coordinates.endLocation.lng)

      await directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result)
          } else {
            console.error(`error fetching directions ${result}`)
          }
        }
      )
    }
    fetchData()

  }, [coordinates.startLocation.lat, coordinates.startLocation.lng, coordinates.endLocation.lat, coordinates.endLocation.lng])

  const GoogleMapExample = withGoogleMap(() => (
    <GoogleMap

      defaultCenter={{ lat: coordinates.startLocation.lat, lng: coordinates.startLocation.lng }}
      defaultZoom={13}
    > {directions &&
      <DirectionsRenderer
        directions={directions}
        defaultRouteIndex={authContext.itineraryIndex}
      />}
    </GoogleMap>
  ))

  return (
    <>
      <Typography className={classes.title} gutterBottom variant="h4" component="h2">
        Choisissez l'itinéraire emprunté
      </Typography>
      <DividerLayout />
      <Grid container className={classes.container}>
        <Grid item xs={12} lg={4}>
          <GoogleMapExample
            containerElement={<div style={{ minHeight: '500px', height: '100%', width: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </Grid>
        <Grid item xs={12} lg={8} className={classes.grid}>

          <Timeline className={classes.timeline}>
            <TimelineItem className={classes.left}>

              <TimelineContent>
                <Paper className={classes.paper} elevation={3}>
                  <Typography className={classes.subtitle}>
                    Départ
                  </Typography>
                  {directions && directions.routes[0].legs[0].start_address}
                </Paper>
              </TimelineContent>

              <TimelineSeparator >
                <TimelineDot>
                  <KeyboardArrowRightIcon />
                </TimelineDot>

              </TimelineSeparator>

            </TimelineItem>
            <TimelineConnector className={classes.separator} />
            <TimelineItem className={classes.right}>


              <TimelineContent>
                <Paper className={classes.paper} elevation={3}>
                  <Typography className={classes.subtitle}>
                    Arrivée
                  </Typography>
                  {directions && directions.routes[0].legs[0].end_address}
                </Paper>
              </TimelineContent>
              <TimelineSeparator>
                <TimelineDot>
                  <RoomIcon />
                </TimelineDot>
              </TimelineSeparator>
            </TimelineItem>
          </Timeline>

          {directions && directions.routes.map((route, index) =>
            <div key={index} className={classes.direction}>
              <ChoiseTrajet dataIndex={index} dataRoute={route} />
            </div>
          )}
        </Grid>
      </Grid>
    </>
  )
}


export default MapComponent