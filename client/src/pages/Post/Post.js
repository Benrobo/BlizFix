import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../comp/Navbar/Navbar'
import { Postform } from "../../comp/PostForm/Postform"
import postImg from "../../assets/img/posts/posts.PNG"

import "./post.css"


export const Post = () => {
    const [toggle, setToggle] = useState(false);
    const [deleteOption, setDeleteOption] = useState(false);

    function handleToggle() {
        if(toggle === true){
            setToggle(false)
        }else{
            setToggle(true)
        }
    }

    function userAction(){
        let choice = window.confirm("Are you sure you wanna delete this");

        setDeleteOption(choice)
    }

    return (
        <div>
            <Navbar />
            <section className="section">
                <div className="main">
                    <div className="post-container">
                        <div className="post">
                            <div className="p-3 mt-4">
                                <Link to="/">Back</Link>
                            </div>
                            <div className="post-img mt-3">
                                <img src={postImg} alt="" className="img-fluid" />
                            </div>
                            <div className="post-details">
                                <div className="top mt-3">
                                    <div className="left">
                                        <img src="../assets/img/logo1.png" alt="" className="img-fluid" />
                                        <span className="username">John Doe</span>
                                    </div>
                                    <div className="right">
                                        {/* <!-- <button>share</button> --> */}
                                        <div className="btns">
                                            <ion-icon name="heart"></ion-icon>
                                            <small className="count">333</small>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="bottom">
                                    <h1 className="title">Post title</h1>
                                    <p className="time">2 minute ago</p>
                                    <div className="body">
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis in optio odio eligendi. Adipisci sit minima, ipsa qui, officia facilis ullam doloribus, iste aliquid perspiciatis eaque quod odit quibusdam alias. Dolorum, tempore consectetur. Perspiciatis fugiat debitis temporibus dolorum saepe voluptatem.
                                            consectetur. Perspiciatis fugiat debitis temporibus dolorum saepe voluptatem.
                                            consectetur.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="post-action">
                        <ion-icon name="create" class="edit" onClick={handleToggle}></ion-icon>
                        <ion-icon name="trash" class="delete" onClick={userAction}></ion-icon>
                    </div>

                    {toggle && <Postform />}
                </div>
            </section>
        </div>
    )
}
