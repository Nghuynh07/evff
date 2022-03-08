import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  loading: false,
  deleteProduct: (token, productId) => {},
  getProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

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

  const getProducts = async () => {
    const res = await axios('/api/v1/products');
    return res.data;
  };

  // useEffect(() => {
  //   getProducts();
  // }, []);

  const values = {
    deleteProduct,
    loading,
    getProducts,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
