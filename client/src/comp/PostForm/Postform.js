import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router';
import "./postform.css"
import redirect from '../../utils/redirect';

export const Postform = () => {
    document.title = "Edit Post"
    const fileRef = useRef();
    const { postId } = useParams()
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])
    const [msg, setMessage] = useState("")
    const [filename, setFileName] = useState("");
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        let api = "http://localhost:5000/api/post/getPostById"
        fetch(api, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: postId })
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setLoading(true)
                if (data.status === 200) {

                    setPostData(data.posts);
                    setTitle(data.posts[0].title)
                    setLoading(false)
                }
                else {
                    redirect("/notfound")
                    return;
                }

            })
            .catch((e) => {
                setMessage("Something went wrong when fetching user")
                setLoading(false)
                return;
            })
    }, [postId])

    // Handle file change
    function fileChange(e) {
        e.preventDefault();
        fileRef.current.click();
    }
    // Read image file as DataUrl (base64)
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

    async function handleFormSubmition(e) {
        e.preventDefault();
        let tokens = JSON.parse(localStorage.getItem("tokens"));

        const refreshToken = tokens.refreshToken;

        if (!tokens || refreshToken === "") {
            alert("Not auhorized, token is missing")
            window.location.reload(true);
            return;
        }

        if (title === "" || slug === "" || description === "") {
            setMessage("Field cant be empty")
            return;
        }
        else {
            setLoading(true)
            // post data to backend
            try {
                let apiRoute = "http://localhost:5000/api/post/editPost";
                let postData = {
                    postId,
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
                setMessage("Something went wrong, could not edit post")
            }
        }

    }

    function handleToggle() {
        redirect(`/post/${postId}`)
    }


    return (
        <div>
            <p style={{ textAlign: "center", color: "#ccc" }}>{msg}</p>
            {loading ? "Loading .... " : ""}
            {postData.map((post, i) => {
                return (
                    <div className="post-form-cont" key={i}>
                        <form className="form-group">
                            <div className="head">
                                <h3>Edit Post</h3>
                                <ion-icon name="close" className="close-form" onClick={handleToggle}></ion-icon>
                            </div>
                            <small>{msg}</small>
                            <div className="body">
                                <div className="file-cont">
                                    <button className="fileUpload" onClick={fileChange}>
                                        {filename ? filename : "Upload Image"}
                                    </button>
                                    <input type="file" onChange={handleFileChange} ref={fileRef} style={{ display: "none" }} />
                                </div>
                                <input type="text" onChange={(e) => {
                                    post.title = ""
                                    setTitle(e.target.value)
                                }} value={post.title === "" ? title : post.title} placeholder="Title" className="inp" />

                                <input type="text" onChange={(e) => {
                                    post.slug = ""
                                    setSlug(e.target.value)
                                }} value={post.slug === "" ? slug : post.slug} placeholder="Slug" className="inp" />

                                <textarea
                                    cols="30"
                                    rows="5"
                                    className="solution inp"
                                    onChange={(e) => {
                                        post.description = ""
                                        setDescription(e.target.value)
                                    }}
                                    value={post.description === "" ? description : post.description}
                                    placeholder="Describe your solution...">

                                </textarea>
                                <br />
                                <button className="submit-btn" disabled={loading} onClick={handleFormSubmition}>
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                )
            })}
        </div>
    )
}
