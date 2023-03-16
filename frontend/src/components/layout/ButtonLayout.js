import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#35a373',
    '&:hover': {
      color: 'black',
    },
  },
}))

const ButtonLayout = (props) => {
  const classes = useStyles()
  return (
    <Button
      type={props.type}
      href={props.link}
      onClick={props.onClick}
      fullWidth={props.fullWidth}
      variant="contained"
      className={classes.submit}
    >
      {props.children}
    </Button>
  )
}

ButtonLayout.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool
}

export default ButtonLayout