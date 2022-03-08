import axios from 'axios';
export const createOrder = async (token, createOrderData) => {
  return await axios(`/api/v1/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true,
      Authorization: `Bearer ${token}`,
    },
    data: JSON.stringify({
      order: createOrderData,
    }),
  });
};
