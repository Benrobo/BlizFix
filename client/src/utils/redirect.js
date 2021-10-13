
const redirect = (path) => {
    if (!path || path === "") return false;
    window.location = path
}

export default redirect
