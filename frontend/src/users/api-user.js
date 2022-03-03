import axios from 'axios';
export const getUserOrderHistory = async (token) => {
  return await axios.get(
    'http://localhost:4000/api/v1/orders/userOrderHistory',
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true,
        Authorization: `Bearer ${token}`,
      },
    }
  );
};