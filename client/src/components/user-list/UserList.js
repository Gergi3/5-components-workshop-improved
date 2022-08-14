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
        if (_id === null) {
            return setUserAction({ user: null, action })
        }
        userServices.getOneById(_id)
            .then(user => setUserAction({ user, action }));
    }

    const closeHandler = () => {
        setUserAction(userActionDefault);
    }

    const userCreateHandler = (userData) => {
        userServices.create(userData)
            .then(res => {
                setUsers(oldUsers => [...oldUsers, res]);
                closeHandler();
            });
    }

    return (
        <>
            {userAction.action &&
                <div className="overlay">
                    <div className="backdrop" onClick={closeHandler}></div>
                    <div className="modal">
                        {userAction.action === UserActionTypes.Create &&
                            <UserCreate
                                user={userAction.user} 
                                closeHandler={closeHandler}
                                userCreateHandler={userCreateHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Details &&
                            <UserDetails
                                user={userAction.user} 
                                closeHandler={closeHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Edit &&
                            <UserDetails
                                user={userAction.user} 
                                closeHandler={closeHandler}
                            />
                        }

                        {userAction.action === UserActionTypes.Delete &&
                            <UserDetails
                                user={userAction.user}
                                closeHandler={closeHandler}
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
