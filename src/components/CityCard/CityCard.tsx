import React from 'react'
import countryCodes from '../../constants/country'
import { IAirPolution, IWeatherResponse } from '../../types/temperatureType'
import styles from './CityCard.module.css' // Import the CSS module

interface CityCardProps {
  cityWeather?: IWeatherResponse
  airQuality?: IAirPolution
  cityName: string
  country: string
}

const CityCard: React.FC<CityCardProps> = ({
  cityWeather,
  cityName,
  airQuality,
  country,
}) => {
  const currentWeather = cityWeather && cityWeather.current
  const weatherIconUrl = `http://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}@4x.png`

  const temperatureCelsius = currentWeather
    ? (currentWeather.temp - 273.15).toFixed(1)
    : 20

  const humidity = currentWeather?.humidity
  const weatherDescription = currentWeather?.weather[0].description

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.cityInfo}>
          <h3>
            {cityName}, {temperatureCelsius}°C
          </h3>
          <p className={styles.country}>{countryCodes[country]}</p>
          <img
            src={weatherIconUrl}
            alt={weatherDescription}
            className={styles.weatherIcon}
          />
        </div>
      </div>
      <div className={styles.right}>
        <h3 className={styles.description}>{weatherDescription}</h3>
        <p>PM 10: {airQuality?.components.pm10}</p>
        <p>Humidity: {humidity}%</p>
        <p>Ветер: {currentWeather?.wind_speed} м/с</p>
      </div>
    </div>
  )
}

export default CityCard
