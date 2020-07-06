import React from 'react'
import { Card, CardContent, Typography, Grid, Container } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';



const Cards = ({data: {confirmed, deaths, recovered, lastUpdate}}) => {
    if(!confirmed) {
        return 'Loading...';
    }
    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid container justify="center" spacing={3} >
                <Grid item component={Card} className={(styles.card)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={confirmed.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card}className={(styles.card)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={recovered.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card} className={(styles.card)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Death</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={deaths.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
            </Grid>
        </Container>

    )
}

export default Cards