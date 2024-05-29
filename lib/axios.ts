// lib/index.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/api', // Point to your local API route
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;