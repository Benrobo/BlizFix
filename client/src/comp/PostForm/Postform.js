import React, { useState } from 'react'
import "./postform.css"

export const Postform = () => {
    const [toggle, setToggle] = useState(true);

    function handleToggle(){
        setToggle(!toggle)
    }

    return (
        <div>
            {toggle && <div class="post-form-cont">
                <form class="form-group">
                    <div class="head">
                        <h3>Edit Post</h3>
                        <ion-icon name="close" class="close-form" onClick={handleToggle}></ion-icon>
                    </div>
                    <div class="body">
                        <div class="file-cont">
                            <button class="fileUpload">
                                Upload Image
                            </button>
                            <span class="filetext"></span>
                        </div>
                        <input type="text" placeholder="Title" class="inp" />

                        <input type="text" placeholder="Slug" class="inp" />

                        <textarea name="" id="" cols="30" rows="5" class="solution inp" placeholder="Describe your solution...">dfvfv</textarea>
                        <br />
                        <button class="submit-btn">
                            Submit
                        </button>
                    </div>
                </form>
            </div>}
        </div>
    )
}
