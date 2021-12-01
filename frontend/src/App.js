import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Profile from './pages/Profile';
import CreateTeam from './pages/createTeam';
import logo from './images/logo.jpg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import './App.css';

export default function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const uid = window.sessionStorage.getItem("uid")

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  let link = '/profile/' + uid

  const logout = () => {
    window.sessionStorage.setItem("uid", "")
    window.sessionStorage.setItem("email", "")
  }

  return (
    <div>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: '#42aaff' }} position='static'>
            <Toolbar>
              
              <Button component="div" sx={{ flexGrow: 1 }} style={{ borderColor: '#42aaff' }}>
                <img src={logo} alt='PokeTeams'></img>
              </Button>
              {uid.length > 0 && (
                <div>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}><Link to='/create'>Create a Team</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to={link}>My Profile</Link></MenuItem>
                    <MenuItem onClick={logout}><Link from='/profile/' to='/'>Logout</Link></MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
          <Routes>
            <Route>
                <Route exact path='/' element={<Home/>}/>
            </Route>
            <Route>
              <Route exact path='/profile/:urlid' component={Profile} element={<Profile/>}/>
            </Route>
            <Route>
              <Route exact path='/create' element={<CreateTeam/>}/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}
