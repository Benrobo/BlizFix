import React, { useState, useRef } from 'react'
import "./upload.css"
import redirect from '../../utils/redirect'

export const Upload = () => {

    const fileRef = useRef();
    const [file, setFile] = useState("");
    const [filename, setFileName] = useState("")

    function fileChange(e) {
        e.preventDefault();
        fileRef.current.click();
    }

    function handleFileChange(e) {
        let file = e.target.files[0];
        setFile(file);
        setFileName(file.name)
    }


    return (
        <div>
            <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Add Post</h3>
                        <ion-icon name="close" className="close-form" onClick={() => redirect("/")}></ion-icon>
                    </div>
                    <div className="body">
                        <div className="file-cont">
                            <button className="fileUpload" onClick={fileChange}>
                                {filename ? filename : "Upload Image"}
                            </button>
                            <input type="file" onChange={handleFileChange} ref={fileRef} style={{ display: "none" }} />
                            <span className="filetext"></span>
                        </div>
                        <input type="text" placeholder="Title" className="inp" />

                        <input type="text" placeholder="Slug" className="inp" />

                        <textarea name="" id="" cols="30" rows="5" className="solution inp" placeholder="Describe your solution..."></textarea>
                        <br />
                        <button className="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
