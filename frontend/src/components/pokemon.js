import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const Pokemon = ({pokename, url}) => {
    const uid = window.sessionStorage.getItem("uid")

    return(
        <Card sx={{mx: '20px', mt: '20px', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                {pokename.length > 0 && (
                    <CardContent>
                        <img sx={{mx: '50%'}} height='200px' width='200px' src={url} alt={pokename}></img><br/>
                        <Typography sx={{mx: '50%'}} variant='body3'>{pokename}</Typography>
                    </CardContent>
                )}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Card>
    )
}
export default Pokemon;