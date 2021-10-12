import React from 'react'
import decode from "jwt-decode"

export const checkAuth = () => {
    let tokens = JSON.parse(localStorage.getItem("tokens"));

    if (!tokens) {
        return false;
    }

    try {

        let { exp } = decode(tokens.refreshToken);

        let date = new Date().getTime() / 1000;

        if (exp < date) {
            return false;
        }

    } catch (e) {
        return false;
    }

    return true;
}
