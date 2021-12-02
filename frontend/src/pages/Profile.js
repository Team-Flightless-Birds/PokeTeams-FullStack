import '../App.css';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import ListItemButton from '@mui/material/ListItemButton';
import { useParams } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import Card from '@mui/material/Card';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Home from "./home";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const style = {
    width: '100%',
    weo: "weo",
    bgcolor: 'background.paper',
};

export default function Profile() {
    const [changeemail, setChangeemail] = useState('Team Name');
    const [openEmailChange, setEmailChange] = useState(false);
    const [following, setFollowing] = useState([]);
    const [favs, setFavs] = useState([]);
    const [teams, setTeams] = useState([]);
    const [notFollowing, setNotFollowing] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    let { urlid } = useParams();
    const uid = window.sessionStorage.getItem("uid")
    let email = window.sessionStorage.getItem("email")
    const [urlemail, setUrlEmail] = useState("");
    const [team_list, setTeam_list] = useState({team_list:[]});

    const handleChangeEmail = (e) => (setChangeemail(e.target.value))
    const handleOpenModalEmail = () => setEmailChange(true);
    const handleCloseModalEmail = () => setEmailChange(false);
    const updateEmail = () => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/update_email.php?uid=' + uid + '&new_email=' + changeemail)
        .then((res) => res.json())
        .then((res) => {
            if (res.change_success) {
                email = changeemail
                setUrlEmail(changeemail)
                window.sessionStorage.setItem('email', changeemail)

            } else {
                alert('duplicate email')
            }
            
        })
    }

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
            })
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

    useEffect(() => {

        console.log("use effect triggered")
        //console.log(teams)
        for (const team of teams) {
            let name = team[1]
            let tid = team[0]
            console.log(team)

            fetch('https://backend-dot-poketeams.uk.r.appspot.com/get_pokemons_in_team.php?tid=' + tid)
                .then((res) => res.json())
                .then((res) => Object.entries(res.pokemons_in_team)
                )
                .then((pokemons) => {
                    let poke_element = <Card sx={{my: '10px'}}>
                        <ListItem >
                                <ListItem>
                                    {name}
                                    
                                </ListItem>
                                {urlid === uid ? <Button href={"/profile/" + uid} onClick={() => delete_team(tid)} >
                                    Delete Team
                                </Button> : <div></div>}
                                
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
                        </Card>
                    setTeam_list(prevState => ({
                        team_list: [ poke_element, ...prevState.team_list]
                      }))
                });
        }
    }, [teams])

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
            if (person[1].toLowerCase() === input.toLowerCase()) {
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
                let temp_itm = <ListItem ><ListItemButton component="a" href={link}>{follow[1]}</ListItemButton> <Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>;
                if (urlid === uid)
                    following_list_items.push(temp_itm)
                else
                    following_list_items.push(<ListItem ><ListItemButton component="a" href={link}>{follow[1]}</ListItemButton></ListItem>)
            }
            else {
                if(urlid === uid)
                    following_list_items.push(<ListItem ><ListItemButton divider component="a" href={link}>{follow[1]}</ListItemButton><Button href={main} onClick={() => unfollow(follow[0])}>Unfollow</Button></ListItem>)
                else
                    following_list_items.push(<ListItem ><ListItemButton divider component="a" href={link}>{follow[1]}</ListItemButton></ListItem>)
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




        return (
            <div className='App-header'>
                <Typography style={{ marginBottom: '20px' }} align='center' variant='h3'>{urlemail}</Typography>
                <Button sx={{ display: 'inline-block' }} onClick={handleOpenModalEmail} size='medium'><EditSharpIcon /></Button>
                                    <Dialog open={openEmailChange} onClose={handleCloseModalEmail}>
                                        <DialogTitle>Change Email</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                autoFocus
                                                onChange={handleChangeEmail}
                                                margin="dense"
                                                id="email"
                                                label="Email"
                                                type="text"
                                                variant="standard"
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseModalEmail}>Cancel</Button>
                                            <Button onClick={updateEmail}>Save</Button>
                                        </DialogActions>
                                    </Dialog>
                
                <Grid container spacing={1}>
                    
                    <Grid item xs={6}>
                        <div>
                            <Typography align='center' variant='h3'>Teams</Typography>
                            <List align='center'>
                                {
                                    team_list.team_list
                                }
                            </List>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <Typography align='center' variant='h3'>Favorite Pokemon</Typography>
                            <ImageList align='center' sx={{ width: '100%', height: '100%' }} cols={1} rowHeight={500}>
                                {fav_image_list}
                            </ImageList>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div>
                            <Typography align='center' variant='h3'>Follow new User</Typography>
                            <input ref={textInput} type="text" />
                            <Button href={"/profile/" + uid} onClick={newFollow}>Follow</Button>
                        </div>
                        <div>
                            
                            <Typography style={{ marginBottom: '20px' }} align='center' variant='h3'>Followed Users</Typography>
                            <List sx={style}>
                                {following_list_items}
                            </List>
                        </div>
                    </Grid>
                    

                </Grid>








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