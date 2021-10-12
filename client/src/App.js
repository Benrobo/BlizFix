import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Home } from './pages/Home/Home';
import { Post } from './pages/Post/Post';
import "./main.css"
import { Upload } from './pages/Upload/Upload';
import { Signup } from './pages/Signup/Signup';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Navbar } from './comp/Navbar/Navbar';

// import 
function App() {
    return (
        <Router>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/post">
                <Post />
            </Route>
            <Route path="/upload">
                <Navbar />
                <Upload />
            </Route>
            <Route path="/profile">
                <Navbar />
                <Profile />
            </Route>
            <Route path="/signup">
                <Navbar />
                <Signup />
            </Route>
            <Route path="/login">
                <Navbar />
                <Login />
            </Route>
        </Router>
    );
}

export default App