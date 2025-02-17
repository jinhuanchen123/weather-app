import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [location, setLocation] = useState(''); 
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;



  const fetchData = async (city) => {
    if (!city) return;
    
    const location_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    
    try {
      let response = await fetch(location_url);
      let data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Fetch New York's weather data on initial render
  useEffect(() => {
    fetchData('New York');  // Fetch New York weather by default
  }, []);  // Runs only once when the component mounts

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          className='cityInput'
          placeholder='Search Your City'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <div className='search-icon' onClick={() => fetchData(location)}>
          <FontAwesomeIcon icon={faSearch} className='search' size='2x' />
        </div>
      </div>
      
      {weatherData && weatherData.main ? (
        <div className='center-bar'>
          <div className='location'>{weatherData.name}</div>
          {weatherData.weather && weatherData.weather[0] && (
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              className='condition_icon'
            />
          )}
          <div className='temperature'>{Math.floor(weatherData.main.temp)} °C</div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}

      <div className='bottom-bar'>
        {weatherData?.main && <div className='humidity'>Humidity: {weatherData.main.humidity} %</div>}
        {weatherData?.wind && <div className='wind-speed'>Wind Speed: {Math.floor(weatherData.wind.speed)} m/s</div>}
      </div>
    </div>
  );
}

export default App;
