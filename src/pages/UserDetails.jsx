import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList.jsx'
import { userActions } from '../store/actions/user.actions.js'
import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import { UPDATE_USER } from '../store/reducers/user.reducer.js'

export function UserDetails() {

    const params = useParams()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const toys = useSelector(storeState => storeState.toyModule.unfilteredToys?.filter(toy => toy.owner && toy.owner.fullname === user?.fullname))

    useEffect(() => {
        userActions.loadLoggedInUser()
        if (!toys) loadToys()
    }, [])

    useEffect(() => {
        loadToys()
    }, [user])

    useEffect(() => {

        socketService.emit('watch-current-user', user?._id)
        socketService.on('user-updated', onUserUpdate)

        return () => {
            socketService.off('user-updated', onUserUpdate)
        }

    }, [params.id])

    function onUserUpdate(user) {
        showSuccessMsg(`This user ${user.fullname} just got updated from socket.`)
        store.dispatch({ type: UPDATE_USER, user })
    }

    async function loadToys() {
        if (!user) return
        try {
            await toyActions.loadToys()
        } catch (err) {
            showErrorMsg(`Couldn't load toys`)
        }
    }

    function addAvatar(userID, imgURL) {
        user.imgURL = imgURL
        userActions.updateUser(user)
    }

    if (!user) return navigate('/')

    const { fullname, isAdmin } = user

    return (
        <div className='user-details'>
            <h2>Name: {fullname}</h2>
            <ImgUploader user={user} addAvatar={addAvatar} />
            <h3>Is Admin: {isAdmin ? 'Yes' : 'No'}</h3>
            {toys && toys.length > 0 ? <ToyList toys={toys} user={user} /> : 'You don\'t own any toys'}
        </div>
    )
}