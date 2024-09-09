import { useEffect, useState } from 'react';
import { IAirPolution, IGetTemperatureParams } from '../types/temperatureType';
import temperatureApi from '../api/temperatureApi';

interface UseAirQualityResult {
  data: IAirPolution | null;
  isLoading: boolean;
  error: string | null;
}

const useAirQuality = (lat?: number, lon?: number): UseAirQualityResult => {
  const [data, setData] = useState<IAirPolution | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      (async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await temperatureApi.getCurrentAirQuality({
            lat,
            lon,
          });
          const airQualityData = response.list[0]; // Assuming the first element is the most recent data
          setData(airQualityData);
        } catch (err) {
          setError('Failed to fetch air quality data');
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [lat, lon]);

  return { data, isLoading, error };
};

export default useAirQuality;
