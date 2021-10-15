import React, { useState, useEffect } from 'react'
import moment from "moment"
import "./cards.css"
import "../../main.css"
import userImg from '../../assets/img/logo/logo1.png'
import postImage from "../../assets/img/posts/posts.PNG"
import { Link } from 'react-router-dom'

export const Cards = () => {
    const [loading, setLoading] = useState(false)
    const [postData, setPostData] = useState([])

    async function fetchPosts() {
        setLoading(true);
        let apiRoute = "http://localhost:5000/api/post/getPosts"
        let req = await fetch(apiRoute);
        let res = await req.json();

        if (res && res.status === 200) {
            setPostData(res.posts);
            setLoading(true);

        }
        console.log(postData);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (

        postData.map((post, i) => {
            return (
                <div className="ideas-box" key={i}>
                    <Link to={`post/${post.id}`}>
                        <div className="idea-head">
                            <img src={post.image_url} data-img-id={post.image_id} alt="" className="img-fluid" />
                        </div>
                        <div className="idea-middle mt-2">
                            <small className="time">{moment(post.created_at).startOf('hour').fromNow()}</small>
                            <h5 className="title">{post.title}</h5>
                        </div>
                    </Link>
                    <hr />
                    <div className="ideas-footer">
                        <div className="left">
                            <img src={post.user_img} alt="" className="img-fluid user-img" />
                        </div>
                        <div className="right">
                            <div className="likes action">
                                <ion-icon name="heart" className="upvote icon"></ion-icon>
                                <span className="count">{post.likes}</span>
                            </div>
                            <div className="views action">
                                <ion-icon name="eye" className="view icon"></ion-icon>
                                <span className="count">{post.views}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    )
}
