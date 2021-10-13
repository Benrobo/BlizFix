import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Cards } from '../../comp/Cards/Cards'
import { EditProfile } from './EditProfile'
import { EditAvatar } from './EditAvatar'
import redirect from '../../utils/redirect'
import "./profile.css"

export const Profile = () => {
    const { userId } = useParams();
    const [userdata, setUserdata] = useState("");
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userAvatar, setAvatar] = useState("");
    const [userProfession, setProfession] = useState("");
    const [toggleForm, setToggleForm] = useState(false)
    const [toggleAvatarForm, setAvatarForm] = useState(false)

    // get userdata by id
    const getUser = async (id) => {
        let api = "http://localhost:5000/api/user/getUserById"
        let req = await fetch(api, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        })

        let result = await req.json()
        if (result.status === 500) {
            redirect("/notfound")
            return;
        }
        if (result.status === 200) {
            setUserdata(result.data);
            let { username, email, user_img, profession } = userdata;
            setUsername(username)
            setEmail(email)
            setAvatar(user_img);
            setProfession(profession)
        }
    }


    useEffect(() => {
        console.log(userdata)
        getUser(userId)
    }, [])

    // get user posts


    function showEditForm() {
        setToggleForm(!toggleForm)
    }

    function handleAvatarForm() {
        setAvatarForm(!toggleAvatarForm)
    }

    return (
        <section className="section">
            <div className="main">
                <div className="profile-cont">
                    <div className="user-card-cont">
                        <div className="user-card">
                            <div className="left">
                                <img src={userAvatar} alt="" className="img-fluid" />
                                <button className="btn btn-primary" onClick={handleAvatarForm}>edit image</button>
                            </div>
                            <div className="right">
                                <div className="user-info mt-2">
                                    <h3>{name}</h3>
                                    <p>{userProfession}</p>
                                    <span className="editProfile" onClick={showEditForm}>
                                        <ion-icon name="create"></ion-icon> <small>Edit profile</small>
                                    </span>
                                </div>
                                <div className="ideas-stat mt-2">
                                    <div className="likes">
                                        <ion-icon name="heart"></ion-icon>
                                        <small className="count">345</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="user-ideas">
                        <h1>Your Ideas</h1>
                        <Cards />
                    </div>
                </div>

                {/* <!-- edit profile cmontainer --> */}
                {toggleForm && <EditProfile hideForm={setToggleForm} userData={userdata} />}

                {toggleAvatarForm && <EditAvatar hideForm={handleAvatarForm} userData={userdata} />}
            </div>
        </section>
    )
}
