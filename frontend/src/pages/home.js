import '../App.css';
import React from "react";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


 const Home = ({auth, handleChange}) => {

    if (!auth) {
        return(
        
            <div className='App-header'>
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
                                    Create Teams of six Pokémon from the more than 800 in the first 7 generations of the games!
                                </Typography>
                            </li>
                            <li>
                                <Typography variant='body1'>
                                    Strategize by viewing the Pokémon of the Gym Leaders in each game, along with their stats and typings!
                                </Typography>
                            </li>
                            <li>
                                <Typography variant='body1'>
                                    Compare favorite Pokémon and teams with other Users of the app!
                                </Typography>
                            </li>
                        </ul>
                        <Typography align='center' variant='body1'>
                            Login or Sign-up now to join in on the fun!
                        </Typography>
                        
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button sx={{textTransform:'none', fontSize:'20px'}} onClick={handleChange} size="medium">Login</Button>
                    </CardActions>
                </Card>
            </div>
        )} return(
            <div>logged in!</div>
        )
}

export default Home;