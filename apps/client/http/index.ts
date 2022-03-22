import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  timeout: 8000,
  baseURL: 'http://localhost:4200/api',
});

export default $api;
