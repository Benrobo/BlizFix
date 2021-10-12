import React from 'react'
import "./profile.css"

export const EditProfile = ({hideForm}) => {

    function toggleForm(){
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
                        <button className="fileUpload">
                            Upload Image
                        </button>
                        <span className="filetext"></span>
                    </div>
                    <input type="text" placeholder="Username" className="inp" />

                    <input type="text" placeholder="Profession" className="inp" />

                    <br />
                    <button className="submit-btn">
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    )
}
