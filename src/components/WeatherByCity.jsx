import React, { useState, useEffect } from "react";
import perCity from "../services/weather";
import CitySearchBar from "./CitySearchBar";
import WeatherWeek from "./WeatherWeek";

function WeatherByCity() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Toronto");
  const [error, setError] = useState(null);


  console.log(weather)
  useEffect(() => {
    const getPerCity = async () => {
      try {
        const response = await perCity(city);
        setWeather(response);
        setError(null);
        console.log("Weather Data:", response);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Error loading city");
        setWeather(null);
      }
    };

    getPerCity();
  }, [city]);

  return (
    <div className="weather-per-city-div">
      <CitySearchBar city={city} setCity={setCity} />
      {error ? (
        <p style={{ color: "red" }}>This city does not exist</p>
      ) : weather ? (
        <div>
          <div className="city-info">
            <h1>Weather for {city}</h1>{" "}
            <img
              src={`https://flagsapi.com/${weather.sys.country}/flat/64.png`}
              alt={`${weather.sys.country}`}
            />
          </div>

          <div className="weather-info">
            <img
              className="weather-img"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt=""
            />
            <h3 className="weather-info-weather">
              Weather: {weather.weather[0].main}
            </h3>
            <div className="inner-content">
              <div className="main-subdiv">
                <h3>Main Info</h3>
                <div>
                  {" "}
                  <p>Description: {weather.weather[0].description}</p>
                  <p>Temperature: {weather.main.temp} K</p>
                  <p>Feels Like: {weather.main.feels_like} K</p>
                  <p>Min Temperature: {weather.main.temp_min} K</p>
                  <p>Max Temperature: {weather.main.temp_max} K</p>
                  <p>Pressure: {weather.main.pressure} hPa</p>
                  <p>Humidity: {weather.main.humidity} %</p>
                  <p>Sea Level Pressure: {weather.main.sea_level} hPa</p>
                  <p>Ground Level Pressure: {weather.main.grnd_level} hPa</p>
                </div>
              </div>

              <div className="main-subdiv">
                <h3>Visibility</h3>
                <div>
                  <p>Visibility: {weather.visibility / 1000} km</p>
                </div>
              </div>
              <div className="main-subdiv">
                <h3>Wind</h3>
                <div>
                  <p>Wind Speed: {weather.wind.speed} m/s</p>
                  <p>Wind Direction: {weather.wind.deg}°</p>
                </div>
              </div>
              <div className="main-subdiv">
                <h3>Clouds</h3>
                <div>
                  <p>Cloud Coverage: {weather.clouds.all} %</p>
                </div>
              </div>
            </div>
            <WeatherWeek lat={weather.coord.lat} lon={weather.coord.lon} city={city}/>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherByCity;
