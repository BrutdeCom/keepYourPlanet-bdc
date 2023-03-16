import React from 'react'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  input: {
    '& label.Mui-focused': {
      color: '#35a373',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#35a373',
      }},

  },
}))

const FormFieldLayout = (props) => {
  const classes = useStyles()
  return (
    <TextField
      className={classes.input}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={props.label}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      value={props.value}
      onBlur={props.onBlur}
    />
  )
}

FormFieldLayout.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onBlur: PropTypes.func
}

export default FormFieldLayout