import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';



const Cards = ({data: {confirmed, deaths, recovered, lastUpdate}}) => {
    console.log(confirmed)
    if(!confirmed) {
        return 'Loading...';
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} className={(styles.infected), (styles.card)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Infected</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={confirmed.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">REAL DATA {new Date(lastUpdate).toUTCString()}</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card}className={(styles.card), (styles.recovered)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={recovered.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">REAL DATA</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card} className={(styles.card), (styles.deaths)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Death</Typography>
                    <Typography variant="h5" component="h2">
                        <CountUp start={0} end={deaths.value} duration={2.75} separator="," />
                    </Typography>
                    <Typography color="textSecondary">REAL DATA</Typography>
                    <Typography variant="body2" component="p">Number of active cases of COVID-19.</Typography>
                </CardContent>
                </Grid>
            </Grid>

        </div>

    )
}

export default Cards