import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '0f5182d32a94fee0ac55505d84937d43'; // Replace with your API key
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeather = async (e) => {
    e.preventDefault();

    const cityName = city.trim();

    if (!cityName) {
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: 'metric', // Celsius temperature
        },
      });

      if (response.data) {
        setWeather(response.data);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An unknown error occurred');
      }
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={getWeather} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="city-input"
          />
          <button type="submit" className="search-button">
            Get Weather
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
            </div>
            <p className="weather-description">{weather.weather[0].description}</p>
            <div className="weather-info">
              <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
              <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
              <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
