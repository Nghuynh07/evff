import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../store/auth-context';

export const useProduct = (createProduct) => {
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    photo: '',
    packaging: '',
    category: '',
    success: false,
    loading: false,
    error: '',
    formData: '',
  });

  const {
    data: { token },
  } = auth.isAuthenticated();

  const categories = [
    'Fruits',
    'Vegetables',
    'Herbs',
    'Eggs',
    'Dairy',
    'Poultry',
  ];

  const { formData } = product;

  const inputChangeHandler = useCallback(
    (event) => {
      let value =
        event.target.name === 'photo'
          ? event.target.files[0]
          : event.target.value;
      formData.set(event.target.name, value);
      setProduct({ ...product, [event.target.name]: value });
    },
    [product, formData]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setProduct({ ...product, loading: true });
    createProduct(token, formData)
      .then((data) => {
        setProduct({
          ...data,
          success: true,
          loading: false,
        });
      })
      .catch((err) => {
        setProduct({ ...product, loading: false, success: false });
        console.log(err.response.data);
      });
  };

  return {
    product,
    categories,
    inputChangeHandler,
    onSubmit,
    setProduct,
  };
};
