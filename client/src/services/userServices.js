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

export const isValidUser = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        const errorMessage = validateUserField(key, value);
        if (errorMessage) {
            return false;
        }
    });
}

export const validateUserField = (key, value) => {
    const validator = validators[key];
    const isInvalid = 
        value?.length < validator.min ||
        (validator.regex && !validator.regex?.test(value)) ||
        (validator.positive && (value <= 0 || isNaN(value)));

    if (value === '') {
        return 'required';
    }
    if (isInvalid) {
        return validator.message;
    }
}

const validators = {
    firstName: {
        min: 3,
        message: 'First name should be at least 3 characters long!'
    },
    lastName: {
        min: 3,
        message: 'Last name should be at least 3 characters long!'
    },
    email: {
        regex: /^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/,
        message: 'Email is not valid'
    },
    phoneNumber: {
        regex: /^0[1-9]{1}[0-9]{8}$/,
        message: 'Phone number is not valid'
    },
    imageUrl: {
        regex: /^https?:\/\/.+/,
        message: 'Image URL is not valid!'
    },
    country: {
        min: 2,
        message: 'Country should be at least 3 characters long!'
    },
    city: {
        min: 3,
        message: 'City should be at least 3 characters long!'
    },
    street: {
        min: 3,
        message: 'Street should be at least 3 characters long!'
    },
    streetNumber: {
        positive: true,
        message: 'Street number should be a positive number!'
    }
}