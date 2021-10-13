import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { Home } from './pages/Home/Home';
import { Post } from './pages/Post/Post';
import "./main.css"
import { Upload } from './pages/Upload/Upload';
import { Signup } from './pages/Signup/Signup';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';
import { Notfound } from './pages/Notfound/Notfound';
import { Navbar } from './comp/Navbar/Navbar';
import { checkAuth } from "./utils/checkAuth"

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
                {checkAuth() ?
                    <>
                        <Navbar />
                        <Upload />
                    </>
                    :
                    <Redirect to="/login" />
                }
            </Route>
            <Route path="/profile/:userId">
                <Navbar />
                <Profile />
            </Route>
            <Route path="/signup">
                {
                    checkAuth() ?
                        <Redirect to="/profile" />
                        :
                        <>
                            <Navbar />
                            <Signup />
                        </>

                }
            </Route>
            <Route path="/login">
                {
                    checkAuth() ?
                        <Redirect to="/" />
                        :
                        <>
                            <Navbar />
                            <Login />
                        </>

                }
            </Route>
            <Route path="/notfound">
                <Navbar />
                <Notfound />
            </Route>
            {/* <Route>
                <Redirect to="/notfound" />
            </Route> */}
        </Router>
    );
}

export default App