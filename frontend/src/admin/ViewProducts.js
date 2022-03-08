import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from './apiAdmin';
import { deleteProduct } from './apiAdmin';
import { AuthContext } from '../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const auth = useContext(AuthContext);
  const token = auth.isAuthenticated().data.token;

  const viewProducts = () => {
    getProducts().then((res) => {
      setProducts(res.data.data || []);
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
    <div className="view-products">
      <table className="table">
        <thead className="table-head">
          <tr className="table-head__row">
            <th className="table-head__data">Product name</th>
            <th className="table-head__data">Product price</th>
            <th className="table-head__data" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map((product) => (
            <tr key={product._id} className="table-body__row">
              <td className="table-body__data">{product.name}</td>
              <td className="table-body__data">
                ${product.price}/{product.packaging}
              </td>
              <td className="table-body__data">
                <Link to={`/admin/products-update/${product._id}`}>
                  <button
                    className="table-button table-update"
                    title="Currently Unavailable"
                    disabled
                  >
                    Update
                  </button>
                </Link>
                <button
                  className="table-button table-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
