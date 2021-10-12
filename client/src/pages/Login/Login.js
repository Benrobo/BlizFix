import React, { useState } from 'react'
import "./login.css"
import redirect from '../../utils/redirect'


export const Login = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
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
            let apiUrl = "http://localhost:5000/auth/login"
            let res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            let result = await res.json();

            if (result.status === 200 || result) {
                let tokens = {
                    accessToken: result.accessToken,
                    refreshToken: result.refreshToken
                }
                localStorage.setItem("tokens", JSON.stringify(tokens))
                redirect("/profile")
            }
            return;
            // if (result && result.status === 200 && result.msg) {
            //     setSuccess(result.msg);
            //     setError("");
            //     window.location = "/profile"
            //     return;
            // } else {
            //     console.log(result)
            //     setError(result.msg);
            //     setSuccess("")
            //     return;
            // }
        }
    }

    function handleRedirect(path) {
        window.location = "/"
    }

    return (
        <div>
            <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Login</h3>
                        <ion-icon name="close" className="close-form" onClick={handleRedirect}></ion-icon>
                        <br />
                        {error && <span className="failure">{error}</span>}
                        {success && <span className="success">{success}</span>}
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
                    </div>
                </form>
            </div>
        </div>
    )
}
