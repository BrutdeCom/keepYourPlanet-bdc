import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Grid } from '@material-ui/core'

import DividerLayout from './layout/DividerLayout'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '80%',
    margin: '0 auto',
    marginTop: '5vh',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    },
  },
  containerResp: {
    width: '80%',
    margin: '0 auto',
    marginTop: '5vh',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  img: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    paddingTop: '3vh',
    paddingBottom: '3vh'
  },
  illustration: {
    maxWidth: '95%',
  }
}))

const Presentation = () => {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.title} gutterBottom variant="h4" component="h2">
        Comment calculer mon impact ?
      </Typography>
      <DividerLayout />
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={8} className={classes.text}>
          <Typography variant="h4" component="h2">
            S'inscrire
          </Typography>
          <Typography>
            Pour évaluer l'impact de vos trajets, vous devez d'abord vous inscrire avec votre email, un nom d'utilisateur et un mot de passe.
            Ensuite, vous aurez accès à un formulaire pour rentrer votre véhicule dans votre profil.
            Les données de votre véhicule vont nous permettre de récupérer l'émission de CO2 de ce dernier, pour pouvoir calculer l'impact de vos trajets.
            Vous aurez plusieurs choix, soit rentrer un type de carburant et l'année de votre véhicule, mais ce procédé rend le calcul de l'impact beaucoup moins précis, car nous nous basons sur des moyennes d'émissions.
            Soit rentrer directement votre plaque d'immatriculation ou la marque et le modèle de votre voiture, ce qui nous permet de récupérer une émission de CO2 plus précise,
            et donc d'avoir un calcul d'impact beaucoup plus réaliste.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.img} >
          <img src='/image/login-image.png' alt='login' className={classes.illustration} />
        </Grid>
      </Grid>

      <Grid container className={classes.containerResp}>
        <Grid item xs={12} sm={12} md={4} className={classes.img} >
          <img src='/image/itinerary-image.png' alt='itinerary' className={classes.illustration} />
        </Grid>
        <Grid item xs={12} sm={12} md={8} className={classes.text}>
          <Typography variant="h4" component="h2">
            Choisir un itinéraire
          </Typography>
          <Typography>
            Une fois votre véhicule ajouté, vous allez pouvoir ajouter des évaluations à votre profil. Une évaluation correspond à un trajet.
            Vous allez devoir tout d'abord rentrer une adresse ou une ville de départ, puis une adresse ou une ville de destination.
            Après la validation de cette première étape, plusieurs itinéraires vont vous être proposés, vous n'aurez plus qu'à sélectionner celui que vous avez emprunté,
            ou celui qui s'en approche le plus, ce qui permet d'évaluer l'impact de votre trajet plus précisément.
            Puis vous n'aurez plus qu'a validé votre trajet.
          </Typography>
        </Grid>
      </Grid>

      <Grid container className={classes.container}>
        <Grid item xs={12} sm={12} md={8} className={classes.text}>
          <Typography variant="h4" component="h2">
            Voir l'impact
          </Typography>
          <Typography>
            Une fois votre trajet validé, nous n'aurez plus qu'à regarder le résultat de l'évaluation. Vous aurez la masse de CO2 émise lors du trajet, ainsi que des équivalents,
            en nombre d'arbres plantés que cela représente, ou encore le nombre de smartphones fabriqués, pour vous donner une idée de ce que cela représente.
            Nous calculons l'impact en couplant le nombre de kilomètres parcourus, et l'émission de CO2 au km de votre véhicule.
            Vous pourrez ensuite retrouver votre impact global sur votre profil.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} className={classes.img} >
          <img src='/image/result-image.png' alt='result' className={classes.illustration} />
        </Grid>
      </Grid>
    </>
  )
}

export default Presentation