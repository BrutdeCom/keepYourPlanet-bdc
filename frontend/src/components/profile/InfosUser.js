import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  Typography,
  Button
} from '@material-ui/core'
import { withRouter } from 'react-router'

import { AuthContext } from '../../Context/AuthContext'

const useStyles = makeStyles({
  button: {
    margin: 6,
    backgroundColor: '#35a373',
    '&:hover': {
      color: 'black',
    },
  }
})

const InfosUser = ({ history }) => {

  const classes = useStyles()

  const authContext = useContext(AuthContext)
  const user = authContext.user

  const redirectResetForm = () => {
    history.push('/reset-password')
  }

  return (
    <>
      <Card>
        <CardContent>
          {user.username &&
            <Typography gutterBottom variant="h5" component="h2">
              {user.username}
            </Typography>
          }
          {user.address &&
            <p>
              {user.address}
            </p>
          }
          {user.email &&
            <p>
              {user.email}
            </p>}
        </CardContent>
        <Button
          variant="contained"
          className={classes.button}
          type='button'
          onClick={() => redirectResetForm()}>
          Réinitialiser votre mot de passe
        </Button>
      </Card>
    </>
  )
}

InfosUser.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default withRouter(InfosUser)