import React from 'react'
import {
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import '../style/keyFigure.css'
import CardLayout from '../components/layout/CardLayout'
import DividerLayout from './layout/DividerLayout'

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '99%',
    minWidth: '99%'
  },
}))

const KeyFigure = () => {
  const classes = useStyles()

  const impact = {
    conAverage: 6.33,
    coEssence: 14.56,
    coDiesel: 16.46,
    carbonNeutrality: 2,
    trainDeplacement: 11,
    cycloDeplacement: 1.6,
    transportDeplacement: 8.8,
    avionDeplacement: 1.8,
    carDeplacement: 77,
    trajetMoyen: 40,
    purcentTrajet: 40,
    augmentCirculation: 1.5,
    gazTransport: 33,
    routier: 80,
    deadYear: 48000,
    coVoit: 30,
    teleWork: 18,
    hybride: 81
  }

  return (
    <div className={classes.container}>
      <Typography className='title-key-figure' gutterBottom variant="h4" component="h2">
        Quelques chiffres clés de notre empreinte carbone :
      </Typography>
      <DividerLayout />
      <Grid container justify='center' spacing={3} style={{ marginTop: '10vh' }}>

        <CardLayout title="L'impact de nos voitures" img='/image/car-image.jpg'>
          <List>
            <ListItem>
              - Une consommation moyenne de {impact.conAverage}l/100 km.
            </ListItem>
            <ListItem>
              - Une émission de Co2 de {impact.coEssence} Kg pour l'essence et de {impact.coDiesel} Kg pour le diesel pour 100 Km.
            </ListItem>
          </List>
        </CardLayout>



        <CardLayout title="Rétablir l'équilibre" img='/image/balance-image.jpg'>
          <List>
            <ListItem>
              - {impact.carbonNeutrality} tonnes de Co2 par an et par habitant maximum dans les transports pour avoir un impact environnemental neutre.
            </ListItem>
          </List>
        </CardLayout>


        <CardLayout title='Quel transport, quel impact ?' img='/image/subway-image.jpg'>
          <List>
            <ListItem>
              - {impact.cycloDeplacement}% pour les cyclomoteurs.
            </ListItem>
            <ListItem>
              - {impact.avionDeplacement}% pour les avions.
            </ListItem>
            <ListItem>
              - {impact.transportDeplacement}% pour les transports en communs.
            </ListItem>
            <ListItem>
              - {impact.trainDeplacement}% pour les trains.
            </ListItem>
            <ListItem>
              - {impact.carDeplacement}% pour les voitures.
            </ListItem>
          </List>
        </CardLayout>

      </Grid>


      <Grid container justify='center' spacing={3} style={{ marginTop: '5vh' }}>

        <CardLayout title='Sur les routes' img='/image/road-image.jpg'>
          <List>
            <ListItem>
              - {impact.trajetMoyen} minutes: c'est le temps moyen qu'une personne a Paris ou Marseille passe dans les embouteillages.
            </ListItem>
            <ListItem>
              - {impact.purcentTrajet}% : c'est le nombre de trajets quotidiens qui font moins de 3km et qui sont fais en voiture.
            </ListItem>
            <ListItem>
              - {impact.augmentCirculation}% : c'est l'augmentation annuelle du nombre de véhicules sur les routes chaque année.
            </ListItem>
          </List>
        </CardLayout>


        <CardLayout title='En france' img='/image/france-image.jpg'>
          <List>
            <ListItem>
              - {impact.coVoit}% des francais ont eu recours au covoiturage en 2018.
            </ListItem>
            <ListItem>
              - Le télétravail ne représente que {impact.teleWork}% des travailleurs actifs en France
            </ListItem>
            <ListItem>
              - {impact.hybride}% : c'est le taux de hausse des ventes de véhicules hybride rechargeables.
            </ListItem>
          </List>
        </CardLayout>


        <CardLayout title='La pollution' img='/image/pollution-image.jpg'>
          <List>
            <ListItem>
              - {impact.gazTransport}% des gazs a effet de serre de France sont dus aux transports.
            </ListItem>
            <ListItem>
              - {impact.routier}% de la pollution (oxydes d'azote, particules, ...) provient du transport routier.
            </ListItem>
            <ListItem>
              - {impact.deadYear} décès par an sont liés a la pollution de l'air aux particules en France.
            </ListItem>
          </List>
        </CardLayout>

      </Grid>
    </div>
  )
}

export default KeyFigure
