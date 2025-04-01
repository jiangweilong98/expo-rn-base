import HttpClient from '@/utils/http';

if (!process.env.EXPO_PUBLIC_API_URL) {
  throw new Error('Missing process.env.EXPO_PUBLIC_API_URL');
}
const http = new HttpClient(process.env.EXPO_PUBLIC_API_URL);

http.addRequestInterceptor(async (config) => {
  // console.log('Request interceptor', config);
  const headers = new Headers(config.headers);
  headers.set('Content-Type', 'application/json');
  return {
    ...config,
    headers,
  };
});

http.addResponseInterceptor(async (response) => {
  // console.log('Response interceptor', response);
  return response;
});

export default http;
