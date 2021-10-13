import React, { useState, useRef } from 'react'
import { fileUpload } from '../../utils/fileUpload';
import "./profile.css"

export const EditAvatar = ({ hideForm }) => {
    const [filepath, setFilePath] = useState("")
    const [filedata, setFileData] = useState("")
    const [image, setImage] = useState("")
    const fileRef = useRef()

    function handleFile(e) {
        e.preventDefault();

        fileRef.current.click();
    }

    async function handleFileChange(e) {
        let file = e.target.files[0];
        let imgsrc = URL.createObjectURL(file)
        setFileData(file)
        setImage(imgsrc)

    }

    async function submitFile(e) {
        e.preventDefault()
        let api = "http://localhost:5000/api/file/upload"
        let path = await fileUpload(filedata, api)
        console.log(path)
    }

    // console.log(userData)
    function toggleForm() {
        hideForm()
    }

    return (
        <div className="profile-form-cont">
            <form className="form-group">
                <div className="head">
                    <h3>Set Avatar</h3>
                    <ion-icon name="close" className="close-form" onClick={toggleForm}></ion-icon>
                </div>
                <div className="body">
                    <div className="file-cont">
                        <button className="fileUpload" onClick={handleFile}>
                            Change Image
                        </button>
                        <input type="file" ref={fileRef} style={{ display: "none" }} onChange={handleFileChange} />
                        <small className="filetext">{ }</small>
                    </div>
                    <img src={image} className="img-fluid" alt="" />
                    <br />
                    <button className="submit-btn btn" onClick={submitFile}>
                        Save Profile
                    </button>
                </div>
            </form>
        </div>
    )
}
