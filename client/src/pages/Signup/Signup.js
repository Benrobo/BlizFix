import React, { useState } from 'react'
import "./signup.css"
import redirect from "../../utils/redirect"

export const Signup = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [username, setUsername] = useState("John Doe")
    const [email, setEmail] = useState("john@mail.com")
    const [profession, setProfession] = useState("Software Engineer")
    const [password, setPassword] = useState("1234")

    async function handleSignup(e) {
        e.preventDefault()
        if (username === "" || email === "" || profession === "" || password === "") {
            setError("All fields are requires")
            return;
        }
        else {
            let userData = {
                username,
                email,
                profession,
                password
            }

            // console.log(newData)
            let apiUrl = "http://localhost:5000/auth/register"
            let res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            let result = await res.json();

            if (result && result.status === 200 && result.msg) {
                setSuccess(result.msg);
                setError("");
                redirect("/login")
                return;
            } else {
                setError(result.msg);
                setSuccess("")
                return;
            }
        }
    }

    return (
        <div>
            <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Signup</h3>
                        <ion-icon name="close" className="close-form" onClick={(e) => redirect("/")}></ion-icon>
                        <br />
                        {error && <span className="failure">{error}</span>}
                        {success && <span className="success">{success}</span>}
                    </div>
                    <div className="body">
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} className="inp" />

                        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} className="inp" />

                        <input type="text"
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="Profession" value={profession} className="inp" />

                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" value={password} className="inp" />
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
