import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Teams from './pages/Teams';
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    setAuth(!auth);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div>
      <Router>
        <Box  sx={{ flexGrow: 1 }}>
          <AppBar style={{backgroundColor: '#42aaff'}} position='static'>
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
              <Button component="div" sx={{ flexGrow: 1 }} style={{borderColor: '#42aaff'}}>
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
                    <MenuItem onClick={handleClose}>idk</MenuItem>
                    <MenuItem onClick={handleClose}>My Teams</MenuItem>
                  </Menu>
                </div>
              )}
              {!auth && (
                <Button onClick={handleChange} color='inherit' style={{textTransform:'none', fontSize:'20px'}}>Login</Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
        <div>
          <Routes>
            <Route path='/'>
              <Home auth={auth} handleChange={handleChange}/>
            </Route>
            <Route path='/Teams'>
              <Teams/>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
