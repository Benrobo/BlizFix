
export const getUser = async (id) => {
    let api = "http://localhost:5000/api/user/getUserById"
    let req = await fetch(api, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id })
    })

    let res = await req.json()
    if (res) {
        return res;
    }
}
