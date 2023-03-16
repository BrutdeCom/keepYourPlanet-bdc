import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
}))

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'green',
  },
}))(LinearProgress)


const ProgressBar = (props) => {

  const classes = useStyles()
  const carbonUser = props.value

  const valueBar = () => {
    if (carbonUser > 100) {
      return 100
    } else {
      return carbonUser
    }
  }

  const LinearProgressWithLabel = (props) => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" margin="1%" >
        <Box width="70%" mr={1} >
          <BorderLinearProgress variant="determinate" value={valueBar()} />

        </Box>
        <Box minWidth={35} >
          <Typography variant="body2" color="textSecondary" >{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    )
  }





  return (
    <div className={classes.root} >
      <LinearProgressWithLabel value={carbonUser} />
    </div>
  )

}

ProgressBar.propTypes = {
  value: PropTypes.number,
}

export default ProgressBar