import axios from "axios";
import cache from 'memory-cache'

const url = "https://restcountries-v1.p.rapidapi.com";
const headers = {
  "x-rapidapi-key": "2b0e196206msh8f60da1c89a6d2ap179820jsna46ff9581b32",
  "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
};

const openContries = "https://restcountries.eu/rest/v2/all"

export const countryHandler = async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(`${url}/alpha/${code}`, { headers });
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response.data));
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const allCountriesHandler = async (req, res) => {
  try {
    const cachedVal = cache.get('all-countries')

    if(cachedVal) {
      res.setHeader("Content-Type", "application/json");
      res.send(cachedVal);
      return;
    }
    const response = await axios.get(openContries);
    if(response.error) {
      console.error(response.error);
      res.status(500).end();
    }
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(response.data));
    cache.put('all-countries', JSON.stringify(response.data))
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}

export const randomCountry = async (req, res) => {
    let countries = cache.get('allCountries')
    if(!countries) {
      const response = await axios.get(openContries);
      countries = response.data;
    }
    const randomCountry = countries[Math.floor(Math.random()*countries.length)];
    cache.put('allCountries', countries.filter(c => c.alpha2Code !== randomCountry.alpha2Code))
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(randomCountry));
}