import React from 'react'
import "./cards.css"
import "../../main.css"
import userImg from '../../assets/img/logo/logo1.png'
import postImage from "../../assets/img/posts/posts.PNG"
import { Link } from 'react-router-dom'

export const Cards = () => {
    return (

        <div class="ideas-box">
            <Link to="/post">
                <div class="idea-head">
                    <img src={postImage} alt="" class="img-fluid" />
                </div>
                <div class="idea-middle mt-2">
                    <small class="time">4 minute ago</small>
                    <h5 class="title">Some Dummy Data Title</h5>
                </div>
            </Link>
            <hr />
            <div class="ideas-footer">
                <div class="left">
                    <img src={userImg} alt="" class="img-fluid user-img" />
                </div>
                <div class="right">
                    <div class="likes action">
                        <ion-icon name="heart" class="upvote icon"></ion-icon>
                        <span class="count">345</span>
                    </div>
                    <div class="views action">
                        <ion-icon name="eye" class="view icon"></ion-icon>
                        <span class="count">345</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
