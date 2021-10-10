import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import "./style.css"

// import 
function App() {
    return (
        <Router>
            <Route path="/signup" exact>
                <Signup />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </Router>
    );
}

export default App