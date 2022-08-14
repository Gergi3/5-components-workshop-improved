import { useState, useEffect } from 'react';

import * as userServices from '../../services/userServices'

import { UserDetails } from './user-details/UserDetails';
import { UserHeadRow } from './user-head-row/UserHeadRow';
import { UserRow } from './user-row/UserRow';
import { UserActionTypes } from './userConstants';
import './UserList.css'

export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const userActionDefault = {user: null, action: null};
    const [userAction, setUserAction] = useState(userActionDefault);

    useEffect(() => {
        userServices.getAll()
            .then(res => setUsers(res));
    }, []);

    const userActionHandler = (_id, action) => {
        userServices.getOneById(_id)
            .then(user => {
                setUserAction({user, action});
            });
    }

    const clearHandler = () => {
        setUserAction(userActionDefault);
    }

    return (
        <>
            {userAction.action === UserActionTypes.Create &&
                <UserDetails
                    user={userAction.user}
                    clearHandler={clearHandler}        
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
                                userActionHandler={userActionHandler} 
                            />
                        )}
                    </tbody>
                </table>
            </div>
            <button className="btn-add btn">Add new user</button>
        </>
    );
};
