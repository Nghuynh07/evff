import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const token = auth.isAuthenticated().data.token;

  useEffect(() => {
    const viewProducts = async () => {
      try {
        setLoading(true);
        axios.get('http://localhost:4000/api/v1/products').then((res) => {
          console.log(res.data.data);
          setProducts(res.data.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    viewProducts();
  }, []);

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

  const handleDelete = (productID) => {
    deleteProduct(token, productID);
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
          {loading &&
            products.map((product) => (
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
