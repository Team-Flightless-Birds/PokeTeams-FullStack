import '../App.css';
import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import GymTeam from '../components/gymTeam';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const Gym = () => {
    const [leaders, setLeaders] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [type, setTypeFilter] = useState('');
    const [badge, setBadge] = useState('')



    const handleSearch = () => {
        let searchString = 'https://backend-dot-poketeams.uk.r.appspot.com/get_gym_leaders.php?'
        if (badge.length > 0) {
            searchString = searchString + 'badge=' + badge + '&'
        }
        if (type.length > 0 && keyword.length > 0) {
            fetch(searchString + 'type=' + type + '&leader_name=' + keyword)
                .then((res) => res.json())
                .then((res) => {
                    console.log(Object.entries(res.leaders_filtered))
                    //setLeaders(Object.entries(res.pokemons_in_team))
                });
        } else if (keyword.length > 0) {
            fetch(searchString + 'leader_name=' + keyword)
                .then((res) => res.json())
                .then((res) => {
                    setLeaders(Object.entries(res.leaders_filtered))
                    console.log(Object.entries(res.leaders_filtered))
                });
        } else if (type.length > 0) {
            fetch(searchString + 'type=' + type)
                .then((res) => res.json())
                .then((res) => {
                    setLeaders(Object.entries(res.leaders_filtered))
                    console.log(Object.entries(res.leaders_filtered))
                });
        } else {
            fetch(searchString)
                .then((res) => res.json())
                .then((res) => {
                    setLeaders(Object.entries(res.leaders_filtered))
                    console.log(Object.entries(res.leaders_filtered))
                });
        }
    }

    const handleBadge = (e) => setBadge(e.target.value)
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
                        id="type"
                        label="Type"
                        type="text"
                        variant="standard"
                    />
                    <TextField
                        onChange={handleBadge}
                        margin="dense"
                        id="badge"
                        label="Badge"
                        type="text"
                        variant="standard"
                    />
                    <Button onClick={handleSearch}>Search</Button>
                </CardActions>
            </Card>
            {leaders.map((leader) => {    
                    return (
                        <GymTeam key={leader} leader={leader[0]} tid={leader[1].TID} region={leader[1].game_name} type={leader[1].type} badge={leader[1].badge}/>
                    )
            })}
        </div>
    )
}
export default Gym; 