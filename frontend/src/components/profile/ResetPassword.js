import React, { useState } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  CssBaseline,
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import AuthService from '../../Services/AuthService'
import MessageError from '../MessageError'
import FormFieldLayout from '../layout/FormFieldLayout'
import ButtonLayout from '../layout/ButtonLayout'
import ModalLayout from '../layout/ModalLayout'

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


const ResetPassword = () => {

  const classes = useStyles()
  
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
  }


  const onSubmit = async (props) => {
    try {
      const res = await AuthService.passwordReset(props)
      if (res) {
        handleOpen()
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const userSchema = Yup.object().shape({
    password: Yup.string().required('Un mot de passe est requis'),
    newPassword: Yup.string().required('Un mot de passe est requis').matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_/])([-+!*$@%_\w]{16,})$/,
      'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial'
    ),
    newPasswordConfirm: Yup.string().required('Un mot de passe est requis').matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_/])([-+!*$@%_\w]{16,})$/,
      'Votre mot de passe doit contenir au moins 16 caractères, une minuscule, une majuscule et un symbole spécial'
    )
  })

  return (
    <>
      <ModalLayout />
      <Formik
        onSubmit={onSubmit}
        initialValues={{ password: '', newPassword: '', newPasswordConfirm: '' }}
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
              <Typography component="h2" variant="h5">
              Modifier mon mot de passe
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <FormFieldLayout
                  label="Ancien mot de passe"
                  type='password'
                  placeholder='Entrez votre ancien mot de passe'
                  name='password'
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password && <> {errors.password}</>}
                <FormFieldLayout
                  type='password'
                  label="Nouveau mot de passe"
                  placeholder='Entrez votre nouveau mot de passe'
                  name='newPassword'
                  required
                  onChange={handleChange}
                  value={values.newPassword}
                  onBlur={handleBlur}
                />
                {touched.newPassword && errors.newPassword && <> {errors.newPassword}</>}
                <FormFieldLayout
                  type='password'
                  label="Confirmation nouveau mot de passe"
                  placeholder='Confirmez votre nouveau mot de passe'
                  name='newPasswordConfirm'
                  required
                  onChange={handleChange}
                  value={values.newPasswordConfirm}
                  onBlur={handleBlur}
                />
                {touched.newPasswordConfirm && errors.newPasswordConfirm && <> {errors.newPasswordConfirm}</>}
                <ButtonLayout type='submit'>
              Confirmer
                </ButtonLayout>
              </form>
            </div>
          </Container>
        )}
      </Formik>
      <ModalLayout         
        open={open}
        onClose={handleClose} 
      >
        <h2 id="transition-modal-title">Félicitations, votre mot de passe est modifié !</h2>
        <ButtonLayout type='button' link='/mon-profil'>
          Ok !
        </ButtonLayout>
      </ModalLayout>
      {message ? <MessageError message={message} /> : null}
    </>
  )
}

ResetPassword.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}

export default withRouter(ResetPassword)