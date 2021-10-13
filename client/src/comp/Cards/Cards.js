import React from 'react'
import "./cards.css"
import "../../main.css"
import userImg from '../../assets/img/logo/logo1.png'
import postImage from "../../assets/img/posts/posts.PNG"
import { Link } from 'react-router-dom'

export const Cards = () => {
    return (

        <div className="ideas-box">
            <Link to="/post">
                <div className="idea-head">
                    <img src={postImage} alt="" className="img-fluid" />
                </div>
                <div className="idea-middle mt-2">
                    <small className="time">4 minute ago</small>
                    <h5 className="title">Some Dummy Data Title</h5>
                </div>
            </Link>
            <hr />
            <div className="ideas-footer">
                <div className="left">
                    <img src={userImg} alt="" className="img-fluid user-img" />
                </div>
                <div className="right">
                    <div className="likes action">
                        <ion-icon name="heart" className="upvote icon"></ion-icon>
                        <span className="count">345</span>
                    </div>
                    <div className="views action">
                        <ion-icon name="eye" className="view icon"></ion-icon>
                        <span className="count">345</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
