import { useState, useEffect } from 'react';
import cityApi from '../api/cityApi';
import temperatureApi from '../api/temperatureApi';
import { ICityResponse } from '../types/cityType';

const useCityWeather = (searchName: string, limit: number) => {
  const [cities, setCities] = useState<ICityResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchName) return;
    else {
      const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const cityList = await cityApi.getListByParams({ searchName, limit });
          const citiesWithTemperature = await Promise.all(
            cityList.map(async (city) => {
              const temperature = await temperatureApi.getTemperatureByLatLon({
                lat: city.lat,
                lon: city.lon,
              });
              const airQuality = await temperatureApi.getCurrentAirQuality({
                lat: city.lat,
                lon: city.lon,
              });
              return { ...city, temperature, airQuality: airQuality.list[0] };
            })
          );

          setCities(citiesWithTemperature);
        } catch (err: any) {
          setError(err.message || 'Something went wrong');
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [searchName, limit]);

  return { cities, isLoading, error };
};

export default useCityWeather;
