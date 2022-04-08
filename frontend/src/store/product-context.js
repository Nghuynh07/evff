import axios from 'axios';
import { createContext } from 'react';
export const ProductContext = createContext({
  getProducts: () => {},
  getOrders: () => {},
  getOrderHistory: () => {},
  createOrder: () => {},
  deleteProduct: () => {},
});

const url = '/api/v1/products';

export const ProductProvider = ({ children }) => {
  const getProducts = async () => {
    return await axios(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const createOrder = async (token, createOrderData) => {
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

  const getOrders = async (token) => {
    return await axios(`/api/v1/orders`, {
      method: `GET`,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const getOrderHistory = async (token) => {
    return await axios.get('/api/v1/orders/userOrderHistory', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const deleteProduct = async (token, productId) => {
    let productToBeDeleted = await axios(
      `http://localhost:4000/api/v1/products/${productId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => {});
    return productToBeDeleted;
  };
  const values = {
    getProducts,
    getOrders,
    getOrderHistory,
    createOrder,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
