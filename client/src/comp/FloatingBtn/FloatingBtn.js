import React from 'react'
import { Link } from 'react-router-dom'
import { checkAuth } from '../../utils/checkAuth'

export const FloatingBtn = ({ userAction, postid }) => {
    return (
        <div className="post-action">
            <Link to={`/editPost/${postid}`} target="_blank"><ion-icon name="create" className="edit icon"></ion-icon></Link>
            <ion-icon name="trash" className="delete icon" onClick={userAction}></ion-icon>
        </div>
    )
}
