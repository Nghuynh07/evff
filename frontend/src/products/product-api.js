import axios from 'axios';
export const createProduct = async (token, object) => {
  return await axios(`/api/v1/products`, {
    method: `POST`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': true,
    },
    data: object,
  });
};
