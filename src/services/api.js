import api_config from '@/config/api';
import axios from 'axios';

export default axios.create({
  baseURL: `${api_config.BASE_URL}/api/`,
});