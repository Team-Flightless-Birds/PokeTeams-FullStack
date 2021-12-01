import '../App.css';
import React, {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Pokemon from '../components/pokemon';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('Team Name');
    const [openTeamNameChange, setOpenTeamNameChange] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [type, setTypeFilter] = useState('');
    const [favorited, setFavorited] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [teammons, setTeammons] = useState([]);
    const uid = window.sessionStorage.getItem("uid")

    const handleSearch = () => {
        console.log(type)
        let searchString = 'https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons.php?'
        if (favorited) { 
            searchString = searchString + 'is_favorite=true&uid=' + uid + '&'
        }
        if (type.length > 0 && keyword.length > 0) {
            fetch(searchString + 'type=' + type + '&keyword=' + keyword)
                .then((res) => res.json())
                .then((res)=>{
                    setPokemons(Object.entries(res.pokemons_filtered))
                });
        } else if (keyword.length > 0) {
            fetch(searchString + 'keyword=' + keyword)
                .then((res) => res.json())
                .then((res)=>{
                    setPokemons(Object.entries(res.pokemons_filtered))
                });
        } else if (type.length > 0) {
            fetch(searchString + 'type=' + type)
            .then((res) => res.json())
            .then((res)=>{
                setPokemons(Object.entries(res.pokemons_filtered))
            });
        } else {
            fetch(searchString)
            .then((res) => res.json())
            .then((res)=>{
                setPokemons(Object.entries(res.pokemons_filtered))
            });
        }
    }

    let navigate = useNavigate();
    const handleFavorited = () => setFavorited(!favorited);
    const handleType = (e) => setTypeFilter(e.target.value);
    const handleOpenModalTeam = () => setOpenTeamNameChange(true);
    const handleCloseModalTeam = () => setOpenTeamNameChange(false);
    const handleKeyword = (e) => setKeyword(e.target.value);
    const handleTeamName = (e) => setTeamName(e.target.value);

    const handleAdd = (pokemon) => {
        if (teammons.length < 6) {
            setTeammons(teammons => [...teammons, pokemon])
        } else {
            alert("Must remove a Pokemon from your team first!")
        }
    }

    useEffect(() => {
        if (uid.length === 0) {
            navigate(`/`);
        }
    })

    const handleRemove = (teammon) => {
        setTeammons(teammons.filter(mon => mon[1][0] !== teammon[1][0]))
    }

    const handleSumbit = () => {
        if (teammons.length > 0) {
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/create_user_team.php?uid=' + uid + '&team_name=' + teamName)
            .then((res) => res.json())
            .then((res)=>{
                const tid = res.tid
                for (let i = 0; i < teammons.length; i++) {
                    if (i > 5) {
                        break;
                    }
                    fetch('https://backend-dot-poketeams.uk.r.appspot.com/add_pokemon_to_team.php?tid=' + tid + '&pokeindex=' + teammons[i][0])
                    navigate(`/profile/${uid}`);
                } 
            })
        } else {
            alert('Must add at least one Pokemon to your team first!')
        }
    }

    return(
        <div className='App-header'>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Card sx={{ mt: '20px'}}>
                        <CardContent>
                            <Typography align='center' variant='h3'>
                                Create a Team!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardContent>
                            <Typography sx={{display: 'inline-block'}} variant='h4'>
                                {teamName}
                            </Typography>
                            <Button sx={{display: 'inline-block'}} onClick={handleOpenModalTeam} size='medium'><EditSharpIcon/></Button>
                            <Dialog open={openTeamNameChange} onClose={handleCloseModalTeam}>
                                <DialogTitle>Edit Team Name</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        onChange={handleTeamName}
                                        margin="dense"
                                        id="team name"
                                        label="Team Name"
                                        type="text"
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseModalTeam}>Cancel</Button>
                                    <Button onClick={handleCloseModalTeam}>Save</Button>
                                </DialogActions>
                            </Dialog>
                            <Grid container spacing={2}>
                            {teammons.map((teammon) => {
                                return(
                                    <Grid item xs={4}>
                                        <Pokemon pokename={teammon[1][0]} url={teammon[1].url}/>
                                        <Button key={teammon[1][0] + 'button'} onClick={() => handleRemove(teammon)}>
                                            <RemoveCircleIcon sx={{mx: '50%'}} key={teammon[1][0] + 'icon'}/>
                                        </Button>
                                    </Grid>
                                    )
                            })}
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleSumbit}>Create!</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Card sx={{  }}>
                        <CardContent>
                            <Typography align='center' variant='h4'>Search</Typography>
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={3}>
                                <Grid item xs={2}></Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        autoFocus
                                        onChange={handleKeyword}
                                        margin="dense"
                                        id="keyword"
                                        label="Keyword"
                                        type="text"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        onChange={handleType}
                                        margin="dense"
                                        id="keyword"
                                        label="Type"
                                        type="text"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <FormGroup>
                                        <FormControlLabel onClick={handleFavorited} control={<Checkbox/>} label="Favorited?" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={handleSearch}>Search</Button>
                                </Grid>
                                <Grid item xs={2}></Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {pokemons.map((pokemon) => {    
                    return (
                        <Grid item xs={3}>
                            <Pokemon key={pokemon[1][0]} pokename={pokemon[1][0]} url={pokemon[1].url}/>
                            <Button key={pokemon[1][0] + 'button'} onClick={() => handleAdd(pokemon)}>
                                <AddCircleIcon key={pokemon[1][0] + 'icon'}/>
                            </Button>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}
export default CreateTeam; 