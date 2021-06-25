import express from 'express';
import cors from 'cors'
import { countryHandler, allCountriesHandler, randomCountry } from './handlers.mjs';

const allowedOrigins = ['http://localhost:3000'];

const port = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: allowedOrigins
}));

app.get('/country/:code', countryHandler)
app.get('/allCountries', allCountriesHandler)
app.get('/randomCountry', randomCountry)

app.listen(port, (err) => {
  if (err) {
    console.error(`ERROR: ${err.message}`);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
