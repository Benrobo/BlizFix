import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Navbar } from '../../comp/Navbar/Navbar'
import { Postform } from "../../comp/PostForm/Postform"
import postImg from "../../assets/img/posts/posts.PNG"
import { checkAuth } from "../../utils/checkAuth"
import redirect from "../../utils/redirect"
import moment from "moment"
import "./post.css"


export const Post = () => {

    let { postid } = useParams();
    const [toggle, setToggle] = useState(false);
    const [deleteOption, setDeleteOption] = useState(false);
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        // getUser(userId)
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
                setLoading(true)
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
                console.log(e);
                return;
            })
    }, [postid])

    console.log(postData)

    function userAction() {
        let choice = window.confirm("Are you sure you wanna delete this");

        setDeleteOption(choice)
    }

    return (
        <div>
            <Navbar />
            <section className="section">
                <div className="main">
                    <div className="post-container">
                        <p>{error}</p>
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

                    {checkAuth() && <div className="post-action">
                        <Link to={`/editPost/${postid}`} target="_blank"><ion-icon name="create" className="edit icon"></ion-icon></Link>
                        <ion-icon name="trash" className="delete icon" onClick={userAction}></ion-icon>
                    </div>}
                </div>
            </section>
        </div>
    )
}
