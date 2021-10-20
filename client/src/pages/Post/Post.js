import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Navbar } from '../../comp/Navbar/Navbar'
import { Postform } from "../../comp/PostForm/Postform"
import postImg from "../../assets/img/posts/posts.PNG"
import { checkAuth } from "../../utils/checkAuth"
import { checkPostIdAuth } from "../../utils/checkPostIdAuth"
import redirect from "../../utils/redirect"
import moment from "moment"
import "./post.css"
import { FloatingBtn } from '../../comp/FloatingBtn/FloatingBtn'


export const Post = () => {

    let { postid } = useParams();
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        // getUser(userId)
        setLoading(true)
        let api = "http://localhost:5000/api/post/getPostById"
        fetch(api, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: postid })
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.status === 200) {
                    setPostData(data.posts);
                    setLoading(false)
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
    }, [])

    console.log(postData)

    function userAction() {
        let choice = window.confirm("Are you sure you wanna delete this");
        deletePost(choice)
    }

    function deletePost(userChoice) {
        let tokens = JSON.parse(localStorage.getItem("tokens"));

        const refreshToken = tokens.refreshToken;

        if (!tokens || refreshToken === "") {
            alert("Not auhorized, token is missing")
            window.location.reload(true);
            return;
        }

        if (userChoice === true) {
            // make request
            let api = "http://localhost:5000/api/post/deletePost"
            fetch(api, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${refreshToken}`
                },
                body: JSON.stringify({ postId: postid })
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    console.log(data)
                    if (data.status === 200) {
                        alert(data.msg);
                        setTimeout(() => {
                            redirect("/")
                        }, 1000);
                    }
                    else {
                        redirect("/notfound")
                        return;
                    }

                })
        }
    }

    return (
        <div>
            <Navbar />
            <section className="section">
                <div className="main">
                    <div className="post-container">
                        <p style={{ textAlign: "center", color: "#ccc" }}>{error}</p>
                        {postData.map((post, i) => {
                            return (
                                <div className="post" key={i}>
                                    <div className="p-3 mt-4">
                                        <Link to="/">Back</Link>
                                    </div>
                                    <div className="post-img mt-3"
                                        style={{
                                            backgroundImage: `url(${post.image_url})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}>
                                        {/* <img src={post.image_url} alt="" className="img-fluid" /> */}
                                    </div>
                                    <div className="post-details">
                                        <div className="top mt-3">
                                            <div className="left">
                                                <img src={post.user_img} alt="" className="img-fluid user-img" />
                                                <div className="user-info">
                                                    <span className="username">{post.username}</span>
                                                    <br />
                                                    <small className="time">{moment(post.created_at).startOf('hour').fromNow()}</small>
                                                </div>
                                            </div>
                                            <div className="right">
                                                {/* <!-- <button>share</button> --> */}
                                                <div className="btns">
                                                    <ion-icon name="heart"></ion-icon>
                                                    <span className="count">{post.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="bottom">
                                            <h1 className="title">{post.title}</h1>
                                            <span>{post.slug}</span>
                                            <br />
                                            <div className="body">
                                                <h3>Idea Solution</h3>
                                                <p>{post.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {loading === false ?
                        <>
                            {checkAuth() ?
                                <>
                                    {checkPostIdAuth(postid) ?
                                        <>
                                            {console.log(checkPostIdAuth(postid))}
                                            <FloatingBtn userAction={userAction} postid={postid} />
                                        </>
                                        :
                                        console.log(checkPostIdAuth(postid))
                                    }
                                </>
                                :
                                ""
                            }
                        </>
                        :
                        ""
                    }
                </div>
            </section>
        </div>
    )
}
