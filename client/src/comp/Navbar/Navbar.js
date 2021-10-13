import React from 'react'
import logo1 from '../../assets/img/logo/logo1.png'
import { Link } from 'react-router-dom'
import { checkAuth } from "../../utils/checkAuth"
import redirect from '../../utils/redirect'
import decode from 'jwt-decode'
import "./navbar.css"
import "../../main.css"

export const Navbar = () => {

    async function handleLogout(e) {
        e.preventDefault();

        let tokens = JSON.parse(localStorage.getItem("tokens"));

        if (!tokens) {
            alert("Something went wrong when trying to logout, please try again");
            return;
        }

        let refreshToken = tokens.refreshToken;
        let api = "http://localhost:5000/auth/logout"
        let req = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${refreshToken}`
            },
        })
        let res = await req.json();

        if (res && res.status === 200) {
            let tokens = JSON.parse(localStorage.getItem("tokens"));

            tokens.refreshToken = "";
            tokens.accessToken = "";

            localStorage.setItem("tokens", JSON.stringify(tokens))

            redirect("/login")
        }

    }

    // get user id from token
    let tokens = JSON.parse(localStorage.getItem("tokens"));
    let profilePath = ""
    try {
        let { id } = decode(tokens.refreshToken)
        if (tokens || tokens.refreshToken !== "") {
            profilePath = `/profile/${id}`;
        }
        else {
            profilePath = "/login"
        }
    } catch (e) {
        profilePath = "/login"
    }

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
                        {!checkAuth() ?
                            <>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link to={profilePath}>Profile</Link>
                                </li>
                                <li>
                                    <Link to="/upload">Upload</Link>
                                </li>
                                <li>
                                    <Link to="" onClick={handleLogout} className="logout">Logout</Link>
                                </li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </nav>
    )
}
