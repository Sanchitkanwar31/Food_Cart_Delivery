import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const isAuthenticated = localStorage.getItem("authtoken");

  const fadeInStyle = {
    fontFamily: "'Roboto', sans-serif",
    color: '#ff5733',
    animation: 'fadeIn 3s ease-in-out',
  };
  
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  

  return (
    <div>
      <style>{keyframes}</style>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark   background: linear-gradient(to right, black, green);"  style={fadeInStyle}>

        <div className="container-fluid text-info">
          
          <Link className="navbar-brand fw-bold fst-italic" to="#"  style={{ color: 'black' }} > <h1>Foodie Delivery</h1></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-50 fst-italic" aria-current="page" to="#"  style={{ color: '#ff5733' }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#"  style={{ color: '#ff5733' }}>
                  Menu
                </Link>
              </li>

              <li className="nav-item dropdown" >
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: '#ff5733' }}
                >
                  More
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Something else
                    </Link>
                  </li>
                </ul>
              </li>
              <Link className="nav-link active fs-50 fst-italic" to="/category">
                  Create Category
                </Link>

              <Link className="nav-link active fs-50 fst-italic" to="/createfood">
                  Create Food
                </Link>
            </ul>

            {/* Conditional rendering based on authentication */}
            <div className="d-flex">
              {!isAuthenticated ? (
                  <div>
                <Link className="btn btn-outline-primary mx-1 bg-black" to="/signup">
                    SignUp
                  </Link>
                  <Link className="btn btn-outline-primary mx-1 bg-black" to="/login">
                    Login
                  </Link>
                </div>
              ) : (
                <>
                  <Link className="btn btn-outline-primary  mx-1 bg-black" to="/cart">
                    My Cart
                  </Link>
                  <button
                    className="btn btn-outline-danger bg-black mx-1"
                    onClick={() => {
                      localStorage.removeItem("authtoken");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
