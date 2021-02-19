import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { fetchDailyData } from '../../api/';
import styles from './Chart.module.css';

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const fetchApi = await fetchDailyData();
      setDailyData(fetchApi);
    }

    fetchApi();
  }, [])
  //console.log(confirmed)


  const lineChart = (
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.death),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  //console.log(confirmed, deaths, recovered )

const PieChart2 = (
  confirmed ? (
    <Pie
      data={{
        labels: ['Confirmed', 'Deaths', 'Recovered'],
        datasets: [{
          data: [confirmed.value,deaths.value,recovered.value],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        },
        ],
      }}
    />
  ) : null
);
  return (
    <div className={styles.container}>
      {country ? PieChart2 : lineChart }

    </div>
  )
}

export default Chart