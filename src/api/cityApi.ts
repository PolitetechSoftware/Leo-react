import { ICityResponse, IGetListCityParams } from '../types/cityType';
import fetchClient from './fetchClient';

const city_domain = '/geo/1.0/direct';

const cityApi = {
  getListByParams: async (
    body: IGetListCityParams
  ): Promise<ICityResponse[]> => {
    const queryString = new URLSearchParams({
      q: body.searchName,
      limit: `${body.limit}`,
    }).toString();
    const url = `${city_domain}?${queryString}`;
    return await fetchClient(url, {
      method: 'GET',
    });
  },
};

export default cityApi;
