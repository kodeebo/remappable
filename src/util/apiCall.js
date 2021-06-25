const apiUrl = "http://localhost:5000"

export const apiCall = (path) => {
    try {
        return fetch(`${apiUrl}/${path}`).then(res => res.json())
    } catch (e) {
        console.error(e)
        return e;
    }
}