const baseUrl = 'http://localhost:3005/api/users'

export const getAll = () => {
    return fetch(baseUrl)
        .then(res => res.json())
        .then(res => res.users)
        .catch(err => console.error(err));
}