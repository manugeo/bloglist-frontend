import axios from 'axios';
const baseUrl = 'api/login';

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    console.log('Got login response :', response);
    return response ? response.data : null;
  } catch (error) {
    console.log('There was an error logging user...', error);
    return null;
  }
};

const loginService = { login };
export default loginService;