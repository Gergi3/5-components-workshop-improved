import { useState, useEffect } from 'react';

import * as userServices from '../../services/userServices'
import { UserCreate } from './user-create/UserCreate';

import { UserDetails } from './user-details/UserDetails';
import { UserHeadRow } from './user-head-row/UserHeadRow';
import { UserRow } from './user-row/UserRow';
import { UserActionTypes } from './userConstants';
import './UserList.css'

export const UsersList = ({
}) => {
    const [users, setUsers] = useState([]);
    const userActionDefault = { user: null, action: null };
    const [userAction, setUserAction] = useState(userActionDefault);

    useEffect(() => {
        userServices.getAll()
            .then(res => setUsers(res));
    }, []);

    const userActionHandler = (_id, action) => {
        userServices.getOneById(_id)
            .then(user => {
                setUserAction({ user, action });
            });
    }

    const clearHandler = () => {
        setUserAction(userActionDefault);
    }

    const createUserHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            ...address
        } = Object.fromEntries(formData);

        const data = {
            firstName,
            lastName,
            email,
            phoneNumber,
            imageUrl,
            address
        }

        console.log(data);
        userServices.create(data)
            .then(res => {
                setUsers(oldUsers => [...oldUsers, res])
            });
    }

    return (
        <>
            {userAction.action &&
                <div className="overlay">
                    <div className="backdrop" onClick={clearHandler}></div>
                    <div className="modal">
                        {userAction.action === UserActionTypes.Create &&
                            <UserCreate
                                user={userAction.user} 
                                clearHandler={clearHandler}
                                onSubmit={createUserHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Details &&
                            <UserDetails
                                user={userAction.user} 
                                clearHandler={clearHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Edit &&
                            <UserDetails
                                user={userAction.user} 
                                clearHandler={clearHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Delete &&
                            <UserDetails
                                user={userAction.user}
                                clearHandler={clearHandler}
                            />
                        }
                    </div>
                </div>
            }

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <UserHeadRow />
                    </thead>
                    <tbody>
                        {users.map(user =>
                            <UserRow
                                key={user._id}
                                user={user}
                                userActionHandler={userActionHandler.bind(null, user._id)}
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <button
                className="btn-add btn"
                onClick={userActionHandler.bind(null, null, UserActionTypes.Create)}
            >
                Add new user
            </button>
        </>
    );
};
