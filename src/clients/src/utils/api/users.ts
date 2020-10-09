import axios from 'axios';

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('/api/users');
    return response;
  } catch (error) {
    return error;
  }
};
