import '../App.css';
import React, {useState} from 'react';
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

const CreateTeam = ({auth, setAuth, uid}) => {
    const [teamName, setTeamName] = useState('Team Name');
    const [openTeamNameChange, setOpenTeamNameChange] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [type, setTypeFilter] = useState('');
    const [favorited, setFavorited] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [teammons, setTeammons] = useState([]);


    const handleSearch = () => {
        if (type.length > 0) {
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons.php?keyword=' + keyword + '?type=' + type)
                .then((res) => res.json())
                .then((res)=>{
                    setPokemons(Object.entries(res.pokemons_filtered))
                });
        } else {
            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons.php?keyword=' + keyword)
                .then((res) => res.json())
                .then((res)=>{
                    setPokemons(Object.entries(res.pokemons_filtered))
                });
        }
    }

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

    const handleRemove = (teammon) => {
        setTeammons(teammons.filter(mon => mon[1][0] !== teammon[1][0]))
    }

    const handleSumbit = () => {
        if (teammons.length > 0) {

        } else {
            alert('Must add at least one Pokemon to your team first!')
        }
    }

    return(
        <div className='App-header'>
            <Card sx={{ width: '75%' }}>
                <CardContent>
                    <Typography align='center' variant='h3'>
                        Create a Team!
                    </Typography>
                </CardContent>
            </Card> <br/>
            <Card sx={{ width: '75%' }}>
                <CardContent>
                    <Typography sx={{display: 'inline-block'}} variant='h3'>
                        {teamName}
                    </Typography>
                    <Button sx={{display: 'inline-block', textTransform:'none', fontSize:'20px'}} onClick={handleOpenModalTeam} size='medium'><EditSharpIcon/></Button>
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
                    {teammons.map((teammon) => {
                        return(
                            <>
                                <Pokemon pokename={teammon[1][0]} url={teammon[1].url}/>
                                <Button key={teammon[1][0] + 'button'} onClick={() => handleRemove(teammon)}>
                                    <RemoveCircleIcon key={teammon[1][0] + 'icon'}/>
                                </Button>
                            </>
                            )
                    })}
                </CardContent>
                <CardActions>
                    <Button onClick={handleSumbit}>Create!</Button>
                </CardActions>
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
                    <FormGroup>
                        <FormControlLabel onClick={handleFavorited} control={<Checkbox/>} label="Favorited?" />
                    </FormGroup>
                    <Button onClick={handleSearch}>Search</Button>
                </CardActions>
            </Card>
            {pokemons.map((pokemon) => {    
                    return (
                        <>
                            <Pokemon key={pokemon[1][0]} pokename={pokemon[1][0]} url={pokemon[1].url}/>
                            <Button key={pokemon[1][0] + 'button'} onClick={() => handleAdd(pokemon)}>
                                <AddCircleIcon key={pokemon[1][0] + 'icon'}/>
                            </Button>
                        </>
                    )
            })}
        </div>
    )
}
export default CreateTeam; 