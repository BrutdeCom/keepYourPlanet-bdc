import React from 'react'
import { Grid, Link } from '@material-ui/core'
import PropTypes from 'prop-types'

const LinkFormLayout = (props) => {
  return (
    <Grid container>
      <Grid item>
        <Link href={props.link} variant="body2">
          {props.children}
        </Link>
      </Grid>
    </Grid>
  )
}

LinkFormLayout.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string
}

export default LinkFormLayout