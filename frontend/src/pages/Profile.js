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
    const [notFollowing, setNotFollowing] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    let { urlid } = useParams();
    const uid = window.sessionStorage.getItem("uid")
    const email = window.sessionStorage.getItem("email")
    const [urlemail, setUrlEmail] = useState("");

    useEffect(() => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/following.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setFollowing(Object.entries(res.following))
            })
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_fav_pokemon.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setFavs(Object.entries(res.fav_pokemons))
            });

        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_teams_by_uid.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setTeams(Object.entries(res.user_teams))
            });
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/uid_to_email.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setUrlEmail(res.email)
            });
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_all_not_following.php?uid=' + urlid)
            .then((res) => res.json())
            .then((res) => {
                setNotFollowing(Object.entries(res.users_not_following))
            })
    }, [urlid]);


    const unfollow = (unfollow_uid) => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/del_following.php?self_uid=' + uid + '&target_uid=' + unfollow_uid)
            .then((res) => res.json())
            .then((res) => {
            });
    }

    let textInput = React.createRef();  // React use ref to get input value
    let newFollow = (e) => {
        let input = textInput.current.value;
        let flag = false
        notFollowing.map((person, i, arr) => {
            if (person[1].toLowerCase() == input.toLowerCase()) {
                fetch('https://backend-dot-poketeams.uk.r.appspot.com/add_following.php?self_uid=' + uid + '&target_uid=' + person[0])
                    .then((res) => res.json())
                    .then((res) => {
                    });
            }
        })
    };

    const delete_team = (delete_tid) => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/delete_team.php?tid=' + delete_tid)
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

            if (i === arr.length - 1) {
                following_list_items.push(<ListItem ><ListItemButton component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
            }
            else {
                following_list_items.push(<ListItem ><ListItemButton divider component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
            }
        })

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

        // let team_list = []
        // teams.map((team, i, arr) => {
        //     let name = team[1]
        //     let tid = team[0]

        //     let link = "/edit/" + tid

        //     if (i === arr.length - 1) {
        //         team_list.push(<ListItem ><ListItemButton>{name}</ListItemButton><Button href={"/profile/" + uid} onClick={() => delete_team(tid)} >Delete Team</Button></ListItem>)
        //     }
        //     else {
        //         team_list.push(<ListItem ><ListItemButton divider>{name}</ListItemButton><Button href={"/profile/" + uid} onClick={() => delete_team(tid)} >Delete Team</Button></ListItem>)
        //     }
        // })

        const get_pokemon = (tid) => {

            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons_in_team.php?tid=' + tid)
                .then((res) => res.json())
                .then((res) => {
                    setPokemons(Object.entries(res.pokemons_in_team))
                });

        }

        let team_list = []
        //console.log(teams)
        for (const team of teams) {
            let name = team[1]
            let tid = team[0]
            console.log(team)

            //get_pokemon(tid)
            // fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons_in_team.php?tid=' + tid)
            //     .then((res) => res.json())
            //     .then((res) => {
            //         setPokemons(Object.entries(res.pokemons_in_team))
            //     });

            team_list.push(
                <ListItem >
                    <ListItem>
                        {name}
                    </ListItem>
                    <Button href={"/profile/" + uid} onClick={() => delete_team(tid)} >
                        Delete Team
                    </Button>
                    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                        {
                            pokemons.map((pokemon, i, arr) => {
                                let name = pokemon[0]
                                let image = pokemon[1]

                                return (
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
                        }
                    </ImageList>
                </ListItem>
            )
        }


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
                    <List align='center'>
                        {
                            team_list
                        }
                    </List>
                </div>
                <div>
                    <Typography align='center' variant='h3'>Follow new User</Typography>
                    <input ref={textInput} type="text" />
                    <Button href={"/profile/" + uid} onClick={newFollow}>Follow</Button>
                </div>
                <div>

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