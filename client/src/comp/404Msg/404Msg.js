import React from 'react'
import { Link } from 'react-router-dom'
import "./404.css"

export const Message = () => {
    return (
        <div className="main-cont">
            <h1>Sorry the page you are looking for does not exist</h1>
            <Link to="/">
                <button className="btn btn-primary">Go Home</button>
            </Link>
        </div>
    )
}
