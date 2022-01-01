import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../../api';
import "./Table.css";

function Table() {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
      const fetchApi = async () => {
        setDailyData(await fetchCountries());
      }


      fetchApi();
    }, [])

    console.log(dailyData)


    return (
        <div className="talbe">
            {dailyData.map((country) => (
                <p>{country.country}</p>
            ))}
        </div>


    );
  }


export default Table;
