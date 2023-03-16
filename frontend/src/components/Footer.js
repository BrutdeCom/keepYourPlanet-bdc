import React from 'react'
import { Typography, Link, Container, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
    position: 'sticky'
  },
  footer: {
    backgroundColor: '#35a373',
    padding: theme.spacing(4),
    marginTop: 'auto',
  },
  title: {
    color: 'white'
  },
  subtitle: {
    color: 'black',
    '&:hover': {
      color: 'white',
    },
  }
}))


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="">
        KeepYourPlanet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography className={classes.title} variant="h6" align="center" gutterBottom>
            Made with ❤️ by <a target={'_blank'} href="https://brutdecom.fr/">Brut2Com</a>
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            <Link className={classes.subtitle} href='/politique-de-confidentialite'>
            Politique de confidentialité
            </Link>
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  )
}

export default Footer