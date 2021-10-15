import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Cards } from '../../comp/Cards/Cards'
import { EditProfile } from './EditProfile'
import { EditAvatar } from './EditAvatar'
import redirect from '../../utils/redirect'
import { checkAuth } from "../../utils/checkAuth"
import "./profile.css"
import { Loading } from '../../comp/Loading/Loading'


export const Profile = () => {
    const { userId } = useParams();
    const [userdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [toggleForm, setToggleForm] = useState(false)
    const [toggleAvatarForm, setAvatarForm] = useState(false)

    useEffect(() => {
        // getUser(userId)
        let api = "http://localhost:5000/api/user/getUserById"
        fetch(api, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId })
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.status === 500) {
                    redirect("/notfound")
                    return;
                }
                if (data.status === 200) {
                    let dbData = [];
                    dbData.push(data.data)
                    setUserdata([...dbData]);
                    setLoading(!true)
                }
            })
            .catch((e) => {
                setError("Something went wrong when fetching user")
                setLoading(false)
                console.log(e)
                return;
            })
    }, [userId])

    // console.log(userdata, loading)
    // get user posts


    function showEditForm() {
        setToggleForm(!toggleForm)
    }

    function handleAvatarForm() {
        setAvatarForm(!toggleAvatarForm)
    }

    // return null;
    return (
        <section className="section">
            <div className="main">
                <p className="text-white" style={{ color: "#ccc", textAlign: "center" }}>{error}</p>
                {loading ? <Loading /> : (userdata.map((data, i) => {
                    let { username, email, user_img, profession } = data;
                    console.log({ username, email, user_img, profession })
                    return (
                        <div className="profile-cont" key={i}>
                            <div className="user-card-cont">
                                <div className="user-card">
                                    <div className="left">
                                        <img src={data.user_img} alt="" className="img-fluid" />
                                        {checkAuth() && <ion-icon name="create" className="edit-icon" onClick={handleAvatarForm}></ion-icon>}
                                        {/* <button className="btn btn-primary" onClick={handleAvatarForm}>edit image</button> */}
                                    </div>
                                    <div className="right">
                                        <div className="user-info mt-2">
                                            <h3>{data.username}</h3>
                                            <p>{data.profession}</p>
                                            {checkAuth() && <span className="editProfile" onClick={showEditForm}>
                                                <ion-icon name="create"></ion-icon> <small>Edit profile</small>
                                            </span>}
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
                    )
                })

                )}

                {/* <!-- edit profile cmontainer --> */}
                {toggleForm && <EditProfile hideForm={setToggleForm} userData={userdata} />}

                {toggleAvatarForm && <EditAvatar hideForm={handleAvatarForm} userData={userdata} />}
            </div>
        </section>
    )
}
