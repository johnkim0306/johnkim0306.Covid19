import React, { useState, useEffect, useRef  } from "react";
import ReactMapGL, { NavigationControl, FlyToInterpolator, Marker, Popup, Cirle } from "react-map-gl";
import { Card, CardContent, Typography, Grid, Container, CardActions, Button, Popper, makeStyles  } from '@material-ui/core';
import { fetchConfirmed } from '../../api/';
import styles from './Map.css';
import useSupercluster from "use-supercluster";
import useSwr from "swr";
import logo from './1.jpg';
import logo2 from './coronavirus2.jpg';


const mapbox_token = "pk.eyJ1Ijoiam9obmswMzA2IiwiYSI6ImNrZGhtcWdjbTAxN2wyeGs2djEwdmp4MmkifQ.10oHb3YnNenJtaPaBYcVIg"

const fetcher = (...args) => fetch(...args).then(response => response.json());


const Map = () => {
    // Load data 
    const [confirmedData, setConfirmed] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // Set up map
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "60vw",
        height: "60vh",
        zoom: 2
      });
    const mapRef = useRef();

    const url = 'https://covid19.mathdro.id/api/confirmed';
    const { data, error } = useSwr(url, { fetcher });
    const confirmedData2 = data && !error ? data.slice(0,500) : [];


    //---- Popper
    const useStyles = makeStyles((theme) => ({
        paper: {
            border: '1px solid',
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    //----------------


    //const confirmedData2 = confirmedData.slice(0,100)
    const points = confirmedData2.map(corona => ({
        type: "Feature",
        properties: { cluster: false, coronaId: corona.uid, confirmed: corona.confirmed, deaths: corona.deaths, recovered: corona.recovered, combinedKey: corona.combinedKey},
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(corona.long),
            parseFloat(corona.lat)
          ]
        }
    }));
    //console.log(points);

    const bounds = mapRef.current
        ? mapRef.current
            .getMap()
            .getBounds()
            .toArray()
            .flat()
        : null;

    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom: viewport.zoom,
        options: { radius: 75, maxZoom: 20 }
    });

    //console.log(clusters)
    //console.log(points);



    useEffect(() => {
        getA();
    }, []);

    async function getA() {
        try {
            setIsLoading(true);
            //fetchApi();
            //fetchDataWithSwr();
        } catch (error) {
            
        }

        finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
        <ReactMapGL
            {...viewport}
            transitionDuration={800}
            transitionInterpolator={new FlyToInterpolator()}
            mapboxApiAccessToken= "pk.eyJ1Ijoiam9obmswMzA2IiwiYSI6ImNrZGhtcWdjbTAxN2wyeGs2djEwdmp4MmkifQ.10oHb3YnNenJtaPaBYcVIg"
            mapStyle = "mapbox://styles/johnk0306/ckdia402j0dwm1io2p4d1bst8"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            ref={mapRef}
        >

        {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const confirmed = cluster.properties.confirmed;
            const deaths = cluster.properties.deaths;
            const recovered = cluster.properties.recovered;
            const combinedKey = cluster.properties.combinedKey;
            const {
                cluster: isCluster,
                point_count: pointCount
            } = cluster.properties;

            if (isCluster) {
                return (
                    <Marker
                    key={`cluster-${cluster.id}`}
                    latitude={latitude}
                    longitude={longitude}
                    >
                        <div
                        className="cluster-marker"
                        style={{
                            width: `${8 + (pointCount / 4) * 6}px`,
                            height: `${8 + (pointCount / 4) * 6}px`
                        }}
                        onClick={() => {
                            const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            20
                            );

                            setViewport({
                                ...viewport,
                                latitude,
                                longitude,
                                zoom: expansionZoom,
                                transitionInterpolator: new FlyToInterpolator({
                                    speed: 2
                                }),
                                transitionDuration: "auto"
                                });
                            }}
                        >
                            {pointCount}
                        </div>
                    </Marker>
                );
            }

            return (
                <Marker
                key={`crime-${cluster.properties.coronaId}`}
                latitude={latitude}
                longitude={longitude}
                >
                <button onClick={handleClick} className="crime-marker">
                    <img src= {logo2}  alt="crime doesn't pay" />
                </button>

                

                
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <div className={classes.paper}>
                        <Typography color="textSecondary">{combinedKey}</Typography>
                        <Typography variant="body2" component="p">Infected: {confirmed}</Typography>
                        <Typography variant="body2" component="p">Death: {deaths}</Typography>
                        <Typography variant="body2" component="p">Recovered: {recovered}</Typography>
                    </div>
                </Popper>
                </Marker>
            );

        })}

    </ReactMapGL>
        </div>
    );
}


export default Map;