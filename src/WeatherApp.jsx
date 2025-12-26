import { useState } from 'react';
import './WeatherApp.css';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


  const searchWeather = async () => {
    if(!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    try{
      setLoading(true);
      setError('');

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);

      if(!response.ok) {
        throw new Error('City not found! Try another city.');
      }

      const data = await response.json();
      setWeather(data);
    } catch(err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      searchWeather();
    }
  };

  return (
    <div className='weather-app'>
      <div className='container'>
        <h1>Weather App</h1>

        {/* Search Bar */}
        <div className='search-box'>
          <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Enter city name...'
            className="search-input"
            />
            <button 
              onClick={searchWeather}
              disabled={loading}
              className='search-btn'
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className='error-message'>{error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className='loading'>
            <div className='spinner'></div>
            <p>Loading weather data...</p>
            </div>
        )}

        {/* Weather Data */}
        {weather && !loading && (
          <div className='weather-card'>
            <h2>{weather.name}, {weather.sys.country}</h2>

            <div className='weather-icon'>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                />
               </div>

               <div className='description'>
                {weather.weather[0].description}
                </div>

                <div className='details'>
                  <div className='detail-item'>
                    <span className='label'>Feels Like</span>
                    <span className='value'>
                    {Math.round(weather.main.feels_like)}°C
                    </span>

                  </div>

                  <div className='detail-item'>
                    <span className='label'>Humidity</span>
                    <span className='value'>{weather.main.humidity}%</span>
                  </div>

                  <div className='detail-item'>
                    <span className='label'>Wind Speed</span>
                    <span className='value'>{weather.wind.speed}m/s</span>
                  </div>

                  <div className='detail-item'>
                    <span className='label'>Pressure</span>
                    <span className='value'>{weather.main.pressure}hPa</span>
                  </div>
                  </div>
                  </div>

        )}

      </div>
    </div>
  );
}

export default WeatherApp;