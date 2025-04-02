import http from '@/api';

export const login = async (body: any, options = {}) => {
  const { data } = await http.post('/login', body, options);
  return data;
};
