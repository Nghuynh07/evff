import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  products: [],
  deleteProduct: (token, productId) => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get('/api/v1/products').then((res) => {
      setProducts(res.data.data);
    });
    return res;
  };

  const deleteProduct = async (token, productId) => {
    let productToBeDeleted = await axios(`/api/v1/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      getProducts();
    });
    return productToBeDeleted;
  };

  useEffect(() => {
    getProducts();
  }, []);

  const values = {
    products,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};