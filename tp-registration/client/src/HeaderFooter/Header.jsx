import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <a className="navbar-brand text-white" href="/">
                    <h3>WHO</h3>
                </a>
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

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link header-links text-light" >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className="nav-link header-links text-light" >
                                Register
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  );
}

export default Header;
