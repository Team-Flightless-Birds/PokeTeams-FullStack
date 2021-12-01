import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [link, setLink] = useState('')

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const profile = () => {
    setLink("profile/" + uid)
    console.log(uid)
  }


  // useEffect(() => {
  //   setLink("/profile/" + uid)
  //   console.log(uid)
  // }, [uid])

  return (
    <div>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{ backgroundColor: '#42aaff' }} position='static'>
            <Toolbar>
              <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Button component="div" sx={{ flexGrow: 1 }} style={{ borderColor: '#42aaff' }}>
                <img src={logo} alt='PokeTeams'></img>
              </Button>
              {auth && (
                <div>
                  <IconButton
                    size='large'
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                  >
                    <AccountCircle />
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
                    <MenuItem onClick={handleClose}>Create a team</MenuItem>
                    <MenuItem onClick={() => profile()} href={link}>My Profile</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
          <Routes>
            <Route>
              {!auth && (
                <Route exact path='/' element={<Home auth={auth} setAuth={setAuth}/>}/>
              )}
              {auth && (
                <Route path="/" element={<Navigate replace to="/profile" />} />
              )}
            </Route>
            <Route>
              <Route exact path='/profile/:urlid' component={Profile} element={<Profile/>}/>
            </Route>
            <Route>
              <Route exact path='/create' element={<CreateTeam auth={auth} setAuth={setAuth}/>}/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}
