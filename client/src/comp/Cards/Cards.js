import React, { useState, useEffect } from 'react'
import moment from "moment"
import "./cards.css"
import "../../main.css"
import userImg from '../../assets/img/logo/logo1.png'
import postImage from "../../assets/img/posts/posts.PNG"
import { Link } from 'react-router-dom'
import TextTruncate from 'react-text-truncate';

export const Cards = () => {
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])
    const [error, setError] = useState("")

    async function fetchPosts() {
        try {
            setLoading(true);
            let apiRoute = "http://localhost:5000/api/post/getPosts"
            let req = await fetch(apiRoute);
            let res = await req.json();

            if (res && res.status === 200) {
                setPostData(res.posts);
                setLoading(true);

            }
            else if (res && res.posts === null) {
                setError(`No Project Ideas Available, Try adding some ideas here ${<Link to="/upload">Upload</Link>}`)
            }
        }
        catch (e) {
            // console.log(e)
            setLoading(true)
            setError("Something went wrong when fetching posts")
            // console.log("Something went wrong when fetching posts")
            return;
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            <p style={{ textAlign: "center", color: "#ccc" }}>{error}</p>
            {postData.map((post, i) => {
                return (
                    <div className="ideas-box" key={i}>
                        <Link to={`/post/${post.id}`}>
                            <div className="idea-head">
                                <div className="idea-img" style={{
                                    background: `url(${post.image_url})`,
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                }} data-img-id={post.image_id}></div>
                                {/* <img src={post.image_url} data-img-id={post.image_id} alt="" className="img-fluid" /> */}
                            </div>
                            <div className="idea-middle mt-2">
                                <small className="time">{moment(post.created_at).startOf('hour').fromNow()}</small>
                                <TextTruncate
                                    line={1.0}
                                    element="p"
                                    truncateText="...."
                                    text={post.title}
                                    textTruncateChild={<Link to={`/post/${post.id}`}>see more</Link>}
                                />
                                {/* <p className="title">{post.title}</p> */}
                            </div>
                        </Link>
                        <hr />
                        <div className="ideas-footer">
                            <div className="left">
                                <Link to={`/profile/${post.user_id}`} target="_blank">
                                    <img src={post.user_img} alt="" className="img-fluid user-img" />
                                </Link>
                            </div>
                            <div className="right">
                                <div className="likes action">
                                    <ion-icon name="heart" className="upvote icon"></ion-icon>
                                    <span className="count">{post.likes}</span>
                                </div>
                                <div className="views action p-1">
                                    <ion-icon name="eye" className="view icon"></ion-icon>
                                    <span className="count">{post.views}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>

    )
}
