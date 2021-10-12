import React,{useState} from 'react'
import "./profile.css"
import profileImg from "../../assets/img/logo/logo1.png"
import postImg from "../../assets/img/posts/posts.PNG"
import { Cards } from '../../comp/Cards/Cards'
import { EditProfile } from './EditProfile'
import { Navbar } from '../../comp/Navbar/Navbar'

export const Profile = () => {
    const [toggleForm, setToggleForm] = useState(false)

    function showEditForm(){
        setToggleForm(!toggleForm)
    }

    return (
        <section className="section">
        <div className="main">
            <div className="profile-cont">
                <div className="user-card-cont">
                    <div className="user-card">
                        <div className="left">
                            <img src={profileImg} alt="" className="img-fluid" />
                        </div>
                        <div className="right">
                            <div className="user-info mt-2">
                                <h3>John Doe</h3>
                                <p>Software Engineer</p>
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
            {toggleForm && <EditProfile hideForm={setToggleForm}/>}
        </div>
    </section>
    )
}
