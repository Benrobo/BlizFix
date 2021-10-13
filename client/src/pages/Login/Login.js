import decode from 'jwt-decode'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import redirect from '../../utils/redirect'
import "./login.css"


export const Login = () => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSignup(e) {
        e.preventDefault()

        if (email === "" || password === "") {
            setError("All fields are requires")
            return;
        }
        else {
            let userData = {
                email,
                password
            }
            try {
                let apiUrl = "http://localhost:5000/auth/login"
                let res = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });

                let result = await res.json();
                // console.log(result)
                // return;
                if (result.status === 200 && result) {
                    let tokens = {
                        accessToken: result.accessToken,
                        refreshToken: result.refreshToken
                    }
                    localStorage.setItem("tokens", JSON.stringify(tokens))

                    // send user back to profile page with id
                    let { id } = decode(tokens.refreshToken)
                    redirect(`/profile/${id}`);
                }
                else if (result && result.status === 401) {
                    let msg = result.msg
                    setError(msg)
                }
            } catch (e) {
                setError("Something went wrong")
            }
        }
    }

    return (
        <div>
            <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Login</h3>
                        <ion-icon name="close" className="close-form" onClick={() => redirect("/")}></ion-icon>
                        <br />
                        {error && <span className="failure">{error}</span>}
                    </div>
                    <div className="body">

                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="inp" />

                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" className="inp" />
                        <br />
                        <button className="submit-btn" onClick={handleSignup}>
                            Submit
                        </button>
                        <br />
                        <small>Dont have an account? <Link to="/signup">Create One</Link></small>
                    </div>
                </form>
            </div>
        </div>
    )
}
