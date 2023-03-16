import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  Typography,
  Container,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import AuthService from '../../Services/AuthService'
import MessageError from '../MessageError'
import ButtonLayout from '../layout/ButtonLayout'
import ModalLayout from '../layout/ModalLayout'
import FormFieldLayout from '../layout/FormFieldLayout'

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
  img: {
    width: '30%',
    height: '10%',
  },
  modal: {
    textAlign: 'center'
  }
}))

const VehicleRegistrationForm = () => {

  const classes = useStyles()

  const [message, setMessage] = useState(null)
  const [open, setOpen] = useState(false)
  const [vehicleDatas, setVehicleDatas] = useState(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = async (props) => {
    const { registration } = props
    try {
      const res = await AuthService.getRegistration(registration)
      if(res) {
        console.log(res.data)
        setVehicleDatas(res.data.vehicleJson)
        handleOpen()
      }
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  const registrationSchema = Yup.object().shape({
    registration: Yup.string('String').required('Une plaque d\'immatriculation est requise.')
      .min(7, 'Votre immatriculation est trop courte.')
      .max(9, 'Votre immatriculation est trop longue.')
      .matches(/^[A-Za-z]{2,2}-?[0-9]{3,3}-?[A-Za-z]{2,2}$/, 'Votre immatriculation est invalide.')
  })

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ registration: '' }}
        validationSchema={registrationSchema}
      >{({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched
        }) => (
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Typography component="h2" variant="h5">
                Entrez votre plaque d'immatriculation
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <FormFieldLayout
                  label="Entrez votre immatriculation"
                  placeholder="EG-258-MA"
                  type='text'
                  name='registration'
                  onChange={handleChange}
                  value={values.registration}
                  onBlur={handleBlur}
                />
                {touched.registration && errors.registration && <> {errors.registration}</>}
                <ButtonLayout type='submit'>
                  Valider
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
        <div className={classes.modal}>
          <h2 id="transition-modal-title">Véhicule ajouter avec succès !</h2>
          {vehicleDatas && 
                <>
                  {vehicleDatas.Description && <p>{vehicleDatas.Description}</p>}
                  {vehicleDatas.ImageUrl && <img className={classes.img} src={vehicleDatas.ImageUrl} alt={vehicleDatas.Description}/>}
                </>
          }
        </div>
        <ButtonLayout type='button' link='/mon-profil'>
                  Ok !
        </ButtonLayout>
      </ModalLayout>
      {message ? <MessageError message={message} /> : null}
    </>
  )
}

VehicleRegistrationForm.propTypes = {
  registration: PropTypes.string
}


export default VehicleRegistrationForm