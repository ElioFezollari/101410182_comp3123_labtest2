import React, { useEffect, useState } from 'react';
import { perCityWeek } from '../services/weather';

function WeatherWeek({ lat, lon, city }) {
  const [weatherWeek, setWeatherWeek] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const getWeek = async () => {
      try {
        const response = await perCityWeek(lat, lon);
        setWeatherWeek(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Error loading week");
        setWeatherWeek(null);
      }
    };

    getWeek();
  }, [lat, lon]);

  return (
    <div className="weather-per-city-div ">
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : weatherWeek && weatherWeek.list ? (
        <div >
          <h1>Weather for {city} in the future</h1>
          <div className="forecast">
            {weatherWeek.list && weatherWeek.list.length > 0 ? (
              weatherWeek.list.slice(0, 7).map((day, index) => (
                <div key={index} className="daily-forecast weather-future">
                  <div className="daily-info ">
                    <h3>Weather for {day.dt_txt}</h3>
                    <img
                      className="weather-img"
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="weather icon"
                    />
                    <p>Temperature: {day.main.temp} °C</p>
                    <p>Description: {day.weather[0].description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No forecast data available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherWeek;
