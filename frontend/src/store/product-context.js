import { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  products: [],
  loading: false,
  deleteProduct: (token, productId) => {},
  getProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
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
    try {
      await axios('/api/v1/products').then((res) => {
        setLoading(true);
        setProducts(res.data.data);
      });
    } catch (err) {}
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const values = {
    deleteProduct,
    loading,
    getProducts,
    products,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
