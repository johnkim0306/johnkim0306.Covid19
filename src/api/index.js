import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }


  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};




export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);
      const modifiedData = data.map((dailyData) => ({
          confirmed: dailyData.confirmed.total,
          death: dailyData.deaths.total,
          date: dailyData.reportDate,
      }));

      return modifiedData;
    } catch (error) {
      return error;
    }
  }

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};

export const fetchConfirmed = async () => {
  try {
    const data = await axios.get(`${url}/confirmed`);
    return data;
  } catch (error) {
    return error;
  }
};