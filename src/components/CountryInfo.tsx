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

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = async () => {
    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();
      setCountry(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherInfo = async () => {
      try {
          const res = await fetch(`http://api.weatherstack.com/current?access_key=09276fa6e73a3c0e88013b6416c64880&query=india`)
          const data = await res.json();
          setWeatherInfo(data.current);

      }catch(error){
          console.log(error)
      }
  }
  return (
    <div>
      <div>
          <h2>This is country Info</h2>
          <p>Capital: {country?.capital}</p>
          <p>Population: {country?.population}</p>
          <p>Latlng: {country?.latlng}</p>
          <img style={{ width: "350px" }} src={country?.flags?.svg}    alt="_" />
      </div>
      <div>
          <button onClick={getWeatherInfo}>Capital Weather</button>
          <p>Tempareture: {weatherInfo?.temperature}</p>
          <p>Wind_Speed: {weatherInfo?.wind_speed}</p>
          <p>Percip: {weatherInfo?.precip}</p>
          <img style={{width: "30px"}} src={weatherInfo?.weather_icons[0]} alt="_" />
      </div>
    </div>
  );
};

export default CountryInfo;
