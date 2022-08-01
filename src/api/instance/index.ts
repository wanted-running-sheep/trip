import axios from 'axios';
import { HttpRequest } from '@/api/http/httpRequest';

const baseURL = 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
});

export const apiRequest = new HttpRequest(axiosInstance);
