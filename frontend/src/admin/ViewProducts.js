import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./apiAdmin";
import { deleteProduct } from "./apiAdmin";
import { AuthContext } from "../store/auth-context";
import classes from "./ViewProducts.module.css";
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const auth = useContext(AuthContext);
  const token = auth.isAuthenticated().data.token;

  const viewProducts = () => {
    getProducts().then((res) => {
      setProducts(res.data.data.doc);
    });
  };

  useEffect(() => {
    viewProducts();
  }, []);

  const handleDelete = (productID) => {
    deleteProduct(token, productID)
      .then((res) => {
        viewProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.viewProducts}>
      {
        <table>
          <thead>
            <tr>
              <th>Product name</th>
              <th>Product price</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>
                  ${product.price}/{product.packaging}
                </td>
                <td>
                  <Link to={`/admin/products-update/${product._id}`}>
                    <button
                      className={classes.viewProductsUpdate}
                      title='Currently Unavailable'
                      disabled
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    className={classes.viewProductsDelete}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default ViewProducts;
