import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: `${country.name.common}`,
          appid: `${weather_api_key}`,
          units: 'metric'
        }
      })
      .then(response => setWeather(response.data))
  }, [weather_api_key, country.name])

  return (
    weather.length === 0 ?
      <div>
        <h2>Weather in: </h2>
        <p><b>Temperature</b>: </p>
        <p><b>Wind</b>:  direction </p>
      </div> 
      :
      <div>
        <h2>Weather in: {weather.name}</h2>
        <p><b>Temperature</b>: {weather.main.temp}</p>
        <p><b>Wind</b>: {weather.wind.speed} direction {weather.wind.deg}</p>
      </div>
  )
}

export default Weather