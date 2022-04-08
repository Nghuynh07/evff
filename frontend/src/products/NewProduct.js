import React, { useEffect } from 'react';
// import Input from '../components/Input';
import { useProduct } from './use-product-hook';

const NewProduct = () => {
  const { product, categories, inputChangeHandler, onSubmit, setProduct } =
    useProduct();
  useEffect(() => {
    setProduct({ ...product, formData: new FormData() });
  }, []);

  return (
    <div className="product-form-wrapper hidden">
      <form className="product-form" onSubmit={onSubmit}>
        <h2 className="product-form-title">New Product</h2>

        <div className="error-wrapper">{}</div>
        <input
          accept="image/*"
          type="file"
          name="photo"
          className="product-form-input"
          htmlFor="photo"
          onChange={inputChangeHandler}
        />

        <div className="error-wrapper">{}</div>
        <input
          type="text"
          name="name"
          className="product-form-input"
          htmlFor="name"
          onChange={inputChangeHandler}
          placeholder="Product Name"
        />
        <div className="error-wrapper">{}</div>
        <input
          type="text"
          name="price"
          className="product-form-input"
          htmlFor="price"
          step="0.01"
          onChange={inputChangeHandler}
          placeholder="Product Price"
        />
        <div className="error-wrapper">{}</div>
        <input
          type="text"
          name="packaging"
          className="product-form-input"
          htmlFor="packaging"
          onChange={inputChangeHandler}
          placeholder="Product Packaging"
        />
        <div className="error-wrapper">{}</div>
        <select name="category" className="product-form-input">
          {/* <option value="" className="form-category-option"></option> */}
          {categories.map((cat, index) => (
            <option
              key={index}
              className="product-form-category-option"
              onChange={(event) => inputChangeHandler(event)}
            >
              {cat}
            </option>
          ))}
        </select>

        <button className="form-product-btn product-btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
