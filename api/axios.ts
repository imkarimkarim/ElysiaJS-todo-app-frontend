import axios from 'axios';

export const theAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  //   withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor
theAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('🚀 - config', config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// // Add a response interceptor
// theAxios.interceptors.response.use(
//   function (response) {
//     console.log('🚀 - response', response);
//     console.log('mmd');

//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );
