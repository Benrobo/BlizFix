import React from 'react'
import "./navbar.css"
import logo1 from '../../assets/img/logo/logo1.png'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="main">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo1} alt="" className="img-fluid" />
                        </Link>
                    </div>
                    <ul className="list">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
