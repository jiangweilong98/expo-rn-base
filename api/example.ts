import HttpClient from '@/utils/http';

if (!process.env.EXPO_PUBLIC_EXAMPLE_API_URL) {
  throw new Error('Missing process.env.EXPO_PUBLIC_EXAMPLE_API_URL');
}
export const http = new HttpClient(process.env.EXPO_PUBLIC_EXAMPLE_API_URL);

http.addRequestInterceptor(async (config) => {
  // console.log('Request interceptor', config);
  const headers = new Headers(config.headers);
  headers.set('Content-Type', 'application/json');
  // headers.set('Authorization', 'Bearer 123');
  return {
    ...config,
    headers,
  };
});

http.addResponseInterceptor(async (response) => {
  // console.log('Response interceptor', response);
  return response;
});

export const getUUID = async (options = {}) => {
  const { data } = await http.get('/uuid', options);
  return data;
};

export const getAnything = async (body: any, options = {}) => {
  const { data } = await http.post('/anything', body, options);
  return data;
};
