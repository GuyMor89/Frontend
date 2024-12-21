import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userActions } from '../store/actions/user.actions.js'

export function UserList() {

    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
        userActions.loadUsers()
    }

    function deleteUser(userID) {
        try {
            userActions.removeUser(userID)
            showSuccessMsg('User deleted')
        } catch {
            showErrorMsg('Cannot delete user with toys')
        }
    }

    if (!users) return <div>Loading..</div>

    return (
        <section className='user-list'>
            {users.map(user => {
                return <div key={user._id}>
                    <h3>{user.fullname}</h3>
                    {/* <h4>{user._id}</h4> */}
                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                </div>
            })}
        </section>
    )
}