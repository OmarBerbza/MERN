import React from 'react';
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className='container-fluid '>
        <div className="container">
            <div className="row d-flex justify-content-evenly">
                <div className="col-ms-12 col-md-6">
                    <a className="navbar-brand text-white" href="/">
                        <h1 className='p-5'>WHO</h1>
                    </a>    
                </div> 
                
                <div className="col-ms-12 col-md-6">
                    <h4 className='text-light'>Helpful Links</h4>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/' className='nav-link footer-links text-light'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/register' className='nav-link footer-links text-light'>Register</Link>
                        </li>
                    </ul>
                </div> 
            </div>
        </div>
    </footer>
  )
}

export default Footer