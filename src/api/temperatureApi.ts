import {
  IAirQualityResponse,
  IGetTemperatureParams,
  IWeatherResponse,
} from '../types/temperatureType';
import fetchClient from './fetchClient';

const temperature_domain = '/data/3.0/onecall';
const air_quality_domain = '/data/2.5/air_pollution';

const temperatureApi = {
  getTemperatureByLatLon: async (
    body: IGetTemperatureParams
  ): Promise<IWeatherResponse> => {
    const queryString = new URLSearchParams({
      lat: `${body.lat}`,
      lon: `${body.lon}`,
    }).toString();

    const url = `${temperature_domain}?${queryString}`;

    return await fetchClient(url, {
      method: 'GET',
    });
  },

  getCurrentAirQuality: async (
    body: IGetTemperatureParams
  ): Promise<IAirQualityResponse> => {
    const queryString = new URLSearchParams({
      lat: `${body.lat}`,
      lon: `${body.lon}`,
    }).toString();
    const url = `${air_quality_domain}?${queryString}`;
    return await fetchClient(url, {
      method: 'GET',
    });
  },
};

export default temperatureApi;
