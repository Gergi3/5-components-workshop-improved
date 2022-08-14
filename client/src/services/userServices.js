const baseUrl = 'http://localhost:3005/api/users'

export const getAll = () => {
    return fetch(`${baseUrl}?page=1&limit=100`)
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

export const create = (data) => {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch(baseUrl, options)
        .then(res => res.json())
        .then(res => 
            {
                console.log(res);
                return res.user})
        .catch(err => console.error(err));
};
