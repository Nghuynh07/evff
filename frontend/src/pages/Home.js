import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container flex-center">
      <div className="home-infos">
        <h1 className="home-heading hidden">
          Echo<span>Valley</span>
        </h1>
        <p className="family-owned hidden">family owned business</p>
        <div className="home-text-wrapper">
          <p className="home-text hidden">
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software
          </p>
        </div>
        <div className="home-actions center">
          <Link to="/signup" className="home-signup-btn signup-btn hidden">
            Sign Up
          </Link>
          <Link
            className="home-signup-btn shop-btn hidden"
            to="/shop"
            title="Shop"
          >
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
