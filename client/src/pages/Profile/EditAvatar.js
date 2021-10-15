import React, { useState } from 'react'
import "./profile.css"

export const EditAvatar = ({ hideForm }) => {
    const [msg, setMessage] = useState("")
    const [username, setUsername] = useState("Your Name");
    const [loading, setLoading] = useState(false);

    async function submitForm(e) {
        e.preventDefault()

        // validate name
        if (username === "") {
            alert("Field cant be empty")
            return;
        }

        if (username.length > 15) {
            alert("Username length must be within 15")
            return
        }
        // if(inputRef.current.value.length)
        setLoading(true);
        let api = "http://localhost:5000/api/file/upload"
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        const refreshToken = tokens.refreshToken;
        let res = await fetch(api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({ image: `https://avatars.dicebear.com/api/micah/${username}.svg` })
        })
        let result = await res.json();
        if (result.status === 200) {
            setLoading(false);
            setMessage("Profile pics uploaded successfully")
            setInterval(() => {
                window.location.reload(true)
            }, 1000);
            return;
        }
        else {
            setMessage("Something went wrong when uploading image")
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
                    <h3>Set Avatar</h3>
                    <ion-icon name="close" className="close-form" onClick={toggleForm}></ion-icon>
                </div>
                <div className="body">
                    <small className="text-info">{msg}</small>
                    <br />
                    <small>https://avatars.dicebear.com/api/micah/{<kbd>Your Name</kbd>}</small>
                    <div className="file-cont">
                        <br />
                        <input type="url" placeholder="" className="inp" onChange={(e) => setUsername(e.target.value)} value={username} />
                    </div>
                    <br />
                    <button disabled={loading} className="submit-btn btn" onClick={submitForm}>
                        {loading ? "Loading..." : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    )
}
