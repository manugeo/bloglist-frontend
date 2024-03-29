import axios from 'axios';
import { token } from './blogs';
const baseUrl = '/api/users';


const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const usersService = { getAll };
export default usersService;