import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

const Pokemon = ({pokename, url}) => {
    return(
        <Card sx={{mx: '20px', mt: '20px', alignItems: 'center', justifyContent: 'center'}}>
            <Grid container spacing={2}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                {pokename.length > 0 && (
                <CardContent>
                        <img height='250px' width='250px' src={url} alt={pokename}></img><br/>
                        <Grid container spacing={2}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8}>
                            <Typography sx={{ml: '15px'}} variant='body3'>{pokename}</Typography>
                        </Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                </CardContent>
                )}
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </Card>
    )
}
export default Pokemon;