import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { green } from '@material-ui/core/colors'
import {
  CssBaseline,
  Typography,
  Container,
  Checkbox,
  FormControlLabel
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import MessageError from '../components/MessageError'
import FormFieldLayout from './layout/FormFieldLayout'
import ButtonLayout from './layout/ButtonLayout'
import LinkFormLayout from './layout/LinkFormLayout'
import ModalLayout from './layout/ModalLayout'

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

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />)


const SignupForm = () => {
  const classes = useStyles()
  
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const authContext = useContext(AuthContext)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (props) => {
    try {
      const res = await AuthService.insertUser(props)
      const { message } = res.data
      if (!message.msgError) {
        handleOpen()
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const userSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Votre pseudo est trop court').max(15, 'Votre pseudo est trop long').required('Le pseudo est requis'),
    email: Yup.string().email('Votre email doit avoir un format valide').required('Votre email est requis'),
    password: Yup.string().required('Un mot de passe est requis')
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_/])([-+!*$@%_\w]{16,})$/,
        'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial'
      )
  })

  return (
    <>
      <ModalLayout />
      {authContext.isAuthenticated === false ?
        <Formik
          onSubmit={onSubmit}
          initialValues={{ email: '', username: '', password: '', checked: false }}
          validationSchema={userSchema}
        >{({
            values,
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
          }) => (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography data-testid='title' component="h2" variant="h5">
                  Inscrivez-vous
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <FormFieldLayout
                    type='email'
                    placeholder='Entrez un email'
                    label='Email'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  {touched.mail && errors.mail && <> {errors.mail}</>}
                  <FormFieldLayout
                    label="Nom d'utilisateur"
                    type='text'
                    placeholder="Entrez un nom d'utilisateur"
                    name='username'
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                  />
                  {touched.username && errors.username && <> {errors.username}</>}
                  <FormFieldLayout
                    type='password'
                    placeholder='Entrez un mot de passe'
                    label="Mot de passe"
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  <p>Caractères spéciaux autorisés pour le mot de passe : </p>
                  <p>*, !, -, _, %, @</p>
                  {touched.password && errors.password && <> {errors.password}<br /></>}
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        required
                      />}
                    label={
                      <LinkFormLayout link='/politique-de-confidentialite'>
                        J'accepte la politique de confidentialité.
                      </LinkFormLayout>
                    }
                    labelPlacement="end"
                  />
                  <ButtonLayout type='submit' fullWidth>
                    S'inscrire
                  </ButtonLayout>
                  <LinkFormLayout link='/connexion'>
                    Vous avez déjà un compte ? Connectez-vous
                  </LinkFormLayout>
                </form>
              </div>
            </Container>
          )}
        </Formik> :
        <MessageError message='Vous êtes déjà connecté.' />
      }
      <ModalLayout
        open={open}
        onClose={handleClose}
      >
        <h2 id="transition-modal-title">Félicitations, vous êtes inscrit !</h2>
        <p id="transition-modal-description">Vous pouvez maintenant accédez a votre profil et calculer votre impact !</p>
        <ButtonLayout type='button' link='/connexion'>
          Ok !
        </ButtonLayout>
      </ModalLayout>

      {message ? <MessageError message={message} /> : null}
    </>
  )
}

SignupForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default SignupForm