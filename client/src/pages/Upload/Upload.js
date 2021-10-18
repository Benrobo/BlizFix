import React, { useState, useRef } from 'react'
import "./upload.css"
import redirect from '../../utils/redirect'

export const Upload = () => {

    const fileRef = useRef();
    // const [file, setFile] = useState("");
    const [msg, setMessage] = useState("")
    const [filename, setFileName] = useState("");
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");



    function fileChange(e) {
        e.preventDefault();
        fileRef.current.click();
    }

    async function handleFileChange(e) {
        let file = e.target.files[0];
        // setFile(file);
        setFileName(file.name)

        let reader = await new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let tokens = JSON.parse(localStorage.getItem("tokens"));

        const refreshToken = tokens.refreshToken;

        if (!tokens || refreshToken === "") {
            alert("Not auhorized, token is missing")
            window.location.reload(true);
            return;
        }

        if (title === "" || slug === "" || description === "") {
            alert("Fields cant be empty")
            return;
        }
        else {
            setLoading(true)
            // post data to backend
            try {
                let apiRoute = "http://localhost:5000/api/post/add";
                let postData = {
                    title,
                    slug,
                    description,
                    image
                }
                let req = await fetch(apiRoute, {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${refreshToken}`
                    },
                    body: JSON.stringify(postData)
                })

                let res = await req.json();
                if (res && res.status === 200) {
                    console.log(res);
                    setMessage(res.msg)
                    setLoading(false);
                    setTimeout(() => {
                        redirect("/")
                    }, 1000);
                } else {
                    setMessage(res.msg)
                    setLoading(false);
                }
            }
            catch (e) {
                setLoading(false);
                setMessage("Something went wrong, could not add post")
            }
        }
    }


    return (
        <div>
            <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Add Post</h3>
                        <ion-icon name="close" className="close-form" onClick={() => redirect("/")}></ion-icon>
                    </div>
                    <span>{msg}</span>
                    <div className="body">
                        <div className="file-cont">
                            <button className="fileUpload" onClick={fileChange}>
                                {filename ? filename : "Upload Image"}
                            </button>
                            <input type="file" onChange={handleFileChange} ref={fileRef} style={{ display: "none" }} />
                        </div>
                        <input type="text" placeholder="Title" className="inp" onChange={(e) => setTitle(e.target.value)} />

                        <input type="text" placeholder="Slug" className="inp" onChange={(e) => setSlug(e.target.value)} />

                        <textarea name="" id="" cols="30" rows="5" className="solution inp" placeholder="Describe your solution..." onChange={(e) => setDescription(e.target.value)}></textarea>
                        <br />
                        <button className={loading ? "disabled submit-btn" : "submit-btn"} onClick={handleSubmit}>
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
