import '../App.css';
import React, {useState, useEffect} from 'react';
import Pokemon from './pokemon'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const GymTeam = ({leader, region, type, badge, tid}) => {
    const [pokemons, setPokemons] = useState([]);
    const [favedmons, setFavedmons] = useState([]);
    const [update, setUpdate] = useState(false)
    const uid = window.sessionStorage.getItem("uid");

    useEffect(() => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_fav_pokemon.php?uid=' + uid)
            .then((res) => res.json())
            .then((res) => {
                setFavedmons(Object.entries(res.fav_pokemons))
            })
    }, [update])
    //do fetch to get pokemons on this team

    useEffect(() => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons_in_team2.php?tid=' + tid)
            .then((res) => res.json())
            .then((res) => {
                setPokemons(Object.entries(res.pokemons_in_team))
                console.log(Object.entries(res.pokemons_in_team))
            })
    }, [uid])

    return (
        <Card>
            <CardContent>
                <Typography>
                    Name: {leader}, Type: {type}, Game Name: {region}, Badge #: {badge}
                </Typography>
                {pokemons.map((pokemon)=> {
                    let isFav = false
                    for (let i = 0; i < favedmons.length; i++) {
                        if (favedmons[i][0] === pokemon[1][0]) {
                            isFav = true
                            break
                        }
                    }
                    return (
                        <Pokemon pokename={pokemon[1][0]} pokeurl={pokemon[1].url} pid={pokemon[0]} isFav={isFav} update={update} setUpdate={setUpdate}/>
                )})}
            </CardContent>
        </Card>
    )
}

export default GymTeam;