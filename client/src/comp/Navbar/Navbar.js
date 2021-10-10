import React from 'react'
import "./navbar.css"
import logo1 from '../../assets/img/logo/logo1.png'

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="main">
                    <div className="logo">
                        <img src={logo1} alt="" className="img-fluid" />
                    </div>
                    <ul className="list">
                        <li>
                            <small>Home</small>
                        </li>
                        <li>
                            <button className="btn create-acct-btn">Create Account</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
