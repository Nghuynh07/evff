import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  products: [],
  loading: false,
  deleteProduct: (token, productId) => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    const getProducts = async () => {
      await axios('http://localhost:4000/api/v1/products').then((res) => {
        setLoading(true);
        setProducts(res.data.data);
      });
    };
    getProducts();
  }, []);

  const values = {
    products,
    deleteProduct,
    loading,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
