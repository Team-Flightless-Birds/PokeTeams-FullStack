import '../App.css';
import React, {useState} from 'react';
import Pokemon from './pokemon'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const GymTeam = ({leader, region, type, badge}) => {
    const [pokemons, setPokemons] = useState([]);

    //do fetch to get pokemons on this team

    return (
        <Card>
            <CardContent>
                <Typography>
                    Name: {leader}, Type: {type}, Region: {region}
                </Typography>
                {pokemons.map((pokemon)=>(
                    <Pokemon pokename={pokemon[1][0]} pokeurl={pokemon[1].url}/>
                ))}
            </CardContent>
        </Card>
    )
}

export default GymTeam;