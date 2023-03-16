import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AddCircle from '@material-ui/icons/AddCircle'
import MenuIcon from '@material-ui/icons/Menu'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
} from '@material-ui/core'

import AuthService from '../../Services/AuthService'
import { AuthContext } from '../../Context/AuthContext'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#35a373'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  linkButton: {
    color: 'white',
    '&:hover': {
      color: 'green',
    },
  },
  title: {
    textDecoration: 'none',
    flexGrow: 1,
    color: 'white',
    '&:hover': {
      opacity: 0.8,
      color: 'white'
    },
  },
  menuItem: {
    color: 'black',
    '&:hover': {
      color: '#35a373',
    },
    textDecoration: 'none'
  }
}))


const MenuTop = () => {
  const classes = useStyles()

  const [anchorAccountMenu, setAnchorAccountMenu] = useState(null)
  const [anchorEvaluationMenu, setAnchorEvaluationMenu] = useState(null)
  const [anchorNoAuthMenu, setAnchorNoAuthMenu] = useState(null)

  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext)

  const logoutHandler = async () => {
    try {
      const res = await AuthService.signoutUser()
      const { isAuthenticated, user, success } = res.data
      if (success) {
        setUser(user)
        setIsAuthenticated(isAuthenticated)
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('coordinates')
      }
    } catch (error) {
      throw error
    }
  }

  const handleClickEvaluationMenu = (event) => {
    setAnchorEvaluationMenu(event.currentTarget)
  }

  const handleCloseEvaluationMenu = () => {
    setAnchorEvaluationMenu(null)
  }

  const EvaluationMenu = () => {
    return (
      <>

        <IconButton aria-controls="evaluation-menu" aria-haspopup="true" onClick={handleClickEvaluationMenu}>
          <AddCircle />
        </IconButton>
        <Menu
          id="evaluation-menu"
          anchorEl={anchorEvaluationMenu}
          keepMounted
          open={Boolean(anchorEvaluationMenu)}
          onClose={handleCloseEvaluationMenu}
        >
          <MenuItem>
            <Link onClick={handleCloseEvaluationMenu} className={classes.menuItem} to='/itineraire'>Ajouter une évaluation</Link>
          </MenuItem>
          {user.role === 'admin' && <MenuItem>
            <Link onClick={handleCloseEvaluationMenu} className={classes.menuItem} to='/admin'>Panel admin</Link>
          </MenuItem>}
        </Menu>
      </>
    )
  }

  const handleClickAccountMenu = (event) => {
    setAnchorAccountMenu(event.currentTarget)
  }

  const handleCloseAccountMenu = () => {
    setAnchorAccountMenu(null)
  }

  const AccountMenu = () => {
    return (
      <div>
        <IconButton aria-controls="account-menu" aria-haspopup="true" onClick={handleClickAccountMenu}>
          <AccountCircle />
        </IconButton>
        <Menu
          id="account-menu"
          anchorEl={anchorAccountMenu}
          keepMounted
          open={Boolean(anchorAccountMenu)}
          onClose={handleCloseAccountMenu}
        >
          <MenuItem>
            <Link onClick={handleCloseAccountMenu} className={classes.menuItem} to='/mon-profil'>Mon Profil</Link>
          </MenuItem>
          <MenuItem className={classes.menuItem} onClick={logoutHandler}>Déconnexion</MenuItem>
        </Menu>
      </div>
    )
  }

  const handleClickNoAuthMenu = (event) => {
    setAnchorNoAuthMenu(event.currentTarget)
  }

  const handleCloseNoAuthMenu = () => {
    setAnchorNoAuthMenu(null)
  }

  const NoAuthNavbar = () => {
    return (
      <>
        <div>
          <IconButton aria-controls="no-auth-menu" aria-haspopup="true" onClick={handleClickNoAuthMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="no-auth-menu"
            anchorEl={anchorNoAuthMenu}
            keepMounted
            open={Boolean(anchorNoAuthMenu)}
            onClose={handleCloseNoAuthMenu}
          >
            <MenuItem>
              <Link onClick={handleCloseNoAuthMenu} className={classes.menuItem} to='/inscription'>Inscription</Link>
            </MenuItem>
            <MenuItem>
              <Link onClick={handleCloseNoAuthMenu} className={classes.menuItem} to='/connexion'>Connexion</Link>
            </MenuItem>
          </Menu>
        </div>
      </>
    )
  }

  const AuthNavbar = () => {
    return (
      <>
        {EvaluationMenu()}
        {AccountMenu()}
      </>
    )
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to='/' className={classes.title}>
              KeepYourPlanet
            </Link>
          </Typography>
          {!isAuthenticated ? NoAuthNavbar() : AuthNavbar()}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MenuTop