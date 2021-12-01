import '../App.css';
import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Pokemon = ({pokename, url}) => {

    return(
        <div>
            <Card sx={{width: '50%' }}>
                {pokename.length > 0 && (
                <CardContent>
                    <img src={url} alt={pokename}></img>
                    <Typography variant='body3'>{pokename}</Typography>
                </CardContent>
                )}
                {pokename.length === 0 && ( //empty jsut plus siugn or some
                    <CardContent>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqm6gbjDozzHoONB_v4tAsKmB5AEwMkdvrQ9Hj_KZ8fFJDaUja_bPTO9Eu-QwikPRD8gU&usqp=CAU' alt='plus'></img>
                    </CardContent> 
                )}
            </Card>
        </div>
    )
}
export default Pokemon;