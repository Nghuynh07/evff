import axios from 'axios';

export const getProducts = async () => {
  return await axios.get(`/api/v1/products`);
};

export const listOrders = async (token) => {
  return await axios(`/api/v1/orders`, {
    method: `GET`,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': true,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, productID) => {
  return await axios(`/api/v1/products/${productID}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': true,
    },
  });
};
