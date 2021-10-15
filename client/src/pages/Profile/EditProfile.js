import React, { useState, useRef } from 'react'
import "./profile.css"

export const EditProfile = ({ hideForm, userData }) => {
    const [loading, setLoading] = useState(false);
    const [msg, setMessage] = useState("")
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profession, setProfession] = useState("");
    const [password, setPassword] = useState("");


    async function submitForm(e) {
        e.preventDefault()
        // validate form
        if (username === "" || password === "" || email === "" || profession === "") {
            alert("Field cant be empty")
            return;
        }
        if ((username.length > 20) || (profession.length > 20)) {
            alert("username profession length must be within 15")
            return
        }
        setLoading(true);
        let api = "http://localhost:5000/api/user/editUser"
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        const refreshToken = tokens.refreshToken;
        let res = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({ username, email, profession, password })
        })
        let result = await res.json();
        if (result.status === 200) {
            setLoading(false);
            setMessage("Profile Updated")
            setInterval(() => {
                window.location.reload(true)
            }, 1000);
            return;
        }
        else {
            setMessage("Something went wrong when updating profile")
            setLoading(false);
        }
    }

    function toggleForm() {
        hideForm()
    }

    return (
        <div className="profile-form-cont">
            <form className="form-group">
                <div className="head">
                    <h3>Edit Profile</h3>
                    <ion-icon name="close" className="close-form" onClick={toggleForm}></ion-icon>
                </div>
                <small className="text-info">{msg}</small>
                <div className="body">
                    <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="inp" />

                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="inp" />

                    <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="Profession" className="inp" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="inp" />

                    <br />
                    <button disabled={loading} className="submit-btn btn" onClick={submitForm}>
                        {loading ? "Loading ...." : "Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    )
}
