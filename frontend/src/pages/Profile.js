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
import { useParams } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Home from "./home";


const style = {
    width: '100%',
    weo: "weo",
    bgcolor: 'background.paper',
};

export default function Profile() {
    const [following, setFollowing] = useState([]);
    const [favs, setFavs] = useState([]);
    const [teams, setTeams] = useState([]);
    let { urlid } = useParams();
    const uid = window.sessionStorage.getItem("uid")
    const email = window.sessionStorage.getItem("email")
    const [urlemail, setUrlEmail] = useState("");

    useEffect(() => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/following.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                //let f = res.following

                setFollowing(Object.entries(res.following))
                // for (const [key, value] of Object.entries(f)) {
                //     setFollowing([...following, [key, value]])
                // }

            })

        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_fav_pokemon.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                //let f = res.fav_pokemons
                setFavs(Object.entries(res.fav_pokemons))
                // for (const [key, value] of Object.entries(f)) {
                //     setFavs([...favs, [key, value]])
                // }
            });

        fetch('https://backend-dot-poketeams.uk.r.appspot.com/user_teams.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                //let f = res.teams
                setTeams(Object.entries(res.teams))
                // for (const [key, value] of Object.entries(f)) {
                //     setTeams([...teams, [key, value]])
                // }
            });
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/uid_to_email.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setUrlEmail(res.email)
            });

    }, [urlid]);



    const unfollow = (unfollow_uid) => {

        fetch('https://backend-dot-poketeams.uk.r.appspot.com/del_following.php?self_uid=' + uid + '&target_uid=' + unfollow_uid)
            .then((res) => res.json())
            .then((res) => {
            });

    }




    if (uid.length > 0) { // if logged in

        let following_list_items = []
        following.map((follow, i, arr) => {    
            //let follow = following[i]
            let link = "/profile/" + follow[0]
            let main = "/profile/" + urlid
            console.log(following.length)

            if (i === arr.length - 1) {
                following_list_items.push(<ListItem ><ListItemButton component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
            }
            else {
                following_list_items.push(<ListItem ><ListItemButton divider component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
            }
        })

        // let following_list_items = []
        // console.log(following)
        // for (let i = 0; i < following.length; i++) {
        //     let follow = following[i]
        //     let link = "/profile/" + follow[0]
        //     let main = "/profile/" + urlid
        //     console.log(following.length)

        //     if (i === following.length - 1) {
        //         following_list_items.push(<ListItem ><ListItemButton component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
        //     }
        //     else {
        //         following_list_items.push(<ListItem ><ListItemButton divider component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
        //     }
        // }

        let fav_image_list = []
        favs.map((fav, i, arr) => {    
            let image = fav[1]
            let name = fav[0]
            fav_image_list.push(
                <ImageListItem>
                    <img
                        src={`${image}?w=248&fit=crop&auto=format`}
                        srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={name}
                        position="below"
                    />
                </ImageListItem>
            )
        })

        // let fav_image_list = []
        // for (let i = 0; i < favs.length; i++) {
        //     let image = favs[i][1]
        //     let name = favs[i][0]

        //     fav_image_list.push(
        //         <ImageListItem>
        //             <img
        //                 src={`${image}?w=248&fit=crop&auto=format`}
        //                 srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        //                 alt={name}
        //                 loading="lazy"
        //             />
        //             <ImageListItemBar
        //                 title={name}
        //                 position="below"
        //             />
        //         </ImageListItem>
        //     )
        // }


        let team_list = []
        teams.map((team, i, arr) => {    
            let name = team[1]
            let tid = team[0]

            let link = "/edit/" + tid

            if (i === arr.length - 1) {
                team_list.push(<ListItem ><ListItemButton>{name}</ListItemButton><Button>Delete Team</Button></ListItem>)
            }
            else {
                team_list.push(<ListItem ><ListItemButton divider>{name}</ListItemButton><Button>Delete Team</Button></ListItem>)
            }
        })

        // let team_list = []
        // for (let i = 0; i < teams.length; i++) {
        //     let name = teams[i][1]
        //     let tid = teams[i][0]

        //     let link = "/edit/" + tid


        //     if (i === teams.length - 1) {
        //         team_list.push(<ListItem ><ListItemButton component="a" href={link}>{name}</ListItemButton><Button>Delete Team</Button></ListItem>)
        //     }
        //     else {
        //         team_list.push(<ListItem ><ListItemButton divider component="a" href={link}>{name}</ListItemButton><Button>Delete Team</Button></ListItem>)
        //     }
        // }


        return (
            <div className='App-header'>
                <div>
                    <Typography style={{ marginBottom: '20px' }} align='center' variant='h3'>{urlemail}</Typography>
                    <Typography style={{ marginBottom: '20px' }} align='center' variant='h3'>Followed Users</Typography>
                    <List sx={style}>
                        {following_list_items}
                    </List>
                </div>
                <div>
                    <Typography align='center' variant='h3'>Favorite Pokemon</Typography>
                    <ImageList align='center'>
                        {fav_image_list}
                    </ImageList>
                </div>
                <div>
                    <Typography align='center' variant='h3'>Teams</Typography>
                    <ImageList align='center'>
                        {team_list}
                    </ImageList>
                </div>







            </div>

        )
    }
    else {
        return (
            <div className='App-header'>
                You are not logged in
            </div>
        )
    }
}