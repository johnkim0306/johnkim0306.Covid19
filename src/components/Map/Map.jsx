import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, FlyToInterpolator, Marker, Popup } from "react-map-gl";
import { fetchConfirmed } from '../../api/';
import styles from './Map.module.css';

const mapbox_token = "pk.eyJ1Ijoiam9obmswMzA2IiwiYSI6ImNrZGhtcWdjbTAxN2wyeGs2djEwdmp4MmkifQ.10oHb3YnNenJtaPaBYcVIg"


const Map = () => {
    const [confirmedData, setConfirmed] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const {data} = await fetchConfirmed();
            setConfirmed(data)
        }
        fetchApi();
    }, []);


    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "60vw",
        height: "60vh",
        zoom: 2
      });

    const storeList = [
        { name: 'CU', location: [37.565964, 126.986574] },
        { name: 'lysol', location: [37.564431, 126.986591] },
        { name: '711', location: [37.565188, 126.983238] },
        { name: 'paris bar', location: [37.564869, 126.984450] },
        { name: 'starbucks', location: [37.562003, 126.985829] }
    ];

    if(!confirmedData) {
        return 'Loading...';
    }
    const sweeterArray = confirmedData.map(sweetItem => {
        return sweetItem.long
    })



    function long_lat_null_check(store, i) {
        if (store.lat != null && store.long != null) {
            return (
                <Marker
                    key={i}
                    latitude={parseFloat(store.lat)}
                    longitude={parseFloat(store.long)}
                >
                <button
                    className="btn-marker"
                />
                </Marker>
            )
        }

    }

    const map = (
        <ReactMapGL
            {...viewport}
            transitionDuration={800}
            transitionInterpolator={new FlyToInterpolator()}
            mapboxApiAccessToken= "pk.eyJ1Ijoiam9obmswMzA2IiwiYSI6ImNrZGhtcWdjbTAxN2wyeGs2djEwdmp4MmkifQ.10oHb3YnNenJtaPaBYcVIg"
            mapStyle = "mapbox://styles/johnk0306/ckdia402j0dwm1io2p4d1bst8"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
        >

        <div className="navi-control">
            <NavigationControl />
        </div>

        {
            confirmedData.map(long_lat_null_check)
        }


        </ReactMapGL>
    )

    return (
        <div className={styles.container}>
            {confirmedData ? map : sweeterArray }
        </div>  

    ) 
}

export default Map;