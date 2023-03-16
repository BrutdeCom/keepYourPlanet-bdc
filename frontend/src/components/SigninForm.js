import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  CssBaseline,
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import MessageError from './MessageError'
import FormFieldLayout from './layout/FormFieldLayout'
import ButtonLayout from './layout/ButtonLayout'
import LinkFormLayout from './layout/LinkFormLayout'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}))

const SigninForm = ({ history }) => {

  const classes = useStyles()

  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext)


  const onSubmit = async (values) => {
    try {
      const res = await AuthService.signinUser(values)
      const { isAuthenticated, user, token } = res.data
      if (isAuthenticated) {
        authContext.setUser(user)
        authContext.setIsAuthenticated(isAuthenticated)
        localStorage.setItem('jwtToken', token)
        history.push('/mon-profil')
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const userSchema = Yup.object().shape({
    username: Yup.string().required('Un nom d\'utilisateur est requis'),
    password: Yup.string().required('Un mot de passe est requis')
  })

  return (
    <>{authContext.isAuthenticated === false ?
      <Formik
        onSubmit={onSubmit}
        initialValues={{ username: '', password: '' }}
        validationSchema={userSchema}
      >{({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched
        }) => (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography data-testid="title" component="h2" variant="h5">
                Connectez-vous
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <FormFieldLayout
                  label="Nom d'utilisateur"
                  placeholder="Entrez votre nom d'utilisateur"
                  type='text'
                  name='username'
                  onChange={handleChange}
                  value={values.username}
                  onBlur={handleBlur}
                />
                {touched.username && errors.username && <> {errors.username}</>}
                <FormFieldLayout
                  type='password'
                  placeholder='Entrez votre mot de passe'
                  name='password'
                  label="Mot de passe"
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <> {errors.password}</>}
                <ButtonLayout fullWidth type='submit'>
                  Se connecter
                </ButtonLayout>
                <LinkFormLayout link='/inscription'>
                  Vous n'avez pas de compte ? Inscrivez-vous
                </LinkFormLayout>
              </form>
            </div>
          </Container>
        )}
      </Formik> :
      <MessageError message='Vous êtes déjà connecté.' />
    }
    {message ? <MessageError message={message} /> : null}
    </>

  )
}

SigninForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default SigninForm