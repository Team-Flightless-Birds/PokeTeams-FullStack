import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';


const Pokemon = ({pokename, url, pid, isFav}) => {
    const uid = window.sessionStorage.getItem("uid");
    const handleUnfavorite = () => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/del_fav_pokemon.php?uid=' + uid + '&pokeindex=' + pid)
        isFav = false
    }

    const handleFavorite = () => {
        fetch('https://backend-dot-poketeams.uk.r.appspot.com/add_fav_pokemon.php?uid=' + uid + '&pokeindex=' + pid)
        isFav = true
    }

    return(
        <Card sx={{mx: '20px', mt: '20px', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                {pokename.length > 0 && (
                    <CardContent>
                        <img height='200px' width='200px' src={url} alt={pokename}></img><br/>
                        <Typography variant='body3'>{pokename}</Typography>
                    </CardContent>
                )}
                {isFav && (
                    <Button onClick={handleUnfavorite}>
                        <FavoriteIcon/>
                    </Button>
                )}
                {!isFav && (
                    <Button onClick={handleFavorite}>
                        <FavoriteBorderIcon/>
                    </Button>
                )}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Card>
    )
}
export default Pokemon;