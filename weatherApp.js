import React, { useState } from 'react';
import ReactDOM from "react-dom"

import './weatherApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import config from '../../private-config'; // Import API key from private-config.js

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = config.API_KEY;

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  }

  const fetchData = async () => {
    if (location === '') {
      return;
    }
    const location_url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    try {
      let response = await fetch(location_url);
      let data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          className='cityInput bigger-text'
          placeholder='Search Your City'
          value={location}
          onChange={handleInputChange}
        />
        <div className='search-icon' onClick={fetchData}>
          <FontAwesomeIcon icon={faSearch} className='search' size='2x' />
        </div>
      </div>
      {weatherData && (
        <div className='center-bar'>
          <div className='location'>{weatherData.name}</div>
          {weatherData.weather && weatherData.weather[0] && (
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className='condition_icon'
            />
          )}
          {weatherData.main && (
            <div className='temperature'>{Math.floor(weatherData.main.temp)} °C </div>
          )}
        </div>
      )}
      <div className='bottom-bar'>
        {weatherData && (
          <>
            {weatherData.main && (
              <div className='humidity'>Humidity: {weatherData.main.humidity} % </div>
            )}
            {weatherData.wind && (
              <div className='wind-speed'>Wind Speed: {Math.floor(weatherData.wind.speed)} m/s</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<WeatherApp/>, document.getElementById('root'))

export default WeatherApp;
