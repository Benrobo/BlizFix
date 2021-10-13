
export const fileUpload = async (data, apiRoute) => {
    let tokens = JSON.parse(localStorage.getItem("tokens"));

    const refreshToken = tokens.refreshToken;

    let formdata = new FormData();
    formdata.append("file", data);
    // console.log(Object.fromEntries(formdata))
    let res = await fetch(apiRoute, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${refreshToken}`
        },
        body: formdata
    })
    return res.json();
}