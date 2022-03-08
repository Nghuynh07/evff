import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const ProductContext = createContext({
  products: [],
  deleteProduct: (token, productId) => {},
  getProducts: () => {},
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await axios.get('http://localhost:4000/api/v1/products').then((res) => {
      setProducts(res.data.data);
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
    ).then((res) => {
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
    getProducts,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
