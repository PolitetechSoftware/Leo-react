import { useContext, useMemo, useState } from 'react'
import styles from './App.module.css'
import CityCard from './components/CityCard/CityCard'
import SearchInput from './components/SearchInput/SearchInput'
import MultiRangeSlider from './components/TemperatureFilter/MultiRangeSlider'
import useCityWeather from './hooks/useCitiesWeather'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import {
  TemperatureContext,
  TemperatureContextType,
} from './context/TemperatureContext'

function App() {
  const [searchCityName, setSearchCityName] = useState('')
  const { minValue, maxValue } = useContext(TemperatureContext)

  const { cities, isLoading } = useCityWeather(searchCityName, 10)
  const citiesWithTempFilter = useMemo(() => {
    return cities.filter(city => {
      const currentTemp = city.temperature
        ? city.temperature?.current.temp - 273.15
        : 0
      return currentTemp >= minValue && currentTemp <= maxValue
    })
  }, [minValue, maxValue, cities])
  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <SearchInput setSearchCityName={setSearchCityName} />
        <MultiRangeSlider />
        {isLoading && <div className={styles.spinner}></div>}
        <div>
          {citiesWithTempFilter.map(city => (
            <CityCard
              key={`${city.lat}-${city.lon}`}
              cityName={city.name}
              country={city.country}
              cityWeather={city.temperature}
              airQuality={city.airQuality}
            />
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
