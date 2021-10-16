import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import "./postform.css"
import redirect from '../../utils/redirect';

export const Postform = () => {
    document.title = "Edit Post"

    const { postId } = useParams()
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])
    const [error, setError] = useState("")
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
                console.log(data)
                if (data.status === 200) {
                    setPostData(data.posts);
                    // setLoading(false)
                }
                else {
                    redirect("/notfound")
                    return;
                }

            })
            .catch((e) => {
                setError("Something went wrong when fetching user")
                setLoading(false)
                return;
            })
    }, [postId])


    function handleToggle() {
        redirect(`/post/${postId}`)
    }

    return (
        <div>
            {loading ? "Loading .... " : ""}
            {postData.map((post, i) => {
                return (
                    <div className="post-form-cont" key={i}>
                        <form className="form-group">
                            <div className="head">
                                <h3>Edit Post</h3>
                                <ion-icon name="close" className="close-form" onClick={handleToggle}></ion-icon>
                            </div>
                            <div className="body">
                                <div className="file-cont">
                                    <button className="fileUpload">
                                        Upload Image
                                    </button>
                                    <span className="filetext"></span>
                                </div>
                                <input type="text" onChange={(e) => setTitle(e.target.value)} value={post.title} placeholder="Title" className="inp" />

                                <input type="text" onChange={(e) => setSlug(e.target.value)} placeholder="Slug" className="inp" />

                                <textarea onChange={(e) => setDescription(e.target.value)} cols="30" rows="5" className="solution inp"
                                    value={post.description}
                                    placeholder="Describe your solution...">

                                </textarea>
                                <br />
                                <button className="submit-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                )
            })}
        </div>
    )
}
