import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://shop-app-61e63.firebaseio.com/',
});

export const sendHttpRequest = async (url, method, data, headers) => {
  const response = await apiInstance({
    url,
    method,
    data,
    headers: { ...headers },
  });
  return response.data;
};
