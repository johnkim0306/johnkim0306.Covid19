import React, { useState, useEffect, useRef  } from "react";
import ReactMapGL, { NavigationControl, FlyToInterpolator, Marker, Popup } from "react-map-gl";
import { fetchConfirmed } from '../../api/';
import styles from './Map.css';
import useSupercluster from "use-supercluster";
import useSwr from "swr";
import logo from './1.jpg';



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
    console.log(confirmedData2);



    //const confirmedData2 = confirmedData.slice(0,100)
    const points = confirmedData2.map(crime => ({
        type: "Feature",
        properties: { cluster: false, crimeId: crime.uid, confirmed: crime.confirmed},
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(crime.long),
            parseFloat(crime.lat)
          ]
        }
    }));
    console.log(points);

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

    console.log(clusters)
    console.log(points);



/*
    useEffect(() => {
        const fetchApi = async () => {
            const {data} = await fetchConfirmed();
            setConfirmed(data)
        }
        fetchApi();
    }, []);
*/

    useEffect(() => {
        getA();
    }, []);

    /*
    if(!confirmedData2) {
        return 'Loading...';
    }

    const sweeterArray = confirmedData.map(sweetItem => {
        return sweetItem.long
    })
    */
   /*
    const fetchApi = async () => {
        const {data} = await fetchConfirmed();
        setConfirmed(data)
    }
    */

    /*
    const fetchDataWithSwr = async () => {
         const { data, error } = useSwr(url, { fetcher });
    }
    */

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

    /*
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
    */
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
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;
          console.log(cluster);

        if (isCluster) {
            console.log("Hello")
            return (
                <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
                >
                    <div
                    className="cluster-marker"
                    style={{
                        width: `${5 + (pointCount / 7) * 5}px`,
                        height: `${5 + (pointCount / 7) * 5}px`
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
              key={`crime-${cluster.properties.crimeId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="crime-marker">
                <img src= {logo}  alt="crime doesn't pay" />
              </button>
            </Marker>
        );

        })}

    </ReactMapGL>
        </div>
    );
}

export default Map;
//<img src= {require("/1.jpg")} alt="crime doesn't pay" />