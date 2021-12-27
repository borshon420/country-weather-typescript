import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface InitProps {
  name: string;
}

interface InitCountry {
  capital: string[];
  population: number;
  latlng: number[];
  flags: {
    svg: string;
  };
}

interface InitCountryInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}


const CountryInfo: React.FC = () => {
  const { name } = useParams<InitProps>();
  const [country, setCountry] = useState<InitCountry>();
  const [weatherInfo, setWeatherInfo] = useState<InitCountryInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      setCountry(data[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getWeatherInfo = async () => {
      try {
        setWeatherLoading(true);
          const res = await fetch(`http://api.weatherstack.com/current?access_key=09276fa6e73a3c0e88013b6416c64880&query=india`)
          const data = await res.json();
          setWeatherInfo(data.current);
          setWeatherLoading(false);

      }catch(error){
        setWeatherLoading(false);
          console.log(error)
      }
  }
  return (
    <div>
       <h1>Country Info</h1>
            {
                loading ? <p>Loading...</p> :
                    country ? <div className="country-content">
                        <div className="left">
                            <p>Capital: {country.capital[0]}</p>
                            <p>Population: {country.population}</p>
                            <p>Latitude: {country.latlng[0]}<sup>o</sup></p>
                            <p>Longitude: {country.latlng[1]}<sup>o</sup></p>
                        </div>

                        <div className="right">
                            <img src={country.flags.svg} alt="_" />
                        </div>
                    </div> : <h3>Country not found by name: {name}</h3>
            }
            {
                country && <Button
                    size="medium"
                    variant="contained"
                    onClick={getWeatherInfo}
                >
                    Capital Weather
                </Button>
            }

{
                weatherLoading ? <p>Loading...</p> :
                    weatherInfo && <div className="weather-info">
                        <h3>{country?.capital[0]} Weather Info</h3>
                        <div className="weather-content">
                            <img src={weatherInfo.weather_icons[0]} alt="_" />
                            <p>Temperature: {weatherInfo.temperature}<sup>o</sup></p>
                            <p>Wind Speed: {weatherInfo.wind_speed}</p>
                            <p>Precip: {weatherInfo.precip}</p>
                        </div>
                    </div>
            }
    </div>
  );
};

export default CountryInfo;
