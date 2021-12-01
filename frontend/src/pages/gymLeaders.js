import '../App.css';
import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import GymTeam from '../components/gymTeam';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Gym = () => {
    const [leaders, setLeaders] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [type, setTypeFilter] = useState('');
    const [game, setGame] = useState('')


    const handleSearch = () => { //build out more once given correct backend
        if (type.length > 0) {
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons.php?keyword=' + keyword + '?type=' + type)
                .then((res) => res.json())
                .then((res)=>{
                    setLeaders(Object.entries(res.pokemons_filtered))
                });
        } else {
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons.php?keyword=' + keyword)
                .then((res) => res.json())
                .then((res)=>{
                    setLeaders(Object.entries(res.pokemons_filtered))
                });
        }
    }

    const handleGame = (e) => setGame(e.target.value);
    const handleType = (e) => setTypeFilter(e.target.value);
    const handleKeyword = (e) => setKeyword(e.target.value);

    return(
        <div className='App-header'>
            <Card sx={{ width: '75%' }}>
                <CardContent>
                    <Typography align='center' variant='h3'>
                        View Gym Leaders!
                    </Typography>
                </CardContent>
            </Card> <br/>
            <Card sx={{ width: '75%' }}>
                <CardContent>
                    <Typography align='center' variant='h4'>Search</Typography>
                </CardContent>
                <CardActions>
                    <TextField
                        autoFocus
                        onChange={handleKeyword}
                        margin="dense"
                        id="keyword"
                        label="Keyword"
                        type="text"
                        variant="standard"
                    />
                    <TextField
                        onChange={handleType}
                        margin="dense"
                        id="keyword"
                        label="Type"
                        type="text"
                        variant="standard"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="game">Game Series</InputLabel>
                        <Select
                        labelId="select-game"
                        id="select-game"
                        value={game}
                        label="Game"
                        onChange={handleGame}
                        >
                            <MenuItem value={''}>Ten</MenuItem>
                            <MenuItem value={''}>Twenty</MenuItem>
                            <MenuItem value={''}>Thirty</MenuItem>
                            <MenuItem value={''}>Ten</MenuItem>
                            <MenuItem value={''}>Twenty</MenuItem>
                            <MenuItem value={''}>Thirty</MenuItem>
                            <MenuItem value={''}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <Button onClick={handleSearch}>Search</Button>
                </CardActions>
            </Card>
            {leaders.map((leader) => {    
                    return (
                        <>
                            <GymTeam key={leader} leader={} region={} type={} badge={}/>
                        </>
                    )
            })}
        </div>
    )
}
export default Gym; 