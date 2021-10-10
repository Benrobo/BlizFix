import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("")


    function handleForm(e) {
        e.preventDefault();

        if (name === "" || email === "" || pwd === "") {
            setError("Input cannot be empty")
            return;
        }
        else {
            let formData = {
                name,
                email,
                pwd
            }
            ajax(formData)
            // console.log(formData)
        }
    }

    async function ajax(data) {
        let req = await fetch("http://localhost:4000/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let res = await req.json();

        if (res && res.msg) {
            setMsg(res.msg)
            setError("")
            window.location = "/login"
            return;
        }
        else if (res && res.errorMsg) {
            setError(res.errorMsg)
            setMsg("")
            return;
        }
    }

    return (
        <form className="form-group" onSubmit={handleForm}>
            <h3>Signup</h3>
            {error && <div className="fail">{error}</div>}
            {msg && <div className="suc">{msg}</div>}
            <input type="text" className="form-control" placeholder="Username" onChange={(e) => setName(e.target.value)} />

            <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

            <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPwd(e.target.value)} />
            <br />
            <button className="btn btn-primary" onClick={handleForm}>
                Signup
            </button>

            <small>Have an account? <Link to="/login">Login</Link></small>
        </form>
    )
}
