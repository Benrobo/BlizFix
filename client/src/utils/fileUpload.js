
export const fileUpload = async (data, apiRoute) => {

    let formdata = new FormData();
    formdata.append("file", data);
    // console.log(Object.fromEntries(formdata))
    let res = await fetch(apiRoute, {
        method: "POST",
        body: formdata
    })
    return res.json();
}