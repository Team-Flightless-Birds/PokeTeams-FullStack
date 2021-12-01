import '../App.css';
import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';


const Home = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const uid = window.sessionStorage.getItem("uid")

    let navigate = useNavigate();
    const handleOpenModalSignUp = () => setOpenSignUp(true);
    const handleCloseModalSignUp = () => setOpenSignUp(false);

    const handleOpenModalLogin = () => setOpenLogin(true);
    const handleCloseModalLogin = () => setOpenLogin(false);

    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => setConfirmPass(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const handleSignUp = () => {
        if (password !== confirmPass) {
            alert('Your passwords don\'t match')
        } else {
            //make account, post to database, 
            const crypto = require('crypto')
            const hash = crypto.createHash('sha1')
            hash.update(password)
            const hashed = hash.digest('hex')
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/user_signup.php?email=' + email + '&password=' + hashed)
            .then((res) => res.json())
            .then((res)=>{
              if (!res.duplicate_user && res.registration_status) {
                window.sessionStorage.setItem("uid", res.uid);
                window.sessionStorage.setItem("email", email);
                handleCloseModalSignUp()
                navigate(`/profile/${res.uid}`);
              } else {
                alert('Email already in use :(')
              }
            });
        }
    }

    const handleLogin = () => {
        const crypto = require('crypto')
        const hash = crypto.createHash('sha1')
        hash.update(password)
        const hashed = hash.digest('hex')
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/user_login.php?email=' + email + '&password=' + hashed)
            .then((res) => res.json())
            .then((res)=>{
              if (res.login_success) {
                window.sessionStorage.setItem("uid", res.uid);
                window.sessionStorage.setItem("email", email);
                handleCloseModalLogin()
                navigate(`/profile/${res.uid}`);
              }
            });
    }

    useEffect(() => {
        if (uid) {
            navigate(`/profile/${uid}`);
        }
    })
        
    if (!uid) {
        return( 
            <div className='App-header'>
                <Grid container spacing={3}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Card sx={{ mt: -20, width: '1/2' }}>
                            <CardContent>
                                <Typography style={{marginBottom: '20px'}} align='center' variant='h3'>
                                    Welcome to PokéTeams!
                                </Typography>
                                <Typography style={{marginBottom: '-30px'}} variant='body1'>
                                    Using this website, you can:
                                </Typography>   
                                <ul>
                                    <li>
                                        <Typography variant='body1'>
                                            Create teams of six Pokémon from over 800 available Pokémon in the first 7 generations of the games!
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            Strategize by viewing the Pokémon of the Gym Leaders in each game, along with their stats and typings!
                                        </Typography>
                                    </li>
                                    <li>
                                        <Typography variant='body1'>
                                            Compare favorite Pokémon and teams with other users of the app!
                                        </Typography>
                                    </li>
                                </ul>
                                <Typography align='center' variant='body1'>
                                    Login or Sign-up now to join in on the fun!
                                </Typography>
                                
                            </CardContent>     
                            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button sx={{textTransform:'none', fontSize:'20px'}} onClick={handleOpenModalLogin} size='medium'>Login</Button>
                                <Dialog open={openLogin} onClose={handleCloseModalLogin}>
                                    <DialogTitle>Login</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            onChange={handleEmail}
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            variant="standard"
                                        /><br/>
                                        <TextField
                                            onChange={handlePassword}
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            type="password"
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseModalLogin}>Cancel</Button>
                                        <Button onClick={handleLogin}>Login</Button>
                                    </DialogActions>
                                </Dialog>
                                <Button sx={{textTransform:'none', fontSize:'20px'}} onClick={handleOpenModalSignUp} size='medium'>Sign-up</Button>
                                <Dialog open={openSignUp} onClose={handleCloseModalSignUp}>
                                    <DialogTitle>Sign-Up</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            onChange={handleEmail}
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            variant="standard"
                                        /><br/>
                                        <TextField
                                            onChange={handlePassword}
                                            margin="dense"
                                            id="password"
                                            label="Password"
                                            type="password"
                                            variant="standard"
                                        /><br/>
                                        <TextField
                                            onChange={handleConfirmPassword}
                                            margin="dense"
                                            id="confirmpass"
                                            label="Confirm Password"
                                            type="password"
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseModalSignUp}>Cancel</Button>
                                        <Button onClick={handleSignUp}>Sign-Up</Button>
                                    </DialogActions>
                                </Dialog>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </div>  
        )
    } else {
        return (
            <div>you shouldn't be able to see this : o </div>
        )
    }
        
}
export default Home;