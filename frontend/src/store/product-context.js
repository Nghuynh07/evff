import { createContext, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  deleteProduct: (token, productId) => {},
  getProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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

  const getProducts = useCallback(async () => {
    await axios('http://localhost:4000/api/v1/products');
  }, []);

  useEffect(() => {}, []);

  const values = {
    deleteProduct,
    getProducts,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
