const BASE_URL = process.env.REACT_APP_WEATHER_URL;
const WEATHER_APP_ID = process.env.REACT_APP_WEATHER_ID;

const fetchClient = async (url: string, options: RequestInit) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  const endpoint = BASE_URL + url + `&appid=${WEATHER_APP_ID}`;

  options.headers = { ...defaultHeaders, ...options.headers };

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      if (response.status === 401) {
      }

      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchClient;
