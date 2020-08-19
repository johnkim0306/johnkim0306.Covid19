import React from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { Cards, CountryPicker, Chart, Map } from './components';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

//import Cards from './components/Cards/Cards';
//import Chart from './components/Chart/Chart'
//import CountryPicker from './components/CountryPicker/CountryPicker'


import styles from './App.module.css';
import { fetchData } from './api/';


class App extends React.Component {
 state = {
   data: {},
   country: '',
 }

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData});
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    console.log(data)

    this.setState({ data, country: country });
  }

  render() {
    //Deconstructing it from the state  
    const {data, country} = this.state;
    return (
      <div className={styles.container}>
          <Cards data= {data}/>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
          <Map/>

      </div>
    )
  }

}

export default App;
