import React, { useState, useRef } from 'react'
import "./profile.css"
import { fileUpload } from '../../utils/fileUpload';

export const EditProfile = ({ hideForm, userData }) => {
    const [userdata, setUserdata] = useState("");
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userAvatar, setAvatar] = useState("");
    const [userProfession, setProfession] = useState("");
    const [path, setFilePath] = useState("")

    const fileRef = useRef()

    function handleFile(e) {
        e.preventDefault();

        fileRef.current.click();
    }

    async function handleFileChange(e) {
        let file = e.target.files[0];
        let api = "http://localhost:5000/api/file/upload"
        let path = await fileUpload(file, api)

        console.log(path)
    }

    console.log(userData)
    function toggleForm() {
        hideForm()
    }

    return (
        <div className="profile-form-cont">
            <form className="form-group">
                <div className="head">
                    <h3>Edit Profile</h3>
                    <ion-icon name="close" className="close-form" onClick={toggleForm}></ion-icon>
                </div>
                <div className="body">
                    <div className="file-cont">
                        <button className="fileUpload" onClick={handleFile}>
                            Change Image
                        </button>
                        <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleFileChange} />
                        <small className="filetext">{userData.user_img.slice(0, 20) + "...."}</small>
                    </div>
                    <input type="text" value={userData.username} placeholder="Username" className="inp" />

                    <input type="email" value={userData.email} placeholder="Email" className="inp" />

                    <input type="text" value={userData.profession} placeholder="Profession" className="inp" />

                    <br />
                    <button className="submit-btn btn">
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    )
}
