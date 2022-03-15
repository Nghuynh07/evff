import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from '../components/Loading';
import { ProductContext } from '../store/product-context';
import { useViewHook } from '../hooks/view-hooks';

const ViewProducts = () => {
  const { getProducts, deleteProduct } = useContext(ProductContext);
  const { isAuthenticated } = useContext(AuthContext);
  const token = isAuthenticated().data.token;
  const { items, loading, error, view } = useViewHook(getProducts);

  useEffect(() => {
    view();
  }, []);

  const handleDelete = (productID) => {
    deleteProduct(token, productID);
  };

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Loading your products. Please wait..." />}
        {error && <Loading text={error} />}
      </div>
    );
  };

  return (
    <div className="view-products">
      {loadScreen()}
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
          {items.map((product) => (
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
