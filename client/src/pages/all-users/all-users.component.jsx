import React from 'react';
import UsersTable from '../../components/users-table/users-table.component';
import './all-users.styles.scss';
const AllUsers = () => {


    return(
        <div className='container'>
            <h1>Users Management</h1>
            <UsersTable />
        </div>
    )
}

export default AllUsers;