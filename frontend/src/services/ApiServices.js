import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your actual backend URL
});

export default instance;
