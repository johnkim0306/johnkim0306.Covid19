import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { Cards, CountryPicker, Chart, Map, Table } from './components';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import styles from './App.css';
import { fetchData } from './api/';
import { Card, CardContent } from '@material-ui/core';


const App = () => {

  const [data, setData] = useState({});
  const [country, setCountry] = useState({});


  useEffect(async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
    fetchData();
  }, [])

  const handleCountryChange = async (country) => {
    const data = await fetchData(country);
    console.log(data)
    setData(data)
    setCountry(country)
  }

  return (
    <div className="app">
      
      <div className="app__left">
        <div className="app__header">
            <h1>COVID-19 Tracker</h1>
            <CountryPicker handleCountryChange={handleCountryChange} />
        </div>
        <Cards data= {data}/>
        <Map/>
      </div>

      <Card clasName="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Chart data={data} country={country} />
          <h3>Worldwide new cases</h3>
          <Table data={data} country={country}></Table>
        </CardContent>
      </Card>

    </div>
  )
}

export default App



