import React, { useEffect } from 'react';
import Input from '../components/Input';
import { useProduct } from './use-product-hook';
import { createProduct } from './product-api';
import FormLayout from '../layout/FormLayout';
const NewProduct = () => {
  const { product, categories, inputChangeHandler, onSubmit, setProduct } =
    useProduct(createProduct);
  useEffect(() => {
    setProduct({ ...product, formData: new FormData() });
  }, []);

  return (
    <FormLayout>
      <form className="form" onSubmit={onSubmit}>
        <h2 className="form-title">New Product</h2>
        <div>
          <label className="form-label">
            <input
              accept="image/*"
              type="file"
              name="photo"
              className="input-input"
              onChange={inputChangeHandler}
            />
          </label>
        </div>
        <Input
          label="Name"
          type="text"
          name="name"
          for="name"
          id="name"
          onChange={inputChangeHandler}
        />

        <Input
          label="Price"
          type="number"
          name="price"
          for="price"
          id="price"
          onChange={inputChangeHandler}
        />

        <Input
          label="Packaging"
          type="text"
          name="packaging"
          for="packaging"
          id="packaging"
          onChange={inputChangeHandler}
        />
        <div className="form-category">
          <label className="form-category-label">Category</label>
          <select name="category" className="form-category-select">
            <option value="" className="form-category-option"></option>
            {categories.map((cat, index) => (
              <option
                key={index}
                className="form-category-option"
                onChange={(event) => inputChangeHandler(event)}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button className="form-add-production-button" type="submit">
          Add Product
        </button>
      </form>
    </FormLayout>
  );
};

export default NewProduct;
