import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  divider: {
    width: '30%', 
    height: '0.7vh', 
    margin: '0 auto', 
    backgroundColor: '#35a373'
  }
}))


const DividerLayout = () => {
  const classes = useStyles()
  return (
    <Divider className={classes.divider}/>
  )
}

export default DividerLayout