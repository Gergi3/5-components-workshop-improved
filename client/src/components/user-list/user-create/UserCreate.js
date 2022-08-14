import { useState, useEffect } from 'react';

import * as userServices from '../../../services/userServices'

import { UserInput } from './user-input/UserInput';
import './UserCreate.css'

export const UserCreate = ({
    user,
    closeHandler,
    userDataHandler
}) => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        imageUrl: '',
        country: '',
        city: '',
        street: '',
        streetNumber: ''
    });

    useEffect(() => {
        if (user) {
            const {address: {country, city, street, streetNumber}, _id, updatedAt, createdAt, ...userData } = user
            const obj = {country, city, street, streetNumber, ...userData};
            setValues(obj);
        }
    }, []);

    const formStateHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        const { country, city, street, streetNumber, ...userData} = values;
        userData.address = { country, city, street, streetNumber };

        userDataHandler(userData, user?._id);
    }

    return (
        <div className="user-container">
            <header className="headers">
                <h2>Edit User/Add User</h2>
                <button className="btn close" onClick={closeHandler}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="xmark"
                        className="svg-inline--fa fa-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path fill="currentColor"
                            d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z">
                        </path>
                    </svg>
                </button>
            </header>
            <form onSubmit={submitHandler}>
                <div className="form-row">
                    <UserInput
                        text="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={formStateHandler}
                        icon="fa-user"
                    />

                    <UserInput
                        text="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={formStateHandler}
                        icon="fa-user"
                    />
                </div>

                <div className="form-row">
                    <UserInput
                        text="Email"
                        name="email"
                        value={values.email}
                        onChange={formStateHandler}
                        icon="fa-envelope"
                    />
                    <UserInput
                        text="Phone number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={formStateHandler}
                        icon="fa-phone"
                    />
                </div>

                <UserInput
                    text="Image URL"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={formStateHandler}
                    className="long-line"
                    icon="fa-image"
                />

                <div className="form-row">
                    <UserInput
                        text="Country"
                        name="country"
                        value={values.country}
                        onChange={formStateHandler}
                        icon="fa-map"
                    />
                    <UserInput
                        text="City"
                        name="city"
                        value={values.city}
                        onChange={formStateHandler}
                        icon="fa-city"
                    />
                </div>

                <div className="form-row">
                    <UserInput
                        text="Street"
                        name="street"
                        value={values.street}
                        onChange={formStateHandler}
                        icon="fa-map"
                    />
                    <UserInput
                        text="Street number"
                        name="streetNumber"
                        value={values.streetNumber}
                        onChange={formStateHandler}
                        icon="fa-house-chimney"
                    />
                </div>

                <div id="form-actions">
                    <button id="action-save" className="btn" type="submit" disabled={!userServices.isValidUser(values)}>Save</button>
                    <button id="action-cancel" className="btn" type="button" onClick={closeHandler}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
