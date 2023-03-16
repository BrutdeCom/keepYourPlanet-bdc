import React, { useContext } from 'react'
import { Button, Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AuthContext } from '../Context/AuthContext'

const useStyles = makeStyles((theme) => ({
  headband: {
    backgroundColor: '#35a373',
    padding: theme.spacing(12),
    marginTop: '8vh',
  },
  button: {
    color: '#35a373',
    backgroundColor: 'white',
    fontStyle: 'bold',
    fontSize: '1.8vh',
    '&:hover': {
      color: 'white',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    textAlign: 'center',
    paddingBottom: '2vh',
    fontSize: '3vh',
  }
}))
  

const HeadBand = () => {
  const classes = useStyles()
  const authContext = useContext(AuthContext)
  return (
    <div className={classes.headband}>
      <Container className={classes.container} maxWidth="sm">
        <Typography className={classes.text}>Commencer à calculer mon impact</Typography>
        {authContext.isAuthenticated === false ?
          <Button href='/inscription' className={classes.button}>S'inscrire</Button> :
          <Button href='/itineraire' className={classes.button}>Ajouter une évaluation</Button> }
      </Container>
    </div>
  )
}

export default HeadBand