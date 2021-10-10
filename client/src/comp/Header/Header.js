import React from 'react'
import "./header.css"
import "../../main.css"

export const Header = () => {
    return (
        <header className="header">
            <div className="ovl">
                <div className="container">
                    <div className="main">
                        <h1 className="display-4">Search BlizFix</h1>
                        <h5>Get 190+ Ideas and solution in tech</h5>
                        <br />
                        <div className="form-group form">
                            <input type="text" className="form-control search-inp" placeholder="Search...." />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
