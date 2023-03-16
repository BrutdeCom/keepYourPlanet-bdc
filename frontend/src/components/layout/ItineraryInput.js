import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
  input: {
    '& label.Mui-focused': {
      color: '#35a373',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#35a373',
      }
    },

  },
}))

const ItineraryInput = (props) => {
  const classes = useStyles()
  return (
    <PlacesAutocomplete
      value={props.address}
      onChange={props.setAddress}
      onSelect={props.handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...getInputProps({ placeholder: props.placeholder, label: props.label })} />
          <>
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion, index) => {
              const keyDate = (Date.now() + Math.random())
              const style = {
                backgroundColor: suggestion.active ? '#35a373' : 'white'
              }
              return (
                <div key={keyDate + index} {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              )
            })}
          </>
        </>
      )}
    </PlacesAutocomplete>
  )
}

ItineraryInput.propTypes = {
  address: PropTypes.string,
  setAddress: PropTypes.func,
  handleSelect: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string
}


export default ItineraryInput