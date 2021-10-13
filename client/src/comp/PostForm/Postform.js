import React, { useState } from 'react'
import "./postform.css"

export const Postform = () => {
    const [toggle, setToggle] = useState(true);

    function handleToggle() {
        setToggle(!toggle)
    }

    return (
        <div>
            {toggle && <div className="post-form-cont">
                <form className="form-group">
                    <div className="head">
                        <h3>Edit Post</h3>
                        <ion-icon name="close" className="close-form" onClick={handleToggle}></ion-icon>
                    </div>
                    <div className="body">
                        <div className="file-cont">
                            <button className="fileUpload">
                                Upload Image
                            </button>
                            <span className="filetext"></span>
                        </div>
                        <input type="text" placeholder="Title" className="inp" />

                        <input type="text" placeholder="Slug" className="inp" />

                        <textarea name="" id="" cols="30" rows="5" className="solution inp" placeholder="Describe your solution...">dfvfv</textarea>
                        <br />
                        <button className="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
