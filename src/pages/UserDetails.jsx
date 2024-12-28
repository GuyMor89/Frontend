import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { ToyList } from '../cmps/ToyList.jsx'
import { userActions } from '../store/actions/user.actions.js'
import { toyActions } from '../store/actions/toy.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'

export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const toys = useSelector(storeState => storeState.toyModule.unfilteredToys?.filter(toy => toy.owner && toy.owner.fullname === user.fullname))

    const navigate = useNavigate()

    useEffect(() => {
        userActions.loadLoggedInUser()
        if (!toys) loadToys()
    }, [])

    useEffect(() => {
        loadToys()
    }, [user])

    async function loadToys() {
        if (!user) return
        try {
            await toyActions.loadToys()
        } catch (err) {
            showErrorMsg(`Couldn't load toys`)
        }
    }

    if (!user) return navigate('/')

    const { _id, fullname, isAdmin } = user

    return (
        <div className='user-details'>
            <h2>Name: {fullname}</h2>
            <h3>ID: {_id}</h3>
            <h3>Is Admin: {isAdmin ? 'Yes' : 'No'}</h3>
            {toys && toys.length > 0 ? <ToyList toys={toys} user={user} /> : 'You don\'t own any toys'}
        </div>
    )
}