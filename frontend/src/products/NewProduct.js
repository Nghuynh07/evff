import React, { useEffect } from 'react';
import Input from '../components/Input';
import { useProduct } from './use-product-hook';
import Button from '../components/Button';
import { createProduct } from './product-api';
import classes from '../css-ultils/form.module.css';
const NewProduct = () => {
  const { product, categories, inputChangeHandler, onSubmit, setProduct } =
    useProduct(createProduct);

  const { name, price, packaging, category, success, formData } = product;

  useEffect(() => {
    setProduct({ ...product, formData: new FormData() });
  }, []);

  return (
    <>
      {success && <p>Product Created</p>}

      <form className={classes.form} onSubmit={onSubmit}>
        <h2>New Product</h2>
        <div>
          <label>
            <input
              accept="image/*"
              type="file"
              name="photo"
              className="form-control"
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
          // value={name}
          onChange={inputChangeHandler}
        />

        <Input
          label="Price"
          type="number"
          name="price"
          for="price"
          id="price"
          // value={price}
          onChange={inputChangeHandler}
        />

        <Input
          label="Packaging"
          type="text"
          name="packaging"
          for="packaging"
          id="packaging"
          // value={packaging}
          onChange={inputChangeHandler}
        />
        <div>
          <label>Category</label>
          <select name="category">
            <option value=""></option>
            {categories.map((cat, index) => (
              <option
                key={index}
                // value={category}
                onChange={(event) => inputChangeHandler(event)}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button name="add product" type="submit" />
      </form>
    </>
  );
};

export default NewProduct;
