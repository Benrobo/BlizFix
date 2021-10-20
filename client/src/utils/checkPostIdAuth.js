import decode from "jwt-decode"

export const checkPostIdAuth = (postId) => {
    let tokens = JSON.parse(localStorage.getItem("tokens"));

    if (!tokens || tokens.refreshToken === "" || tokens.accessToken === "") {
        return false;
    }

    try {
        // exp gives us date in seconds
        let { id } = decode(tokens.refreshToken);

        try {
            let api = "http://localhost:5000/api/post/getPostById2"
            fetch(api, {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId: id, postId })
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    // if (data && data.status === 200) {
                    //     return true;
                    // }
                    if (data && data.status !== 200) {
                        return false;
                    }
                    if (!data && !data.status) {
                        return false;
                    }


                    return true
                })
            return true;
        } catch (e) {
            console.log(e)
            return false
        }


    } catch (e) {
        return false;
    }
}
