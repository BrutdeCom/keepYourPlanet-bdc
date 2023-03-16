import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Modal,
  Backdrop,
  Fade
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #35a373',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const ModalLayout = (props) => {
  const classes = useStyles()

  return (

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open !== undefined ? props.open : false}
        onClose={props.onClose}
        // disableBackdropClick
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open !== undefined ? props.open : false}>
          <div className={classes.paper}>
            {props.children}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

ModalLayout.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.array
}

export default ModalLayout