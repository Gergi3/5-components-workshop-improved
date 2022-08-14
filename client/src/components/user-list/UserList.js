import { useState, useEffect } from 'react';

import * as userServices from '../../services/userServices'

import { UserHeadRow } from './user-head-row/UserHeadRow';
import { UserRow } from './user-row/UserRow';
import './UserList.css'

export const UsersList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        userServices.getAll()
            .then(res => setUsers(res));
    }, [])

    return (
        <>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <UserHeadRow />
                    </thead>
                    <tbody>
                        {users.map(user => <UserRow key={user._id} user={user} />)}
                    </tbody>
                </table>
            </div>
            <button className="btn-add btn">Add new user</button>
        </>
    );
};
