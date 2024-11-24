import Spinner from 'react-bootstrap/Spinner';
import './Loader.css';

const Loader = () => {
  return (
    <div className="spinner-container d-flex justify-content-center align-items-center pt-5 pb-5">
      <Spinner animation="border">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;