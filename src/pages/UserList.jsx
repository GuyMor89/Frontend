import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userActions } from '../store/actions/user.actions.js'
import { ImgUploader } from '../cmps/ImgUploader.jsx'

export function UserList() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        userActions.loadUsers()
    }, [])

    function deleteUser(userID) {
        try {
            userActions.removeUser(userID)
            showSuccessMsg('User deleted')
        } catch {
            showErrorMsg('Cannot delete user with toys')
        }
    }

    function addAvatar(userID, imgURL) {
        const user = users.find(user => user._id === userID)
        user.imgURL = imgURL
        console.log(user)
        userActions.updateUser(user)
    }

    if (!user?.isAdmin) return <div className='not-allowed'>You are not allowed to be here!</div>
    if (!users) return <div className='loader-big'></div>

    return (
        <>
            <section className='user-list'>
                {users.map(user => {
                    return <div key={user._id}>
                        <h3>{user.fullname}</h3>
                        <ImgUploader user={user} addAvatar={addAvatar} />
                        <button onClick={() => deleteUser(user._id)}>Delete</button>
                    </div>
                })}
            </section>
        </>
    )
}