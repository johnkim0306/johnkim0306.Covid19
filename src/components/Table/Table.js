import React, { useState, useEffect } from 'react';
import { fetchCountriesWithFlag } from '../../api/';
import "./Table.css";

function Table() {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
      const fetchApi = async () => {
        const fetchApi = await fetchCountriesWithFlag();
        setDailyData(fetchApi);
      }

      fetchApi();
    }, [])

    return (
        <div className="talbe">
            {dailyData.map((country) => (
                <p>Hello, {country.country}</p>
            ))}
        </div>

    );
  }


export default Table;