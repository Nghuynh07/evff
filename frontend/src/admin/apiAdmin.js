import axios from 'axios';

export const listOrders = async (token) => {
  return await axios(`http://localhost:4000/api/v1/orders`, {
    method: `GET`,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': true,
      Authorization: `Bearer ${token}`,
    },
  });
};
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
