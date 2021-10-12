import React, { useState, useRef } from 'react'
import "./signup.css"

export const Signup = () => {
    const fileInput = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [image, setImage] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [profession, setProfession] = useState("")
    const [password, setPassword] = useState("")

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
                setTimeout(() => {
                    window.location = "/login"
                }, 2000);
                return;
            } else {
                setError(result.msg);
                setSuccess("")
                return;
            }
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
                        <h3>Signup</h3>
                        <ion-icon name="close" className="close-form" onClick={handleRedirect}></ion-icon>
                        <br />
                        {error && <span className="failure">{error}</span>}
                        {success && <span className="success">{success}</span>}
                    </div>
                    <div className="body">
                        <div className="file-cont">
                            <input type="file" onChange={"dfv"} ref={fileInput} style={{ display: "none", }} />

                            <button className="fileUpload" onClick={"dfvf"}>
                                Upload Image
                            </button>
                            <span className="filetext"></span>
                        </div>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="inp" />

                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="inp" />

                        <input type="text"
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="Profession" className="inp" />

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
