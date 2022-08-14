const baseUrl = 'http://localhost:3005/api/users'

export const getAll = () => {
    return fetch(baseUrl)
        .then(res => res.json())
        .then(res => res.users)
        .catch(err => console.error(err));
}

export const getOneById = (id) => {
    return fetch(baseUrl + '/' + id)
        .then(res => res.json())
        .then(res => res.user)
        .catch(err => console.error(err));
};
