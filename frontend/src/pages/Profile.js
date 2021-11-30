import '../App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

export default function Profile({ auth, handleChange }) {
    const [following, setFollowing] = useState([]);
    const [favs, setFavs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [uid, setUid] = useState(2);

    useEffect(() => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/following.php?uid=' + uid.toString())
            .then((res) => res.json())
            .then((res) => {
                let f = res.following
                for (const [key, value] of Object.entries(f)) {
                    // following.push([key, value])
                    setFollowing([...following, [key, value]])
                    //console.log(`${key}: ${value}`);
                }
                //console.log(following[0][0])
                //console.log(typeof(following[0][0]))
                console.log(following)
            })

        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_fav_pokemon.php?uid=' + uid.toString())
            .then((res) => res.json())
            .then((res) => {
                //console.log(res)

            });

    }, [uid]);




    if (!auth) { // if logged in

        let list_items = []

        for (let i = 0; i < following.length; i++) {
            let follow = following[i]
            let link = "/profile/" + follow[0]

            if (i == following.length - 1) {
                list_items.push(<ListItemButton component="a" href={link}><ListItemText primary={follow[1]} /></ListItemButton>)
            }
            else {
                list_items.push(<ListItemButton divider component="a" href={link}><ListItemText primary={follow[1]} /></ListItemButton>)
            }
        }



        return (
            <div className='App-header'>
                <Typography style={{ marginBottom: '20px' }} align='center' variant='h3'>Users You Follow</Typography>
                <List sx={style} component="nav" aria-label="mailbox folders">
                    {list_items}
                </List>

            </div>

        )
    }
    else {
        return (
            <div className='App-header'>
                You are logged in, bud
            </div>
        )
    }
}